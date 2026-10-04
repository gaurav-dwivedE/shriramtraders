export const WHATSAPP='916266439144';
export const PHONE='+916266439144';
export const PHONE_SHOW='+91 62664 39144';
export const ADDRESS='Beside Saudamini College, Gaddi Road, Khaur, Rewa, Madhya Pradesh';
export const CATS=['Cement','Steel & TMT','Sand','Gitti','Bricks & Blocks','Other'];
// [name, category, brand, material, availability, badge, image, description]
const R=[
['UltraTech Cement PPC 50kg','Cement','UltraTech','PPC','In Stock','Popular','cement-ultratech','Portland Pozzolana Cement for general RCC, plastering and masonry work.'],
['UltraTech Cement OPC 53 50kg','Cement','UltraTech','OPC','In Stock','','cement-ultratech','High-strength OPC 53 grade for slabs, columns and precast work.'],
['ACC Gold Cement PPC 50kg','Cement','ACC','PPC','In Stock','','cement-acc','Durable PPC cement with consistent quality for homes and commercial builds.'],
['Ambuja Cement PPC 50kg','Cement','Ambuja','PPC','In Stock','','cement-acc','Reliable cement with good workability and finish.'],
['Dalmia Cement PSC 50kg','Cement','Dalmia','PSC','Limited','','cement-acc','Portland Slag Cement, good for marine and long-life structures.'],
['TMT Bar Fe500D 8mm','Steel & TMT','Tata Tiscon','Fe500D','In Stock','Popular','tmt','Earthquake-resistant TMT bar for stirrups and light reinforcement.'],
['TMT Bar Fe500D 12mm','Steel & TMT','Tata Tiscon','Fe500D','In Stock','Bulk','tmt','Most-used reinforcement size for beams, slabs and columns.'],
['TMT Bar Fe500D 16mm','Steel & TMT','JSW Neosteel','Fe500D','In Stock','','tmt','Strong, ductile bar for columns and heavy structural members.'],
['TMT Bar Fe550 20mm','Steel & TMT','SAIL','Fe550','Limited','Bulk','tmt','High-strength bar for large spans and foundations.'],
['MS Angle & Channel','Steel & TMT','Local Mill','Mild Steel','In Stock','','steel','Angles, channels and flats for fabrication and structural frames.'],
['MS Plate & Sheet','Steel & TMT','Local Mill','Mild Steel','On Order','','steel','Plates and sheets cut to your requirement.'],
['River Sand (per brass)','Sand','Local','River Sand','In Stock','Bulk','sand','Washed river sand suitable for masonry and plaster.'],
['M-Sand (per brass)','Sand','Local','M-Sand','In Stock','Popular','msand','Manufactured sand with uniform grading, ideal for RCC and plastering.'],
['Plaster Sand (per brass)','Sand','Local','Plaster Sand','In Stock','','sand','Fine sand for smooth plaster finishing.'],
['10mm Gitti (per brass)','Gitti','Local','Aggregate','In Stock','','gitti','Crushed stone aggregate for fine concrete and flooring.'],
['20mm Gitti (per brass)','Gitti','Local','Aggregate','In Stock','Popular','gitti','Standard aggregate for RCC slabs, beams and columns.'],
['40mm Aggregate (per brass)','Gitti','Local','Aggregate','In Stock','Bulk','gitti','Coarse aggregate for foundations, PCC and road base.'],
['Red Clay Bricks (per 1000)','Bricks & Blocks','Local Kiln','Clay Brick','In Stock','Popular','brick','First-class burnt clay bricks for load-bearing walls.'],
['Fly Ash Bricks (per 1000)','Bricks & Blocks','Local Plant','Fly Ash','In Stock','','brick','Uniform fly ash bricks with a smooth finish.'],
['AAC Blocks 600x200x100','Bricks & Blocks','Local Plant','AAC','In Stock','Bulk','aac','Lightweight, insulating blocks that speed up construction.'],
['AAC Blocks 600x200x200','Bricks & Blocks','Local Plant','AAC','Limited','','aac','Thicker AAC blocks for external walls.'],
['Binding Wire (per kg)','Other','Local','GI Wire','In Stock','','wire','18-gauge annealed binding wire for rebar tying.'],
['Cover Blocks & Spacers','Other','Local','Concrete','In Stock','','wire','Maintain correct rebar cover in slabs and beams.'],
['Waterproofing Chemicals','Other','Dr. Fixit','Chemical','Limited','','cement-acc','Waterproofing and bonding agents for terraces and bathrooms.'],
].map((r,i)=>({id:i+1,name:r[0],cat:r[1],brand:r[2],material:r[3],avail:r[4],badge:r[5],img:`/images/${r[6]}.jpg`,desc:r[7]}));
export const PRODUCTS=R;
export const SLIDES=[
{label:'Cement',title:'Quality Cement',text:'Cement from trusted brands.',img:'/images/hero-cement.jpg',cat:'Cement'},
{label:'Steel',title:'Steel & TMT',text:'Reliable steel for your construction requirements.',img:'/images/hero-steel.jpg',cat:'Steel & TMT'},
{label:'Bulk',title:'Bulk Materials',text:'Ask us for bulk quantities and current rates.',img:'/images/hero-bulk.jpg',cat:'All'}];
