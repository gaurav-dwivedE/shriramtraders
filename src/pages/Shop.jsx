import {useState,useEffect,useLayoutEffect,useMemo} from 'react';
import {useOutletContext} from 'react-router-dom';
import {SlidersHorizontal,X} from 'lucide-react';
import {gsap,ScrollTrigger,RM,useCount,usePageIn} from '../hooks.js';
import {PRODUCTS,CATS} from '../data.js';
import {Tabs,FilterGroup,Card,Skeleton,SearchBar} from '../ui.jsx';
import Banner from '../Banner.jsx';
import {useNavigate} from 'react-router-dom';

const uniq=k=>[...new Set(PRODUCTS.map(p=>p[k]))];
export default function Shop({initial='All',title}){
 usePageIn();const{openModal}=useOutletContext();const nav=useNavigate();
 const[loading,setLoading]=useState(true);const[cat,setCat]=useState(initial);
 const[brands,setBrands]=useState([]);const[mats,setMats]=useState([]);const[avs,setAvs]=useState([]);
 const[shown,setShown]=useState(PRODUCTS);const[showF,setShowF]=useState(false);
 useEffect(()=>{const t=setTimeout(()=>setLoading(false),RM?0:1000);return()=>clearTimeout(t)},[]); // replace with API fetch
 const target=useMemo(()=>PRODUCTS.filter(p=>(cat==='All'||p.cat===cat)&&(!brands.length||brands.includes(p.brand))&&(!mats.length||mats.includes(p.material))&&(!avs.length||avs.includes(p.avail))),[cat,brands,mats,avs]);
 useEffect(()=>{if(loading)return;const els=gsap.utils.toArray('.pc');
  if(!els.length||RM){setShown(target);return}
  gsap.to(els,{opacity:0,scale:.95,duration:.2,onComplete:()=>setShown(target)})},[target,loading]);
 useLayoutEffect(()=>{if(loading||RM)return;const els=gsap.utils.toArray('.pc');gsap.set(els,{opacity:0,y:28,scale:1});
  const st=ScrollTrigger.batch(els,{start:'top 94%',once:true,onEnter:b=>gsap.to(b,{opacity:1,y:0,duration:.6,stagger:.08,ease:'power3.out'})});
  ScrollTrigger.refresh();return()=>st.forEach(s=>s.kill())},[shown,loading]);
 const count=useCount(target.length);
 const tog=(set,v)=>set(a=>a.includes(v)?a.filter(x=>x!==v):[...a,v]);
 const chips=[...(cat!=='All'?[[cat,()=>setCat('All')]]:[]),...brands.map(b=>[b,()=>tog(setBrands,b)]),...mats.map(b=>[b,()=>tog(setMats,b)]),...avs.map(b=>[b,()=>tog(setAvs,b)])];
 const clear=()=>{setCat('All');setBrands([]);setMats([]);setAvs([])};
 const toShop=c=>{if(c)setCat(c);document.getElementById('shop')?.scrollIntoView({behavior:'smooth'})};
 return <div>
  <section className="max-w-7xl mx-auto px-4 pt-10 pb-8 text-center">
   <h1 className="hs pre-hide text-4xl md:text-6xl max-w-3xl mx-auto leading-[1.08]">{title?`${title} Supplier in Rewa.`:'Construction Materials, All in One Place.'}</h1>
   <p className="hs pre-hide mt-4 text-stone-600 max-w-xl mx-auto">Cement, steel, sand, gitti, bricks and more — find what you need and ask for today's price.</p>
   <div className="hs pre-hide mt-8"><SearchBar onPick={p=>nav(`/product/${p.id}`)}/></div></section>
  <div className="max-w-7xl mx-auto px-4">
   <div id="shop" className="hs pre-hide scroll-mt-24"><Tabs value={cat} onChange={setCat}/></div>
   <div className="hs pre-hide mt-6"><Banner onGo={toShop} onQuote={()=>openModal('')}/></div>
   <div className="mt-8 flex items-center justify-between">
    <p className="text-sm text-stone-600"><b className="text-char text-lg font-head">{count}</b> Materials</p>
    <button onClick={()=>setShowF(!showF)} className="lg:hidden btn border border-stone-300"><SlidersHorizontal size={16}/>Filters</button></div>
   <div className="mt-4 grid lg:grid-cols-[240px_1fr] gap-8">
    <aside className={`${showF?'block':'hidden'} lg:block`}><h3 className="text-base mb-1 hidden lg:block">Filters</h3>
     <FilterGroup title="Category" opts={CATS} sel={cat==='All'?[]:[cat]} toggle={v=>setCat(c=>c===v?'All':v)}/>
     <FilterGroup title="Brand" opts={uniq('brand')} sel={brands} toggle={v=>tog(setBrands,v)}/>
     <FilterGroup title="Material" opts={uniq('material')} sel={mats} toggle={v=>tog(setMats,v)}/>
     <FilterGroup title="Availability" opts={uniq('avail')} sel={avs} toggle={v=>tog(setAvs,v)}/></aside>
    <div>
     {chips.length>0&&<div className="flex flex-wrap items-center gap-2 mb-4">{chips.map(([l,fn])=><button key={l} onClick={fn} className="pop flex items-center gap-1 bg-white border border-stone-300 hover:border-brick text-sm px-3 py-1 rounded-full transition">{l}<X size={13}/></button>)}
      <button onClick={clear} className="text-sm font-semibold text-brick ulink ml-1">Clear All</button></div>}
     <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5 min-h-[300px]">
      {loading?Array.from({length:8}).map((_,i)=><Skeleton key={i}/>):shown.map(p=><Card key={p.id} p={p} onPrice={m=>openModal(m)}/>)}
      {!loading&&!shown.length&&<p className="col-span-full text-center text-stone-500 py-16">Nothing matches these filters. <button onClick={clear} className="text-brick font-semibold">Clear all</button> or ask us on WhatsApp.</p>}
     </div></div></div></div>
  <section className="mt-20 bg-char text-white"><div className="max-w-7xl mx-auto px-4 py-16 text-center">
   <h2 data-r className="text-3xl md:text-4xl">Need Materials in Bulk?</h2>
   <p data-r className="mt-3 text-white/75 max-w-xl mx-auto">Tell us what you need and we'll help you with availability and the latest rate.</p>
   <button data-r onClick={()=>openModal('Bulk requirement')} className="btn bg-sun text-char hover:bg-amber-400 mt-6">Request Bulk Quote</button></div></section>
 </div>}
