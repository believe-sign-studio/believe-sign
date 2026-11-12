import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import {productExplanations} from '../content/product-explanations.ts';
import {products,businessCategories} from '../content/products.ts';
assert.equal(products.length,10);
assert.equal(new Set(products.map(p=>p.id)).size,10);
const prices=['₹550–₹650','₹650–₹750','₹700–₹800','₹600–₹700','₹80–₹90','₹230–₹280','₹90–₹160','₹800–₹900','₹220–₹270','₹700–₹900'];
products.forEach((p,i)=>{assert.equal(p.price,prices[i]);assert(existsSync(`public/images/${p.image}`));assert(p.samples.length>=1&&p.samples.length<=20);p.samples.forEach(s=>assert(existsSync(`public/images/${s.image}`)));});
assert.equal(products.find(p=>p.id==='2d-led').samples.length,8);
assert.equal(products.find(p=>p.id==='3d-led').samples.length,8);
assert.equal(products.find(p=>p.id==='gold-acrylic').samples.length,13);
assert.equal(products.find(p=>p.id==='mixed-led').samples.length,8);
assert.equal(products.find(p=>p.id==='acrylic-letters').samples.length,11);
assert.equal(products.find(p=>p.id==='acp').samples.length,6);
assert.equal(new Set(products.map(p=>p.service)).size,10);
for(const p of products){assert(productExplanations[p.id]?.length>0);assert(productExplanations[p.id].every(section=>section.paragraphs.length>=2));}
assert(readFileSync('components/Shell.tsx','utf8').includes('19CSMPA2697H1ZC'));
assert(readFileSync('components/Shell.tsx','utf8').includes('8800977146'));
const acp=products.find(p=>p.id==='acp');assert(acp.note.includes('installation within Siliguri'));assert(acp.note.includes('GST and transport are excluded'));assert(acp.note.includes('₹90–₹100 per inch of height, per letter, charged separately'));
for(const category of businessCategories){assert(category.ids.length>0);category.ids.forEach(id=>assert(products.some(p=>p.id===id)));}
console.log('Passed: ten supplied prices, ACP scope and exclusions, category mappings and sample asset references.');
