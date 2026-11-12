import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {products,businessCategories} from '../content/products.ts';
assert.equal(products.length,10);
assert.equal(new Set(products.map(p=>p.id)).size,10);
const prices=['₹550–₹650','₹650–₹750','₹700–₹800','₹600–₹700','₹80–₹90','₹230–₹280','₹90–₹160','₹800–₹900','₹220–₹270','₹700–₹900'];
products.forEach((p,i)=>{assert.equal(p.price,prices[i]);assert(existsSync(`public/images/${p.image}`));assert(p.samples.length>=1&&p.samples.length<=4);p.samples.forEach(s=>assert(existsSync(`public/images/${s.image}`)));});
const acp=products.find(p=>p.id==='acp');assert(acp.note.includes('installation within Siliguri'));assert(acp.note.includes('GST and transport are excluded'));assert(acp.note.includes('₹90–₹100 per inch of height, per letter, charged separately'));
for(const category of businessCategories){assert(category.ids.length>0);category.ids.forEach(id=>assert(products.some(p=>p.id===id)));}
console.log('Passed: ten supplied prices, ACP scope and exclusions, category mappings and sample asset references.');
