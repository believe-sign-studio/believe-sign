'use client';
import {useState} from 'react';
import Script from 'next/script';
import Link from '@/components/Link';
import {WhatsAppIcon} from '@/components/ContactActions';
import {services,business} from '@/content/business';
import {quoteMessage,whatsappEnquiryUrl,emailEnquiryUrl,type QuoteDetails} from '@/lib/quote-message';

type Quote=QuoteDetails&{consent:boolean;website:string};
const initial:Quote={name:'',phone:'',email:'',category:'3D LED sign boards',width:'',height:'',unit:'ft',material:'Recommend a material',illumination:'Recommend the best option',city:'',requirements:'',consent:false,website:''};
export function QuoteStudio({emailDeliveryEnabled=false}:{emailDeliveryEnabled?:boolean}){
 const [step,setStep]=useState(1);
 const [data,setData]=useState<Quote>(initial);
 const [hasReference,setHasReference]=useState(false);
 const [error,setError]=useState('');
 const [status,setStatus]=useState('');
 const [busy,setBusy]=useState(false);
 const [emailFailed,setEmailFailed]=useState(false);
 const update=(key:keyof Quote,value:string|boolean)=>setData(d=>({...d,[key]:value}));
 const message=quoteMessage(data,hasReference);
 const whatsappUrl=whatsappEnquiryUrl(business.whatsapp,message);
 const emailUrl=emailEnquiryUrl(business.email,message);
 function next(){
  setError('');setStatus('');
  if(step===2&&(!data.city.trim()||(data.width&&(!Number.isFinite(Number(data.width))||Number(data.width)<=0||Number(data.width)>1000))||(data.height&&(!Number.isFinite(Number(data.height))||Number(data.height)<=0||Number(data.height)>1000)))){setError('Enter your installation city. Use positive measurements up to 1,000, or leave the size blank if you are unsure.');return}
  setStep(s=>s+1);
 }
 function valid(){
  if(!data.name.trim()||!/^\+?[\d\s()-]{10,18}$/.test(data.phone)||!data.consent||(data.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))){setError('Please enter your name and a valid mobile number, check your email if supplied, and agree to be contacted.');return false}
  setError('');return true;
 }
 function openWhatsApp(){setStatus('WhatsApp is opening with your enquiry details. Attach your reference photo or logo there, then press Send. No WhatsApp message has been sent by this website.');window.location.assign(whatsappUrl)}
 async function submit(){
  if(!valid())return;
  if(!emailDeliveryEnabled){openWhatsApp();return}
  setBusy(true);setEmailFailed(false);setStatus('');
  try{
   const turnstileToken=(document.querySelector('[name="cf-turnstile-response"]') as HTMLInputElement|null)?.value;
   const response=await fetch('/api/enquiry/',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...data,hasReference,turnstileToken})});
   if(!response.ok){const body=await response.json().catch(()=>null);throw new Error(body?.error||'Email delivery could not be confirmed.')}
   setStatus('Your enquiry email has been sent to Believe Sign. WhatsApp is opening with the same details. Attach your reference image there and press Send.');
   window.location.assign(whatsappUrl);
  }catch(e){setEmailFailed(true);setError((e instanceof Error?e.message:'Email delivery could not be confirmed.')+' You can still use WhatsApp or create an email draft below.')}finally{setBusy(false)}
 }
 return <div className="quote-studio"><aside><span className="eyebrow">CUSTOM SIGNAGE QUOTATION</span><h2>Let’s plan<br/><em>your signage.</em></h2><p>Tell us about your LED sign board, acrylic letters, ACP frontage or other business signage in Siliguri and North Bengal.</p><div className="quote-steps">{['Choose your sign','Tell us about your space','Review & send'].map((s,i)=><div key={s} className={step===i+1?'current':''} aria-current={step===i+1?'step':undefined}><span>0{i+1}</span>{s}</div>)}</div><div className="quote-help"><span>Need help choosing?</span><a href={`tel:${business.tel}`}>Call {business.phone} ↗</a><p>Approximate measurements are enough to start a conversation.</p></div></aside>
 <form className="quote-form" onSubmit={e=>{e.preventDefault();if(step<3)next();else void submit()}}><div className="form-progress"><span>STEP {step} OF 3</span><div><i style={{width:`${step/3*100}%`}}/></div></div>
 {step===1&&<><h3>Which signage do you need?</h3><p>Choose a starting point. We can help you decide on materials and lighting.</p><div className="category-choices">{[...services.map(s=>s.name),'Help me choose'].map(s=><button type="button" aria-pressed={data.category===s} key={s} onClick={()=>update('category',s)}>{s}<span>{data.category===s?'●':'↗'}</span></button>)}</div></>}
 {step===2&&<><h3>Tell us about your space.</h3><p>Share the approximate size and installation location. Leave measurements blank if you need advice.</p><fieldset className="measurement-group"><legend>Approximate sign size <span>(optional)</span></legend><div className="dimension-fields"><div className="quote-field"><label htmlFor="quote-width">Width</label><input id="quote-width" type="number" min="0.1" max="1000" step="0.1" value={data.width} onChange={e=>update('width',e.target.value)} placeholder="e.g. 10"/></div><div className="quote-field"><label htmlFor="quote-height">Height</label><input id="quote-height" type="number" min="0.1" max="1000" step="0.1" value={data.height} onChange={e=>update('height',e.target.value)} placeholder="e.g. 3"/></div><div className="quote-field unit-field"><label htmlFor="quote-unit">Measurement unit</label><select id="quote-unit" value={data.unit} onChange={e=>update('unit',e.target.value)}><option value="ft">Feet (ft)</option><option value="in">Inches (in)</option><option value="mm">Millimetres (mm)</option></select></div></div></fieldset>
 <div className="quote-field"><label htmlFor="quote-material">Preferred material</label><select id="quote-material" value={data.material} onChange={e=>update('material',e.target.value)}>{['Recommend a material','Acrylic','Stainless steel','ACP','Other'].map(m=><option key={m}>{m}</option>)}</select></div>
 <div className="quote-field"><label htmlFor="quote-lighting">Lighting preference</label><select id="quote-lighting" value={data.illumination} onChange={e=>update('illumination',e.target.value)}>{['Recommend the best option','Face-lit','Backlit / halo','Neon-style','Non-illuminated'].map(m=><option key={m}>{m}</option>)}</select></div>
 <div className="quote-field"><label htmlFor="quote-city">Installation city <span>(required)</span></label><input id="quote-city" required maxLength={100} value={data.city} onChange={e=>update('city',e.target.value)} placeholder="e.g. Siliguri" autoComplete="address-level2"/></div>
 <div className="quote-field"><label htmlFor="quote-requirements">Anything else we should know? <span>(optional)</span></label><textarea id="quote-requirements" maxLength={3000} value={data.requirements} onChange={e=>update('requirements',e.target.value)} placeholder="Business name, indoor or outdoor location, target date, or a reference link…"/></div>
 <div className="attachment-note"><span className="attachment-symbol" aria-hidden="true">↗</span><div><h4>Have a reference photo or logo?</h4><p>You’ll attach it directly in WhatsApp after the next step. The website does not upload or transfer images.</p><label className="reference-check"><input type="checkbox" checked={hasReference} onChange={e=>setHasReference(e.target.checked)}/>I have an image to attach in WhatsApp.</label></div></div></>}
 {step===3&&<><h3>Review your signage enquiry.</h3><div className="quote-summary"><dl><div><dt>Signage</dt><dd>{data.category}</dd></div><div><dt>Approximate size</dt><dd>{data.width||'To confirm'} × {data.height||'To confirm'} {data.unit}</dd></div><div><dt>Material</dt><dd>{data.material}</dd></div><div><dt>Lighting</dt><dd>{data.illumination}</dd></div><div><dt>Installation city</dt><dd>{data.city}</dd></div>{data.requirements&&<div><dt>Your requirements</dt><dd>{data.requirements}</dd></div>}<div><dt>Reference image</dt><dd>{hasReference?'Attach in WhatsApp before sending':'Optional — add one in WhatsApp if useful'}</dd></div></dl></div>
 <div className="quote-field"><label htmlFor="quote-name">Your name <span>(required)</span></label><input id="quote-name" required maxLength={100} value={data.name} autoComplete="name" onChange={e=>update('name',e.target.value)}/></div>
 <div className="quote-field"><label htmlFor="quote-phone">Mobile number <span>(required)</span></label><input id="quote-phone" required type="tel" maxLength={18} autoComplete="tel" value={data.phone} placeholder="e.g. +91 98765 43210" onChange={e=>update('phone',e.target.value)}/></div>
 <div className="quote-field"><label htmlFor="quote-email">Email address <span>(optional)</span></label><input id="quote-email" type="email" maxLength={254} autoComplete="email" value={data.email} onChange={e=>update('email',e.target.value)}/></div>
 <label className="honeypot" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={data.website} onChange={e=>update('website',e.target.value)}/></label>
 <label className="consent"><input type="checkbox" checked={data.consent} onChange={e=>update('consent',e.target.checked)}/><span>I agree to be contacted about this signage enquiry. <Link href="/privacy-policy/">Privacy policy</Link></span></label>
 <div className="whatsapp-instructions"><WhatsAppIcon/><div><h4>Your image goes in WhatsApp</h4><p>Open the prepared message, tap the attachment or “+” button, choose your photo or logo, and press <strong>Send</strong>.</p><p>Your details will be prefilled. Opening WhatsApp alone does not send the enquiry.</p></div></div>
 {emailDeliveryEnabled&&<><Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive"/><div className="cf-turnstile" data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}/></>}
 </>}
 {error&&<p className="form-error" role="alert">{error}</p>}{status&&<p className="form-success" role="status">{status}</p>}
 <div className="form-actions">{step>1&&<button type="button" className="text-link" onClick={()=>{setStep(s=>s-1);setError('');setStatus('')}}>← Back</button>}{step===3&&!emailDeliveryEnabled?<a className="button whatsapp-submit" href={whatsappUrl} target="_blank" rel="noreferrer" onClick={e=>{if(!valid()){e.preventDefault();return}setStatus('Your prepared WhatsApp message is opening in a new tab. Attach your photo or logo there and press Send. No WhatsApp message has been sent by this website.')}}><WhatsAppIcon/>Open WhatsApp with my enquiry ↗</a>:<button className={`button ${step===3?'whatsapp-submit':''}`} disabled={busy} type="submit">{step===3&&<WhatsAppIcon/>}{step<3?'Continue ↗':busy?'Sending enquiry email…':'Email enquiry & open WhatsApp ↗'}</button>}</div>
 {step===3&&<div className="alternative-enquiry"><span>{emailDeliveryEnabled?'Prefer another option?':'Prefer email?'}</span><a href={emailUrl} onClick={e=>{if(!valid()){e.preventDefault();return}setStatus('Your email app is opening a draft with the same enquiry details. Attach any reference image in your email app and press Send. No email has been sent by this website.')}}>Create an email draft ↗</a>{emailFailed&&<a href={whatsappUrl} target="_blank" rel="noreferrer" onClick={e=>{if(!valid())e.preventDefault()}}>Continue to WhatsApp only ↗</a>}<p>{emailDeliveryEnabled?'The main action emails your enquiry to Believe Sign, then opens WhatsApp. Images must be attached separately in WhatsApp.':'WhatsApp and email open in your chosen app. Review your message, attach any image, and press Send there.'}</p></div>}
 </form></div>
}
