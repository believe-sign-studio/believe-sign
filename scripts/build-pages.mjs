import {spawnSync} from 'node:child_process';
import {writeFileSync} from 'node:fs';
const base = '/believe-sign';
const r = spawnSync(process.execPath, ['scripts/build-preview.mjs'], {
  stdio: 'inherit',
  env: {...process.env, NEXT_PUBLIC_BASE_PATH: base, NEXT_PUBLIC_SITE_URL: `https://believe-sign-studio.github.io${base}`, NEXT_PUBLIC_INDEXABLE: 'true'}
});
if (r.status !== 0) process.exit(r.status ?? 1);
writeFileSync('out/.nojekyll', '');
const check = spawnSync(process.execPath, ['scripts/check-pages.mjs'], {stdio:'inherit',env:{...process.env,NEXT_PUBLIC_INDEXABLE:'true'}});
process.exit(check.status ?? 1);

