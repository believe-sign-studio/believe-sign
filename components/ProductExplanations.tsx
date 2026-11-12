import {products} from '@/content/products';
import {productExplanations} from '@/content/product-explanations';
import Link from '@/components/Link';
export default function ProductExplanations({service}:{service?:string}){
 const entries=service?products.filter(p=>p.service===service):products;
 if(!entries.length)return null;
 return <section className="product-guides" aria-labelledby="product-guides-title"><div className="section-heading"><div><span className="eyebrow">MATERIALS, LIGHT & YOUR BUSINESS</span><h2 id="product-guides-title">Signage explained.<br/><em>Find your fit.</em></h2></div><p>Get to know our ten product categories, from illuminated sign boards to custom lettering and complete ACP fascias.</p></div><div className="product-guide-list">{entries.map(p=><details key={p.id} id={`product-info-${p.id}`}><summary>{p.name}<span>Read more +</span></summary><div>{productExplanations[p.id]?.map((section,i)=><section key={section.heading}><h3>{section.heading}</h3>{section.paragraphs.map((text,j)=><p key={`${i}-${j}`}>{text}</p>)}</section>)}<Link href={`/${p.service}/`} className="text-link">Explore {p.name.toLowerCase()} ↗</Link></div></details>)}</div></section>
}
