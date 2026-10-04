import {Link} from 'react-router-dom';
import {usePageIn} from '../hooks.js';import {Img} from '../ui.jsx';import {ADDRESS} from '../data.js';
export default function About(){usePageIn();
 return <div className="max-w-6xl mx-auto px-4 py-12">
  <h1 className="hs text-4xl md:text-5xl max-w-2xl">Your local source for construction materials.</h1>
  <div className="mt-10 grid md:grid-cols-2 gap-10 items-center">
   <div className="hs overflow-hidden rounded-md"><Img src="/images/about.jpg" alt="Shriram Traders" className="w-full aspect-[4/3]"/></div>
   <div className="hs space-y-4 text-stone-700 leading-relaxed"><p>Shriram Traders supplies cement, TMT steel, sand, gitti, bricks, AAC blocks and other construction materials to homeowners, builders and contractors around Rewa.</p>
    <p>We keep it simple: tell us what you need, we confirm availability and today's rate, and we arrange delivery to your site.</p><p className="font-semibold text-char">{ADDRESS}</p>
    <div className="flex gap-3 pt-2"><Link to="/shop" className="btn bg-brick text-white hover:bg-brick-dark">Browse materials</Link><Link to="/contact" className="btn border border-stone-300 hover:border-char">Contact us</Link></div></div></div>
  <div className="mt-16 grid md:grid-cols-3 gap-6">{[['Wide range','Cement, steel, sand, gitti, bricks and more from one place.'],['Fair rates','Current market rates, quoted clearly on call or WhatsApp.'],['Site delivery','Bulk and small loads delivered where you build.']].map(([t,d])=><div key={t} data-r className="bg-white border border-stone-200 p-6 rounded-md"><h3 className="text-lg">{t}</h3><p className="text-sm text-stone-600 mt-2">{d}</p></div>)}</div></div>}
