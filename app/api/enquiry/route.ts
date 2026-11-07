import {NextResponse} from 'next/server';
import {enquirySchema} from '@/lib/enquiry';
import {quoteMessage} from '@/lib/quote-message';
export const runtime='nodejs';
export async function POST(request:Request){
 const origin=request.headers.get('origin');
 if(!origin||origin!==new URL(request.url).origin)return NextResponse.json({error:'Request origin is not allowed.'},{status:403});
 if(!request.headers.get('content-type')?.startsWith('application/json'))return NextResponse.json({error:'Use JSON.'},{status:415});
 if(Number(request.headers.get('content-length')||0)>16000)return NextResponse.json({error:'Enquiry is too large.'},{status:413});
 const raw=await request.text();if(raw.length>16000)return NextResponse.json({error:'Enquiry is too large.'},{status:413});
 let body:unknown;try{body=JSON.parse(raw)}catch{return NextResponse.json({error:'Invalid enquiry.'},{status:400})}
 const result=enquirySchema.safeParse(body);if(!result.success)return NextResponse.json({error:'Check your contact details, project information and consent.'},{status:400});
 if(!process.env.RESEND_API_KEY||!process.env.TURNSTILE_SECRET_KEY||!process.env.ENQUIRY_FROM)return NextResponse.json({error:'Direct sending is not configured yet. Please use WhatsApp or create an email draft.'},{status:503});
 const data=result.data;
 if(!data.turnstileToken)return NextResponse.json({error:'Complete the spam protection check.'},{status:400});
 try{
 const check=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',body:new URLSearchParams({secret:process.env.TURNSTILE_SECRET_KEY,response:data.turnstileToken}),signal:AbortSignal.timeout(10000)});
 const verification=await check.json();if(!verification.success||verification.hostname!==new URL(request.url).hostname)return NextResponse.json({error:'Spam protection failed. Please retry.'},{status:400});
 const text=quoteMessage(data,Boolean(data.hasReference));
 const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({from:process.env.ENQUIRY_FROM,to:process.env.ENQUIRY_TO||'social.believesign@gmail.com',...(data.email?{reply_to:data.email}:{}),subject:'New signage enquiry — Believe Sign',text}),signal:AbortSignal.timeout(15000)});
 if(!response.ok)throw new Error('Delivery failed');return NextResponse.json({ok:true});
 }catch{return NextResponse.json({error:'Delivery could not be confirmed. Please contact us through WhatsApp or email.'},{status:502})}
}
