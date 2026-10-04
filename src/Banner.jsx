import {useState,useEffect,useRef} from 'react';
import {Img} from './ui.jsx';import {gsap,RM} from './hooks.js';import {SLIDES} from './data.js';
export default function Banner({onGo,onQuote}){const[i,setI]=useState(0);const bg=useRef();
 useEffect(()=>{const t=setInterval(()=>setI(x=>(x+1)%SLIDES.length),6500);return()=>clearInterval(t)},[]);
 useEffect(()=>{if(RM)return;const t=gsap.to(bg.current,{yPercent:8,ease:'none',scrollTrigger:{trigger:bg.current,start:'top bottom',end:'bottom top',scrub:true}});return()=>{t.scrollTrigger?.kill();t.kill()}},[]);
 return <section className="relative h-[420px] md:h-[480px] overflow-hidden rounded-md bg-char">
  <div ref={bg} className="absolute inset-x-0 -top-10 -bottom-10">{SLIDES.map((s,k)=><div key={k} className={`absolute inset-0 transition-opacity duration-1000 ${k===i?'opacity-100':'opacity-0'}`}>
   <Img src={s.img} alt={s.title} className={`w-full h-full ${k===i?'kb':''}`}/></div>)}</div>
  <div className="absolute inset-0 bg-gradient-to-r from-char/85 via-char/50 to-transparent"/>
  <div key={i} className="slide-in relative h-full max-w-7xl px-6 md:px-12 flex flex-col justify-center text-white">
   <span className="self-start bg-sun text-char text-xs font-bold tracking-wider uppercase px-2.5 py-1 rounded-sm">{SLIDES[i].label}</span>
   <h2 className="text-4xl md:text-5xl mt-4 max-w-xl"><span className="text-white/60 block text-base font-semibold tracking-widest mb-1">BUILD STRONG. BUILD BETTER.</span>{SLIDES[i].title}</h2>
   <p className="mt-3 text-white/85 max-w-md">{SLIDES[i].text} Quality construction materials for every project.</p>
   <div className="mt-6 flex flex-wrap gap-3"><button onClick={()=>onGo(SLIDES[i].cat)} className="btn bg-brick text-white hover:bg-brick-dark">Explore Materials</button>
    <button onClick={onQuote} className="btn border border-white/70 text-white hover:bg-white hover:text-char">Request Quote</button></div></div>
  <div className="absolute bottom-4 left-6 md:left-12 flex gap-2">{SLIDES.map((_,k)=><button key={k} aria-label={`Slide ${k+1}`} onClick={()=>setI(k)} className={`h-1 rounded-full transition-all duration-500 ${k===i?'w-8 bg-sun':'w-4 bg-white/50'}`}/>)}</div></section>}
