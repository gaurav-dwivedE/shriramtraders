import {useEffect,useState} from 'react';
import gsap from 'gsap';import {ScrollTrigger} from 'gsap/ScrollTrigger';import Lenis from 'lenis';
gsap.registerPlugin(ScrollTrigger);
export const RM=typeof window!=='undefined'&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const isMobile=()=>window.innerWidth<768;
export {gsap,ScrollTrigger};
// Lenis owns scroll, ScrollTrigger reads from it, GSAP ticker drives it
export function useLenis(){useEffect(()=>{if(RM)return;
 const l=new Lenis({duration:1.1,smoothWheel:!isMobile()});l.on('scroll',ScrollTrigger.update);
 const t=time=>l.raf(time*1000);gsap.ticker.add(t);gsap.ticker.lagSmoothing(0);
 return()=>{gsap.ticker.remove(t);l.destroy()}},[])}
export function useScrolled(y){const[s,set]=useState(false);
 useEffect(()=>{const f=()=>set(window.scrollY>y);f();window.addEventListener('scroll',f,{passive:true});return()=>window.removeEventListener('scroll',f)},[y]);return s}
export function useCount(n){const[v,set]=useState(0);
 useEffect(()=>{const o={v:0};const prev=Number(document.body.dataset.cnt||0);o.v=prev;
  const tw=gsap.to(o,{v:n,duration:RM?0:.6,ease:'power2.out',onUpdate:()=>set(Math.round(o.v)),onComplete:()=>{document.body.dataset.cnt=n}});return()=>tw.kill()},[n]);return v}
// generic section reveal for elements with data-r
export function useReveal(dep){useEffect(()=>{const els=gsap.utils.toArray('[data-r]');if(RM){gsap.set(els,{opacity:1});return}
 gsap.set(els,{opacity:0,y:28});
 const st=ScrollTrigger.batch(els,{start:'top 90%',once:true,onEnter:b=>gsap.to(b,{opacity:1,y:0,duration:.8,stagger:.12,ease:'power3.out'})});
 return()=>st.forEach(s=>s.kill())},[dep])}

// animate .hs elements in when a page mounts
export function usePageIn(){useEffect(()=>{window.scrollTo(0,0);const els=gsap.utils.toArray('.hs');
 if(RM){gsap.set(els,{opacity:1,y:0});return}
 const t=gsap.fromTo(els,{opacity:0,y:20},{opacity:1,y:0,duration:.6,stagger:.12,delay:.1,ease:'power3.out'});return()=>t.kill()},[])}
