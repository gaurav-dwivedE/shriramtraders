import {useParams,Link,useOutletContext} from 'react-router-dom';
import {Phone,MessageCircle,ArrowLeft} from 'lucide-react';
import {usePageIn} from '../hooks.js';import {PRODUCTS,PHONE} from '../data.js';import {Img,Card,wa} from '../ui.jsx';
export default function Product(){
 const{id}=useParams();const{openModal}=useOutletContext();const p=PRODUCTS.find(x=>x.id===+id);usePageIn();
 if(!p)return <div className="py-32 text-center"><h1 className="text-3xl">Product not found</h1><Link to="/shop" className="text-brick font-semibold">Back to shop</Link></div>;
 const rel=PRODUCTS.filter(x=>x.cat===p.cat&&x.id!==p.id).slice(0,4);
 return <div className="max-w-6xl mx-auto px-4 py-8">
  <Link to="/shop" className="hs flex items-center gap-1 text-sm font-semibold mb-6 hover:text-brick w-fit"><ArrowLeft size={16}/>Back to shop</Link>
  <div className="grid md:grid-cols-2 gap-10">
   <div className="hs overflow-hidden rounded-md"><Img src={p.img} alt={p.name} className="w-full aspect-[4/3]"/></div>
   <div><p className="hs text-sm text-stone-500">{p.cat} · {p.brand}</p><h1 className="hs text-3xl mt-1">{p.name}</h1><p className="hs mt-4 text-stone-700 leading-relaxed">{p.desc}</p>
    <dl className="hs mt-6 text-sm divide-y divide-stone-200 border-y border-stone-200">{[['Brand',p.brand],['Material / Grade',p.material],['Category',p.cat],['Availability',p.avail]].map(([a,b])=><div key={a} className="flex justify-between py-2.5"><dt className="text-stone-500">{a}</dt><dd className="font-semibold">{b}</dd></div>)}</dl>
    <div className="hs mt-6 flex flex-wrap gap-3">
     <button onClick={()=>openModal(p.name)} className="btn bg-brick text-white hover:bg-brick-dark">Get Price</button>
     <a href={wa(`Hi, I want today's price for ${p.name}`)} target="_blank" rel="noreferrer" className="btn bg-green-600 text-white hover:bg-green-700"><MessageCircle size={16}/>WhatsApp</a>
     <a href={`tel:${PHONE}`} className="btn border border-stone-300 hover:border-char"><Phone size={16}/>Call</a></div></div></div>
  {rel.length>0&&<section className="mt-16"><h2 data-r className="text-2xl mb-5">Related materials</h2><div className="grid grid-cols-2 md:grid-cols-4 gap-4">{rel.map(r=><div key={r.id} data-r><Card p={r} onPrice={m=>openModal(m)}/></div>)}</div></section>}
 </div>}
