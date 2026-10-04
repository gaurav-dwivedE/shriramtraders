import {Link,useOutletContext} from 'react-router-dom';
import {Truck,BadgeIndianRupee,ClipboardCheck,ArrowRight} from 'lucide-react';
import {usePageIn} from '../hooks.js';import {PRODUCTS,CATS} from '../data.js';import {Img,Card} from '../ui.jsx';
const TILES=[['Cement','/cement','/images/cement-ultratech.jpg'],['Steel & TMT','/steel','/images/tmt.jpg'],['Sand & Gitti','/sand-gitti','/images/gitti.jpg'],['Bricks & Blocks','/shop','/images/brick.jpg']];
export default function Home(){usePageIn();const{openModal}=useOutletContext();
 return <div>
  <section className="relative h-[520px] md:h-[600px] overflow-hidden bg-char text-white">
   <Img src="/images/hero-cement.jpg" alt="Construction site" className="kb absolute inset-0 w-full h-full"/><div className="absolute inset-0 bg-gradient-to-r from-char/90 via-char/55 to-transparent"/>
   <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col justify-center">
    <span className="hs self-start bg-sun text-char text-xs font-bold tracking-wider uppercase px-2.5 py-1 rounded-sm">Rewa, Madhya Pradesh</span>
    <h1 className="hs text-4xl md:text-6xl mt-4 max-w-2xl leading-[1.05]">Build strong. Build better.</h1>
    <p className="hs mt-4 text-white/85 max-w-lg">Cement, TMT steel, sand, gitti, bricks and more for your home, site or project. Ask for today's price.</p>
    <div className="hs mt-7 flex flex-wrap gap-3"><Link to="/shop" className="btn bg-brick text-white hover:bg-brick-dark">Explore Materials<ArrowRight size={16}/></Link>
     <button onClick={()=>openModal('')} className="btn border border-white/70 hover:bg-white hover:text-char">Request Quote</button></div></div></section>
  <section className="max-w-7xl mx-auto px-4 pt-16"><h2 data-r className="text-3xl">Shop by category</h2>
   <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">{TILES.map(([t,to,img])=><Link key={t} to={to} data-r className="group relative aspect-[4/5] overflow-hidden rounded-md">
    <Img src={img} alt={t} className="w-full h-full transition-transform duration-700 group-hover:scale-[1.06]"/><div className="absolute inset-0 bg-gradient-to-t from-char/80 to-transparent"/>
    <div className="absolute bottom-3 left-4 right-4 text-white flex items-center justify-between font-head font-bold">{t}<ArrowRight size={18} className="transition-transform group-hover:translate-x-1.5"/></div></Link>)}</div></section>
  <section className="max-w-7xl mx-auto px-4 pt-16"><div className="flex items-end justify-between"><h2 data-r className="text-3xl">Popular materials</h2><Link to="/shop" className="ulink text-sm font-semibold text-brick">View all</Link></div>
   <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">{PRODUCTS.filter(p=>p.badge==='Popular').slice(0,4).map(p=><div key={p.id} data-r><Card p={p} onPrice={m=>openModal(m)}/></div>)}</div></section>
  <section className="mt-20 bg-char text-white"><div className="max-w-7xl mx-auto px-4 py-16 text-center">
   <h2 data-r className="text-3xl md:text-4xl">Need Materials in Bulk?</h2><p data-r className="mt-3 text-white/75 max-w-xl mx-auto">Tell us what you need and we'll help you with availability and the latest rate.</p>
   <button data-r onClick={()=>openModal('Bulk requirement')} className="btn bg-sun text-char hover:bg-amber-400 mt-6">Request Bulk Quote</button>
   <div className="mt-12 grid md:grid-cols-3 gap-8">{[[Truck,'Reliable Supply','Regular stock and on-time site delivery.'],[BadgeIndianRupee,'Competitive Rates','Fair, current market rates on every material.'],[ClipboardCheck,'Easy Enquiry','Send a request, get a call back, done.']].map(([I,t,d])=>
    <div key={t} data-r className="group"><I size={30} className="mx-auto text-sun transition-transform duration-500 group-hover:-translate-y-1"/><h3 className="mt-3 text-lg">{t}</h3><p className="text-sm text-white/65 mt-1">{d}</p></div>)}</div></div></section>
 </div>}
