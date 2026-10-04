import {useOutletContext} from 'react-router-dom';
import {Phone,MessageCircle,MapPin} from 'lucide-react';
import {usePageIn} from '../hooks.js';import {PHONE,PHONE_SHOW,ADDRESS} from '../data.js';import {wa,Img} from '../ui.jsx';
export default function Contact(){usePageIn();const{openModal}=useOutletContext();
 const map=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Saudamini College Gaddi Road Khaur Rewa')}`;
 return <div className="max-w-6xl mx-auto px-4 py-12">
  <h1 className="hs text-4xl md:text-5xl">Contact Shriram Traders</h1><p className="hs mt-3 text-stone-600">Call, WhatsApp or send an enquiry. We'll share today's price.</p>
  <div className="mt-10 grid md:grid-cols-2 gap-10">
   <div className="space-y-4">{[[Phone,'Call',PHONE_SHOW,`tel:${PHONE}`],[MessageCircle,'WhatsApp','Chat with us',wa("Hi, I'd like to know today's rates.")],[MapPin,'Visit us',ADDRESS,map]].map(([I,t,v,h])=>
    <a key={t} href={h} target={t==='Call'?undefined:'_blank'} rel="noreferrer" className="hs group flex gap-4 bg-white border border-stone-200 rounded-md p-5 transition hover:-translate-y-1 hover:shadow-lg">
     <I className="text-brick shrink-0" size={22}/><div><p className="font-semibold">{t}</p><p className="text-sm text-stone-600">{v}</p></div></a>)}
    <button onClick={()=>openModal('')} className="hs btn bg-brick text-white hover:bg-brick-dark w-full">Send an enquiry</button></div>
   <div className="hs overflow-hidden rounded-md"><Img src="/images/warehouse.jpg" alt="Shriram Traders yard" className="w-full h-full min-h-[300px]"/></div></div></div>}
