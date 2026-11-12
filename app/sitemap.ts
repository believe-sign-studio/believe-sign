import type { MetadataRoute } from 'next';
import {products} from '@/content/products';
import {services} from '@/content/business';
import {origin} from '@/lib/seo';
export const dynamic='force-static';
export default function sitemap():MetadataRoute.Sitemap{return ['', 'about-us','signage-solutions','led-sign-board-manufacturer-siliguri',...Array.from(new Set([...services.map(s=>s.slug),...products.map(p=>p.service)])),'projects','design-studio','get-a-quote','contact-us','blog','blog/preparing-your-signage-brief','privacy-policy'].map(path=>({url:`${origin}/${path?path+'/':''}`,changeFrequency:'monthly',priority:path===''?1:0.7}))}
