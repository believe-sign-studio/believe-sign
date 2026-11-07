import type {ComponentProps} from 'react';
import {sitePath} from '@/lib/site-path';

// Preserve document navigation on static hosts and the Next.js server.
export default function Link({href,...props}:ComponentProps<'a'>){
  return <a {...props} href={href ? sitePath(href) : href}/>;
}
