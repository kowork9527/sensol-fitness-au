(()=>{
const mounted=new WeakSet();
const parts=[
['Aluminium rail','A clear path for the platform.','The rail gives the platform a defined line to travel along, rather than allowing it to move freely in every direction.','You can focus on controlling the sliding movement. FLEX AIR provides up to 840 mm of platform travel.','left'],
['Padded platform','Cushioning where you make contact.','Foam sits beneath the leather cover to cushion the surface used for kneeling and seated positions.','You have a padded contact area rather than bare metal. The sliding platform measures 410 × 300 mm.','right'],
['Spring mechanism','Resistance, without a motor.','The spring mechanism resists the platform’s movement. The reformer is driven by your own movement rather than an electric motor.','You do not need a power outlet to use the equipment. You control the movement and the return.','right'],
['PU armrests','A defined place for your hands.','The armrests give your hands a separate contact point beside the padded surface. Their PU covering forms the grip surface.','You can use the hand positions shown in the product video for supported movements and transitions.','left']
];
function mount(root){
if(mounted.has(root))return;mounted.add(root);
const buttons=[...root.querySelectorAll('[data-air-part]')],detail=root.querySelector('.air-parts-detail'),readout=root.querySelector('.air-parts-readout'),images=[...root.querySelectorAll('[data-part-image]')],close=root.querySelector('[data-part-close]');
let selected=-1,frame=0;
function select(index){
selected=index;const d=parts[index];if(frame)cancelAnimationFrame(frame);
root.dataset.openSide=d[4];detail.hidden=false;readout.hidden=false;
images.forEach((img,i)=>{img.hidden=i!==index;});
root.querySelector('[data-part-kicker]').textContent=String(index+1).padStart(2,'0')+' / '+d[0].toUpperCase();
root.querySelector('[data-part-title]').textContent=d[1];
root.querySelector('[data-part-why]').textContent=d[2];
root.querySelector('[data-part-benefit]').textContent=d[3];
buttons.forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.airPart)===index)));
frame=requestAnimationFrame(()=>{root.classList.add('is-open');frame=0;});
}
function reset(focus){
if(frame)cancelAnimationFrame(frame);frame=0;
const previous=selected;selected=-1;root.classList.remove('is-open');delete root.dataset.openSide;detail.hidden=true;readout.hidden=true;
buttons.forEach(b=>b.setAttribute('aria-pressed','false'));
if(focus&&previous>=0)buttons.find(b=>Number(b.dataset.airPart)===previous)?.focus({preventScroll:true});
}
buttons.forEach(b=>b.addEventListener('click',()=>select(Number(b.dataset.airPart))));
close.addEventListener('click',()=>reset(true));
root.addEventListener('keydown',e=>{if(e.key==='Escape'&&selected>=0){reset(true);e.preventDefault();}});
}
document.querySelectorAll('[data-air-parts]').forEach(mount);
document.addEventListener('shopify:section:load',e=>e.target.querySelectorAll('[data-air-parts]').forEach(mount));
})();