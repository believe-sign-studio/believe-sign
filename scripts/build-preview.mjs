import {renameSync,existsSync,rmSync} from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
// Keep the real Next.js server endpoint for Vercel. The private static review
// build uses visitor-controlled WhatsApp / email handoffs instead.
const api='app/api';const holding='.preview-api';
const generatedDev=path.resolve('.next/dev');
if(!generatedDev.startsWith(path.resolve('.')+path.sep))throw new Error('Invalid generated directory');
rmSync(generatedDev,{recursive:true,force:true});
if(existsSync(holding)&&!existsSync(api))renameSync(holding,api);
renameSync(api,holding);
let code=1;
try {const r=spawnSync(process.execPath,['node_modules/next/dist/bin/next','build'],{stdio:'inherit',env:{...process.env,STATIC_PREVIEW:'1',NEXT_PUBLIC_INDEXABLE:'false'}});code=r.status??1}
finally{renameSync(holding,api)}
process.exit(code);
