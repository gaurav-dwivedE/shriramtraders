import {Routes,Route} from 'react-router-dom';
import Layout from './Layout.jsx';
import Home from './pages/Home.jsx';import Shop from './pages/Shop.jsx';import Product from './pages/Product.jsx';
import About from './pages/About.jsx';import Contact from './pages/Contact.jsx';
export default function App(){return <Routes><Route element={<Layout/>}>
 <Route path="/" element={<Home/>}/>
 <Route path="/shop" element={<Shop/>}/>
 <Route path="/cement" element={<Shop key="c" initial="Cement" title="Cement"/>}/>
 <Route path="/steel" element={<Shop key="s" initial="Steel & TMT" title="Steel & TMT"/>}/>
 <Route path="/sand-gitti" element={<Shop key="g" initial="Sand" title="Sand & Gitti"/>}/>
 <Route path="/product/:id" element={<Product/>}/>
 <Route path="/about" element={<About/>}/><Route path="/contact" element={<Contact/>}/>
 <Route path="*" element={<div className="pt-40 pb-32 text-center"><h1 className="text-4xl">Page not found</h1><a href="/" className="text-brick font-semibold mt-4 inline-block">Go home</a></div>}/>
</Route></Routes>}
