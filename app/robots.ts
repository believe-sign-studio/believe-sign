import type {MetadataRoute} from 'next';
import {indexable,origin} from '@/lib/seo';
export const dynamic='force-static';
export default function robots():MetadataRoute.Robots{return {rules:{userAgent:'*',...(indexable?{allow:'/'}:{disallow:'/'})},sitemap:`${origin}/sitemap.xml`}}
