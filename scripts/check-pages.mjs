import assert from 'node:assert/strict';
import {existsSync,readdirSync,readFileSync,statSync,writeFileSync} from 'node:fs';
import path from 'node:path';
const root=path.resolve('out');
const base='/believe-sign';
const origin=`https://believe-sign-studio.github.io${base}`;
const errors=[];
const indexable=process.env.NEXT_PUBLIC_INDEXABLE !== 'false';
const walk=dir=>readdirSync(dir).flatMap(name=>{const file=path.join(dir,name);return statSync(file).isDirectory()?walk(file):[file]});
const all=walk(root);
const htmlFiles=all.filter(f=>f.endsWith('.html'));
let references=0,images=0;
function checkReference(value,source){
  const clean=value.replaceAll('&amp;','&');
  if(!clean.startsWith('/')||clean.startsWith('//'))return;
  if(clean!==base&&!clean.startsWith(`${base}/`)){errors.push(`${source}: unprefixed local URL ${clean}`);return;}
  const local=decodeURIComponent(clean.slice(base.length).split(/[?#]/)[0]);
  const file=path.join(root,local);
  if(!existsSync(file)&&!existsSync(path.join(file,'index.html')))errors.push(`${source}: missing ${clean}`);
  references++;
}
for(const file of htmlFiles){
  const html=readFileSync(file,'utf8');
  const name=path.relative(root,file).replaceAll('\\','/');
  for(const [,value] of html.matchAll(/(?:href|src)="([^"]+)"/g))checkReference(value,name);
  for(const [,set] of html.matchAll(/srcSet="([^"]+)"/gi))for(const candidate of set.split(','))checkReference(candidate.trim().split(/\s+/)[0],name);
  images+=(html.match(/<img\b/g)||[]).length;
  if(name==='404.html'||name.includes('_not-found')||name.startsWith('404/'))continue;
  const route='/'+name.replace(/index\.html$/,'');
  if(!html.includes(`rel="canonical" href="${origin}${route}"`))errors.push(`${name}: canonical mismatch`);
  if(indexable && /name="robots" content="[^"]*noindex/.test(html))errors.push(`${name}: production page blocks indexing`);
  if(!indexable&&!html.includes('noindex'))errors.push(`${name}: staging page must be noindex`);
}
for(const file of all.filter(f=>f.endsWith('.css'))){
  for(const [,value]of readFileSync(file,'utf8').matchAll(/url\(["']?([^"')]+)["']?\)/g))checkReference(value,path.relative(root,file));
}
for(const file of ['index.html','design-studio/index.html']){
 const html=readFileSync(path.join(root,file),'utf8');
 for(const id of ['IvTGHeyWuDE','vCMztaQKG7Q'])if(!html.includes(`https://www.youtube-nocookie.com/embed/${id}`))errors.push(`${file}: video ${id} missing`);
}
const sitemap=readFileSync(path.join(root,'sitemap.xml'),'utf8');
for(const [,url]of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)){
 if(!url.startsWith(`${origin}/`))errors.push(`Sitemap: incorrect origin ${url}`);
 checkReference(new URL(url).pathname,'sitemap');
}
assert(existsSync(path.join(root,'.nojekyll')),'Missing .nojekyll');
assert(readFileSync(path.join(root,'robots.txt'),'utf8').includes(indexable?'Allow: /':'Disallow: /'),'Incorrect robots indexing rule');
const result={htmlPages:htmlFiles.length,localReferences:references,imageReferences:images,videoEmbeds:4,errors:[...new Set(errors)]};
writeFileSync('docs/pages-check.json',JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result,null,2));
if(errors.length)process.exit(1);
