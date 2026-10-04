import {useState,useEffect,useRef} from 'react';
import {X,Check,Search,Phone,MessageCircle,ArrowRight,ChevronDown} from 'lucide-react';
import {Link} from 'react-router-dom';
import {gsap,RM} from './hooks.js';
import {WHATSAPP,PHONE,CATS,PRODUCTS} from './data.js';

export const wa=t=>`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(t)}`;

export function Img({src,alt,className=''}){const[bad,setBad]=useState(false);
 return bad?<div className={`bg-gradient-to-br from-stone-300 to-stone-400 flex items-center justify-center text-stone-600 text-xs font-medium ${className}`}>{alt}</div>
 :<img src={src} alt={alt} loading="lazy" onError={()=>setBad(true)} className={`object-cover ${className}`}/>}

export function Modal({open,onClose,material='',title='Get Latest Price'}){
 const ov=useRef(),bx=useRef();const[st,setSt]=useState('idle');
 useEffect(()=>{if(!open)return;setSt('idle');
  gsap.fromTo(ov.current,{opacity:0},{opacity:1,duration:RM?0:.25});
  gsap.fromTo(bx.current,{scale:.95,opacity:0},{scale:1,opacity:1,duration:RM?0:.35,ease:'power3.out'});
  gsap.fromTo(bx.current.querySelectorAll('[data-f]'),{y:10,opacity:0},{y:0,opacity:1,stagger:.04,delay:.15,duration:RM?0:.4})},[open]);
 if(!open)return null;
 const close=()=>gsap.to([ov.current,bx.current],{opacity:0,duration:.2,onComplete:onClose});
 const submit=e=>{e.preventDefault();setSt('sending');setTimeout(()=>{setSt('sent');setTimeout(close,1400)},1000)}; // TODO: POST to your API
 const inp='w-full border border-stone-300 bg-white px-3 py-2.5 text-sm rounded focus:outline-none focus:border-brick focus:ring-2 focus:ring-brick/15 transition';
 return <div ref={ov} className="fixed inset-0 z-[100] bg-char/60 flex items-center justify-center p-4" onMouseDown={e=>e.target===ov.current&&close()}>
  <form ref={bx} onSubmit={submit} className="bg-white w-full max-w-md rounded-md p-6 shadow-2xl max-h-[92vh] overflow-auto">
   <div className="flex justify-between items-center mb-1"><h3 className="text-xl">{title}</h3><button type="button" onClick={close} aria-label="Close" className="p-1 hover:rotate-90 transition"><X size={20}/></button></div>
   <p className="text-sm text-stone-500 mb-4">Share your requirement and we'll call you with today's rate.</p>
   <div className="space-y-3">
    <input data-f required placeholder="Name" className={inp}/>
    <input data-f required type="tel" pattern="[0-9]{10}" placeholder="Mobile (10 digits)" className={inp}/>
    <input data-f required defaultValue={material} placeholder="Material" className={inp}/>
    <input data-f placeholder="Quantity (e.g. 100 bags, 2 brass)" className={inp}/>
    <input data-f placeholder="Delivery location" className={inp}/>
    <textarea data-f rows={2} placeholder="Message (optional)" className={inp}/>
   </div>
   <button disabled={st!=='idle'} className={`btn w-full mt-4 text-white ${st==='sent'?'bg-green-600':'bg-brick hover:bg-brick-dark'}`}>
    {st==='idle'&&'Request Price'}{st==='sending'&&'Sending...'}{st==='sent'&&<><Check size={16} className="pop"/>Request Sent</>}</button>
  </form></div>}

export function SearchBar({onPick}){
 const[q,setQ]=useState('');const[f,setF]=useState(false);const box=useRef();
 useEffect(()=>{const h=e=>!box.current?.contains(e.target)&&setF(false);document.addEventListener('mousedown',h);return()=>document.removeEventListener('mousedown',h)},[]);
 const res=q?PRODUCTS.filter(p=>(p.name+p.cat+p.brand).toLowerCase().includes(q.toLowerCase())).slice(0,6):[];
 const pop=['UltraTech Cement','TMT Bars','M-Sand','20mm Gitti','Bricks'];
 return <div ref={box} className={`relative mx-auto transition-all duration-300 ${f?'max-w-3xl':'max-w-2xl'}`}>
  <div className={`flex items-center bg-white border-2 rounded transition-all duration-300 ${f?'border-brick shadow-xl':'border-stone-200 shadow-sm'}`}>
   <Search size={20} className="ml-4 text-stone-400"/>
   <input value={q} onFocus={()=>setF(true)} onChange={e=>setQ(e.target.value)} placeholder="Search cement, steel, sand, gitti..." className="flex-1 px-3 py-4 outline-none bg-transparent"/>
   {q&&<button onClick={()=>setQ('')} className="mr-3 text-stone-400 hover:text-char"><X size={18}/></button>}
  </div>
  <div className={`absolute left-0 right-0 top-full mt-2 bg-white rounded shadow-2xl border border-stone-100 z-30 text-left transition-all duration-200 origin-top ${f?'opacity-100 translate-y-0':'opacity-0 -translate-y-2 pointer-events-none'}`}>
   {!q?<div className="p-4"><p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">Popular Searches</p>
    {pop.map(s=><button key={s} onClick={()=>setQ(s.replace(' Cement',''))} className="flex items-center gap-2 w-full py-2 px-2 text-sm hover:bg-stone-50 rounded"><Search size={14} className="text-stone-400"/>{s}</button>)}</div>
   :res.length?res.map(p=><button key={p.id} onClick={()=>{onPick(p);setF(false)}} className="flex items-center gap-3 w-full p-3 hover:bg-stone-50 text-left">
     <Img src={p.img} alt="" className="w-12 h-12 rounded"/><div><p className="text-sm font-semibold">{p.name}</p><p className="text-xs text-stone-500">{p.cat}</p></div></button>)
   :<p className="p-4 text-sm text-stone-500">No match. Ask us on WhatsApp, we may still have it.</p>}
  </div></div>}

export function Tabs({value,onChange}){
 const all=['All',...CATS];const line=useRef(),wrap=useRef();
 useEffect(()=>{const b=wrap.current.querySelector(`[data-t="${value}"]`);
  gsap.to(line.current,{x:b.offsetLeft,scaleX:b.offsetWidth/100,duration:RM?0:.4,ease:'power3.inOut'})},[value]);
 return <div className="overflow-x-auto no-scrollbar border-b border-stone-200"><div ref={wrap} className="relative flex gap-8 min-w-max px-1">
  {all.map(c=><button key={c} data-t={c} onClick={()=>onChange(c)} className={`py-4 text-sm font-semibold transition-colors ${value===c?'text-brick':'text-stone-600 hover:text-char'}`}>{c}</button>)}
  <span ref={line} className="absolute bottom-0 left-0 h-0.5 w-[100px] bg-brick origin-left"/></div></div>}

export function FilterGroup({title,opts,sel,toggle}){const[o,setO]=useState(true);
 return <div className="border-b border-stone-200 py-3">
  <button onClick={()=>setO(!o)} className="flex w-full justify-between items-center text-sm font-semibold">{title}<ChevronDown size={16} className={`transition-transform duration-300 ${o?'rotate-180':''}`}/></button>
  <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${o?'grid-rows-[1fr]':'grid-rows-[0fr]'}`}><div className="overflow-hidden">
   <div className="pt-2 space-y-1.5">{opts.map(x=><label key={x} className="flex items-center gap-2 text-sm cursor-pointer text-stone-700 hover:text-char">
    <input type="checkbox" checked={sel.includes(x)} onChange={()=>toggle(x)} className="accent-[#A62B1F] w-4 h-4"/>{x}</label>)}</div></div></div></div>}

export function Card({p,onPrice}){
 const tone=p.avail==='In Stock'?'bg-green-50 text-green-700':p.avail==='Limited'?'bg-amber-50 text-amber-700':'bg-stone-100 text-stone-600';
 return <div className="pc"><div className="group h-full bg-white border border-stone-200 rounded-md overflow-hidden flex flex-col transition duration-300 hover:-translate-y-1.5 hover:shadow-xl">
  <Link to={`/product/${p.id}`} className="relative block aspect-[4/3] overflow-hidden text-left">
   <Img src={p.img} alt={p.name} className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.06]"/>
   {p.badge&&<span className={`pop absolute top-2 left-2 text-[11px] font-semibold px-2 py-0.5 rounded-sm ${p.badge==='Bulk'?'bg-sun text-char':'bg-brick text-white'}`}>{p.badge}</span>}
  </Link>
  <div className="p-4 flex flex-col flex-1"><p className="text-xs text-stone-500">{p.brand}</p>
   <h3 className="text-[15px] leading-snug mt-0.5 line-clamp-2 min-h-[2.5rem]">{p.name}</h3>
   <span className={`pop self-start mt-2 text-[11px] font-medium px-2 py-0.5 rounded-sm ${tone}`}>{p.avail}</span>
   <button onClick={()=>onPrice(p.name)} className="mt-4 pt-3 border-t border-stone-100 flex items-center gap-1.5 text-sm font-semibold text-brick opacity-90 group-hover:opacity-100">Get Price <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5"/></button>
  </div></div></div>}

export const Skeleton=()=><div className="bg-white border border-stone-200 rounded-md overflow-hidden"><div className="aspect-[4/3] shimmer"/><div className="p-4 space-y-2"><div className="h-3 w-1/3 shimmer rounded"/><div className="h-4 w-4/5 shimmer rounded"/><div className="h-3 w-1/2 shimmer rounded"/><div className="h-8 w-full shimmer rounded mt-3"/></div></div>;

