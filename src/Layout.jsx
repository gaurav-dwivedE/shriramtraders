import {useState,useEffect,useRef} from 'react';
import {Link,NavLink,Outlet,useLocation} from 'react-router-dom';
import {Phone,MessageCircle,ArrowRight,MapPin} from 'lucide-react';
import {gsap,RM,useLenis,useScrolled,useReveal} from './hooks.js';
import {PHONE,PHONE_SHOW,ADDRESS} from './data.js';
import {Modal,wa} from './ui.jsx';

const NAV=[['Home','/'],['Shop','/shop'],['About','/about'],['Contact','/contact']];
export default function Layout(){
 useLenis();const loc=useLocation();const s=useScrolled(40);
 const[modal,setModal]=useState(null);const[fab,setFab]=useState(false);
 const[boot,setBoot]=useState(()=>!sessionStorage.getItem('st_seen'));const pre=useRef();
 useEffect(()=>{if(!boot)return;sessionStorage.setItem('st_seen','1');
  const d=RM?0:1;const tl=gsap.timeline();
  tl.fromTo('.pre-logo',{opacity:0,y:10},{opacity:1,y:0,duration:.5*d}).to(pre.current,{opacity:0,duration:.4*d,delay:.5*d,onComplete:()=>setBoot(false)});return()=>tl.kill()},[]);
 useEffect(()=>{const f=()=>setFab(window.scrollY>400);window.addEventListener('scroll',f,{passive:true});return()=>window.removeEventListener('scroll',f)},[]);
 useReveal(loc.pathname);
 return <div>
  {boot&&<div ref={pre} className="fixed inset-0 z-[200] bg-white flex items-center justify-center"><div className="pre-logo pre-hide font-head font-extrabold text-3xl">SHRIRAM<span className="text-brick"> TRADERS</span></div></div>}
  <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${s?'bg-white shadow-md h-14':'bg-warm/80 backdrop-blur-sm h-20'}`}>
   <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
    <Link to="/" className="font-head font-extrabold text-xl leading-none">SHRIRAM<span className="text-brick"> TRADERS</span></Link>
    <nav className="hidden md:flex gap-7 text-sm font-medium">{NAV.map(([n,to])=><NavLink key={n} to={to} end={to==='/'} className={({isActive})=>`ulink ${isActive?'text-brick after:scale-x-100':''}`}>{n}</NavLink>)}</nav>
    <div className="flex items-center gap-3"><a href={`tel:${PHONE}`} className="hidden lg:flex items-center gap-1.5 text-sm font-semibold"><Phone size={15}/>{PHONE_SHOW}</a>
     <button onClick={()=>setModal('')} className="btn bg-brick text-white hover:bg-brick-dark">Get Quote</button></div></div>
   <nav className="md:hidden flex gap-5 overflow-x-auto no-scrollbar px-4 text-xs font-semibold bg-white border-t border-stone-100 py-1.5">
    {NAV.map(([n,to])=><NavLink key={n} to={to} end={to==='/'} className={({isActive})=>isActive?'text-brick':'text-stone-600'}>{n}</NavLink>)}</nav>
  </header>
  <main className="pt-28 md:pt-20 min-h-[70vh]"><Outlet context={{openModal:setModal}}/></main>

  <footer className="bg-[#1f1f1f] text-white/75 mt-20"><div data-r className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8 text-sm">
   <div><p className="font-head font-extrabold text-white text-lg">SHRIRAM<span className="text-brick"> TRADERS</span></p><p className="mt-2">Cement, steel, sand, gitti, bricks and more for homes, builders and contractors.</p>
    <p className="mt-3 flex gap-1.5"><MapPin size={14} className="mt-0.5 shrink-0"/>{ADDRESS}</p></div>
   <div className="grid grid-cols-2 gap-2 content-start">{[['Home','/'],['Shop','/shop'],['Cement','/cement'],['Steel','/steel'],['Sand & Gitti','/sand-gitti'],['About','/about'],['Contact','/contact']].map(([l,to])=><Link key={l} to={to} className="ulink w-fit hover:text-white">{l}</Link>)}</div>
   <div><p className="text-white font-semibold">Call or WhatsApp</p><a href={`tel:${PHONE}`} className="mt-1 block hover:text-white">{PHONE_SHOW}</a></div></div>
   <div className="border-t border-white/10 text-center text-xs py-4 pb-20 md:pb-4">© {new Date().getFullYear()} Shriram Traders. All rights reserved.</div></footer>

  <a href={wa("Hi, I'd like to know today's rates.")} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"
   className={`group hidden md:flex fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-green-600 text-white items-center justify-center shadow-xl transition-all duration-500 hover:scale-110 ${fab?'opacity-100 translate-y-0':'opacity-0 translate-y-6 pointer-events-none'}`}>
   <MessageCircle size={26}/><span className="absolute right-16 whitespace-nowrap bg-char text-white text-xs px-2.5 py-1.5 rounded opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition">Chat on WhatsApp</span></a>
  <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-stone-200 grid grid-cols-3 text-xs font-semibold animate-[up_.6s_ease-out_1.2s_both]">
   <a href={`tel:${PHONE}`} className="flex flex-col items-center gap-1 py-2.5 active:scale-95 transition"><Phone size={18}/>Call</a>
   <a href={wa("Hi, I'd like to know today's rates.")} className="flex flex-col items-center gap-1 py-2.5 text-green-700 active:scale-95 transition"><MessageCircle size={18}/>WhatsApp</a>
   <button onClick={()=>setModal('')} className="flex flex-col items-center gap-1 py-2.5 bg-brick text-white active:scale-95 transition"><ArrowRight size={18}/>Get Quote</button></nav>
  <Modal key={String(modal)} open={modal!==null} material={modal||''} onClose={()=>setModal(null)} title={modal==='Bulk requirement'?'Request Bulk Quote':'Get Latest Price'}/>
 </div>}
