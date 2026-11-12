const twoDLedSamples = [
  {
    "image": "2d-led-clinic-reference-1.webp",
    "caption": "New Shri Maa Medico clinic signboard · client-supplied 2D LED reference.",
    "alt": "New Shri Maa Medico clinic signboard"
  },
  {
    "image": "2d-led-himalayan-night.webp",
    "caption": "Himalayan Arts & Crafts illuminated signboard · client-supplied 2D LED reference.",
    "alt": "Himalayan Arts & Crafts illuminated signboard"
  },
  {
    "image": "2d-led-signboard-collage.webp",
    "caption": "2D LED signboard reference collage · client-supplied 2D LED reference.",
    "alt": "2D LED signboard reference collage"
  },
  {
    "image": "2d-led-level5-restaurant.webp",
    "caption": "Level 5 Pub & Restaurant vertical signboard · client-supplied 2D LED reference.",
    "alt": "Level 5 Pub & Restaurant vertical signboard"
  },
  {
    "image": "2d-led-clinic-reference-2.webp",
    "caption": "New Shri Maa Medico clinic signboard — alternate reference · client-supplied 2D LED reference.",
    "alt": "New Shri Maa Medico clinic signboard — alternate reference"
  },
  {
    "image": "2d-led-budhan-fitness.webp",
    "caption": "Budhan Fitness Centre illuminated signboard · client-supplied 2D LED reference.",
    "alt": "Budhan Fitness Centre illuminated signboard"
  },
  {
    "image": "2d-led-modern-bastralaya.webp",
    "caption": "Modern Bastralaya shop signboard · client-supplied 2D LED reference.",
    "alt": "Modern Bastralaya shop signboard"
  },
  {
    "image": "2d-led-himalayan-day.webp",
    "caption": "Himalayan Arts & Crafts signboard in daylight · client-supplied 2D LED reference.",
    "alt": "Himalayan Arts & Crafts signboard in daylight"
  }
];

export type Product = {
 id:string; name:string; family:string; price:string; unit:string; description:string; note:string;
 image:string; samples:{image:string;caption:string;alt?:string}[]; service:string;
};
const reference=(image:string)=>[{image,caption:'Portfolio reference. Confirm the final material, lighting and finish with our team.'}];
export const products:Product[]=[
 {id:'2d-led',name:'2D LED sign board',family:'LED boards',price:'₹550–₹650',unit:'per sq ft',description:'A clean illuminated face for a clear, readable business name.',note:'Indicative rate varies with board size and lettering details.',image:'2d-led-himalayan-night.webp',samples:twoDLedSamples,service:'2d-led-sign-boards'},
 {id:'3d-led',name:'3D letters LED sign board',family:'LED boards',price:'₹650–₹750',unit:'per sq ft',description:'Raised illuminated lettering with depth and after-dark presence.',note:'Indicative rate varies with board size and lettering details.',image:'3d-led-sign-board.jpg',samples:reference('3d-led-sign-board.jpg'),service:'3d-led-sign-boards'},
 {id:'gold-acrylic',name:'3D golden acrylic LED sign board',family:'LED boards',price:'₹700–₹800',unit:'per sq ft',description:'Golden acrylic lettering for a warm, expressive brand finish.',note:'Indicative rate varies with board size and lettering details.',image:'3d-acrylic-signage-letters.jpg',samples:reference('3d-acrylic-signage-letters.jpg'),service:'acrylic-sign-boards'},
 {id:'mixed-led',name:'3D with 2D letters LED sign board',family:'LED boards',price:'₹600–₹700',unit:'per sq ft',description:'Combine raised and flat lettering in one coordinated sign.',note:'Indicative rate varies with board size and lettering details.',image:'3d-led-sign-board.jpg',samples:reference('3d-led-sign-board.jpg'),service:'3d-led-sign-boards'},
 {id:'acrylic-letters',name:'3D acrylic signage letters',family:'Letters',price:'₹80–₹90',unit:'per inch of height, per letter',description:'Custom acrylic letters and logos, made to your artwork.',note:'Manufacturing rate varies with letter height, size and quantity.',image:'3d-acrylic-signage-letters.jpg',samples:reference('3d-acrylic-signage-letters.jpg'),service:'acrylic-sign-boards'},
 {id:'acp',name:'ACP fabrication + 3D acrylic letters',family:'ACP & fascia',price:'₹230–₹280',unit:'per sq ft for ACP fabrication',description:'A complete fascia backdrop with separately priced acrylic lettering.',note:'ACP fabrication includes installation within Siliguri. Acrylic letters: ₹90–₹100 per inch of height, per letter, charged separately. GST and transport are excluded. Final cost depends on ACP area, letter sizes and quantity.',image:'image5.jpg',samples:reference('image5.jpg'),service:'acp-sign-boards'},
 {id:'steel-backlit',name:'Stainless steel backlit letters',family:'Letters',price:'₹90–₹160',unit:'per inch of height, per letter',description:'Metal lettering with a soft halo of light behind each letter.',note:'Manufacturing rate varies with letter height, size and quantity.',image:'image7.jpg',samples:reference('image7.jpg'),service:'stainless-steel-letter-signage'},
 {id:'lollipop',name:'Lollipop sign board',family:'Projecting signs',price:'₹800–₹900',unit:'per sq ft',description:'A projecting sign that helps customers spot your entrance.',note:'Indicative rate varies with sign size and quantity.',image:'2d-led-sign-board.jpg',samples:reference('2d-led-sign-board.jpg'),service:'acrylic-sign-boards'},
 {id:'flex-glow',name:'Backlit flex glow sign board',family:'Neon & glow',price:'₹220–₹270',unit:'per sq ft',description:'An illuminated panel for your name, artwork and business details.',note:'Indicative rate varies with the sign board size.',image:'image8.jpg',samples:reference('image8.jpg'),service:'glow-sign-boards'},
 {id:'neon',name:'Neon light signage',family:'Neon & glow',price:'₹700–₹900',unit:'per sq ft',description:'A distinctive line of light for a name, phrase or feature wall.',note:'Indicative rate varies with sign size, lettering content and quantity.',image:'image6.jpg',samples:reference('image6.jpg'),service:'neon-sign-boards'}
];
export const businessCategories=[
 {name:'Hotels',description:'Hotel name boards, entrance lettering and reception branding.',ids:['3d-led','gold-acrylic','steel-backlit','acp','acrylic-letters']},
 {name:'Hospitals & clinics',description:'Clear hospital signage, clinic name boards and entrance branding.',ids:['2d-led','3d-led','acp','acrylic-letters','flex-glow']},
 {name:'Clubs',description:'Club signage, illuminated entrances and neon feature walls.',ids:['neon','3d-led','gold-acrylic','steel-backlit','lollipop']},
 {name:'Restaurants',description:'Restaurant sign boards, projecting signs and illuminated lettering.',ids:['3d-led','mixed-led','neon','lollipop','acp','flex-glow']},
 {name:'Shops & retail',description:'Shop sign boards, ACP fascias and lettering for your storefront.',ids:['2d-led','3d-led','mixed-led','acp','lollipop','flex-glow']},
 {name:'Cloud kitchens',description:'Cloud kitchen name boards and compact signs for pickup points.',ids:['2d-led','flex-glow','lollipop','acrylic-letters']},
 {name:'Food joints',description:'Food outlet signage for a visible, recognisable street presence.',ids:['2d-led','mixed-led','neon','lollipop','flex-glow']},
 {name:'Cafés',description:'Café neon signs, entrance lettering and projecting boards.',ids:['neon','gold-acrylic','lollipop','acrylic-letters','3d-led']},
 {name:'Offices & studios',description:'Reception logos, office name boards and dimensional letters.',ids:['steel-backlit','acrylic-letters','gold-acrylic','acp']}
];
