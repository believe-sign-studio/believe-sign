import Image, {type ImageProps} from 'next/image';
import {sitePath} from '@/lib/site-path';

// Public images need the same subdirectory prefix as internal links.
export default function SiteImage({src,...props}:ImageProps){
  return <Image {...props} src={typeof src === 'string' ? sitePath(src) : src}/>;
}
