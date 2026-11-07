import type { Metadata } from 'next';
export const origin = (process.env.NEXT_PUBLIC_SITE_URL || 'https://believesign.com').replace(/\/$/, '');
export const indexable = process.env.NEXT_PUBLIC_INDEXABLE === 'true';
export function metadata(title:string, description:string, path=''): Metadata {
 return {title,description,alternates:{canonical:`${origin}${path}/`},openGraph:{title,description,url:`${origin}${path}/`,siteName:'Believe Sign',locale:'en_IN',type:'website',images:[{url:`${origin}/images/image2.jpg`,width:1080,height:476,alt:'Prince Lodge illuminated lettering from Believe Sign’s portfolio'}]},twitter:{card:'summary_large_image',title,description,images:[`${origin}/images/image2.jpg`]}};
}
