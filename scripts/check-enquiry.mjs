import ts from 'typescript';
import {readFileSync,writeFileSync,unlinkSync} from 'node:fs';
import assert from 'node:assert/strict';
const modulePath=new URL('./.endpoint-check.mjs',import.meta.url);
const source=readFileSync('app/api/enquiry/route.ts','utf8').replace("'next/server'","'next/server.js'").replace("'@/lib/enquiry'","'../lib/enquiry.ts'").replace("'@/lib/quote-message'","'../lib/quote-message.ts'");
writeFileSync(modulePath,ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}}).outputText);
const oldFetch=globalThis.fetch;const results=[];
const fields={name:'Test visitor',phone:'9999999999',email:'',category:'3D LED sign boards',width:'10',height:'3',unit:'ft',material:'Acrylic',illumination:'Face-lit',city:'Siliguri',requirements:'TEST — mocked delivery only',consent:true,website:'',turnstileToken:'test'};
try{
 const {POST}=await import(modulePath.href);
 async function test(name,changes,expected,origin='https://believesign.com',extra={}){const request=new Request('https://believesign.com/api/enquiry/',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json',...extra},body:JSON.stringify({...fields,...changes})});const response=await POST(request);assert.equal(response.status,expected,name);results.push({name,status:response.status});}
 delete process.env.RESEND_API_KEY;delete process.env.TURNSTILE_SECRET_KEY;delete process.env.ENQUIRY_FROM;
 await test('unconfigured delivery fails closed',{},503);
 await test('cross-origin rejected',{},403,'https://other.example');
 await test('missing consent rejected',{consent:false},400);
 await test('invalid email rejected',{email:'invalid'},400);
 await test('negative dimensions rejected',{width:'-3'},400);
 await test('honeypot rejected',{website:'bot'},400);
 await test('oversized body header rejected',{},413,'https://believesign.com',{'Content-Length':'20000'});
 process.env.RESEND_API_KEY='mock';process.env.TURNSTILE_SECRET_KEY='mock';process.env.ENQUIRY_FROM='mock@example.com';
 await test('missing spam token rejected',{turnstileToken:''},400);
 globalThis.fetch=async()=>Response.json({success:false});await test('invalid spam verification rejected',{},400);
 globalThis.fetch=async()=>Response.json({success:true,hostname:'wrong.example'});await test('wrong token hostname rejected',{},400);
 let sent=false;globalThis.fetch=async(url,options)=>{if(String(url).includes('siteverify'))return Response.json({success:true,hostname:'believesign.com'});assert.equal(String(url),'https://api.resend.com/emails');const email=JSON.parse(options.body);assert.ok(email.text.includes('Siliguri'));assert.ok(!email.html);sent=true;return Response.json({id:'mock-id'})};
 await test('valid enquiry reaches mocked text-only provider',{},200);assert.ok(sent);
 globalThis.fetch=async(url)=>String(url).includes('siteverify')?Response.json({success:true,hostname:'believesign.com'}):Response.json({error:'failure'},{status:500});await test('provider failure reported',{},502);
 writeFileSync('docs/enquiry-check.json',JSON.stringify({mocked:true,results},null,2));console.log(JSON.stringify({mocked:true,results},null,2));
}finally{globalThis.fetch=oldFetch;unlinkSync(modulePath)}
