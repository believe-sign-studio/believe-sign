import {readdirSync,readFileSync,existsSync,statSync,writeFileSync} from 'node:fs';
import path from 'node:path';
const root=path.resolve('out');
function walk(dir){return readdirSync(dir).flatMap(f=>{const p=path.join(dir,f);return statSync(p).isDirectory()?walk(p):[p]})}
const pages=walk(root).filter(p=>p.endsWith('.html')&&!p.includes('_not-found')&&!p.includes(path.sep+'404'+path.sep)&&!p.endsWith('404.html'));
const errors=[];const titles=new Set();let jsonld=0;let links=0;
for(const page of pages){const html=readFileSync(page,'utf8');const url='/'+path.relative(root,page).replaceAll('\\','/').replace(/index.html$/,'');
 const h1=(html.match(/<h1[\s>]/g)||[]).length;if(h1!==1)errors.push(`${url}: ${h1} H1s`);
 const title=html.match(/<title>(.*?)<\/title>/)?.[1];if(!title||titles.has(title))errors.push(`${url}: missing or duplicate title`);titles.add(title);
 if(!/<meta name="description" content="[^"]+"/.test(html))errors.push(`${url}: missing description`);
 if(!html.includes(`rel="canonical" href="https://believesign.com${url}"`))errors.push(`${url}: canonical mismatch`);
 if(!html.includes('noindex'))errors.push(`${url}: preview must be noindex`);
 for(const m of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)){try{JSON.parse(m[1]);jsonld++}catch{errors.push(`${url}: invalid JSON-LD`)}}
 for(const m of html.matchAll(/href="(\/[^"#?]*)(?:[?#][^"]*)?"/g)){const href=m[1];if(href.startsWith('//'))continue;links++;const dest=path.join(root,decodeURIComponent(href));if(!existsSync(dest)&&!existsSync(path.join(dest,'index.html')))errors.push(`${url}: missing ${href}`)}
 for(const m of html.matchAll(/<img[^>]+src="([^"?]+)[^"]*"/g)){const src=m[1];if(src.startsWith('/')&&!existsSync(path.join(root,src)))errors.push(`${url}: missing image ${src}`)}
}
if(!readFileSync(path.join(root,'robots.txt'),'utf8').includes('Disallow: /'))errors.push('Preview robots must disallow indexing');
const sitemap=readFileSync(path.join(root,'sitemap.xml'),'utf8');const sitemapUrls=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)];
for(const [,url]of sitemapUrls){const pathname=new URL(url).pathname;if(!existsSync(path.join(root,pathname,'index.html')))errors.push(`Sitemap missing ${pathname}`)}
const result={pages:pages.length,internalLinkReferences:links,jsonldBlocks:jsonld,sitemapUrls:sitemapUrls.length,errors:[...new Set(errors)]};
writeFileSync('docs/export-check.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));if(errors.length)process.exit(1);

