export type QuoteDetails={name:string;phone:string;email:string;category:string;width:string;height:string;unit:string;material:string;illumination:string;city:string;requirements:string};
export function quoteMessage(q:QuoteDetails,hasReference=false){return [
 'Hello Believe Sign, I would like a custom signage quotation.',
 '', '*Contact details*', `Name: ${q.name.trim()}`, `Mobile: ${q.phone.trim()}`, `Email: ${q.email.trim()||'Not provided'}`,
 '', '*Signage requirements*', `Signage type: ${q.category}`, `Approximate size: ${q.width||'To confirm'} × ${q.height||'To confirm'} ${q.unit}`,
 `Preferred material: ${q.material}`, `Lighting: ${q.illumination}`, `Installation city: ${q.city.trim()}`,
 `Additional requirements: ${q.requirements.trim()||'Please advise on the best option.'}`,
 '', hasReference?'Reference image: I will attach my photo or logo in this chat before sending.':'Reference image: Not supplied yet.',
].join('\n')}
export function whatsappEnquiryUrl(number:string,message:string){return `https://wa.me/${number}?text=${encodeURIComponent(message)}`}
export function emailEnquiryUrl(address:string,message:string){return `mailto:${address}?subject=${encodeURIComponent('Custom signage quotation enquiry — Believe Sign')}&body=${encodeURIComponent(message)}`}
