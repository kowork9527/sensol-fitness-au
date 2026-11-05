(()=>{
 const section=document.querySelector('.rs03-colours'),frame=document.querySelector('.closing-frame');
 if(!section||!frame)return;
 const cards=[...section.querySelectorAll('[data-rs03-colour]')];
 let selected=cards.find(c=>c.getAttribute('aria-pressed')==='true')?.dataset.rs03Colour||'Black';
 function show(name){
  if(!cards.some(c=>c.dataset.rs03Colour===name))return;
  selected=name;
  cards.forEach(c=>c.setAttribute('aria-pressed',String(c.dataset.rs03Colour===name)));
  section.querySelector('[data-rs03-colour-selected]').textContent=name;
 }
 function sync(){frame.contentWindow?.postMessage({type:'sensol-rs03-select-colour',name:selected},location.origin);}
 cards.forEach(card=>card.addEventListener('click',()=>{show(card.dataset.rs03Colour);sync();}));
 frame.addEventListener('load',sync);
 addEventListener('message',e=>{
  if(e.origin!==location.origin||e.source!==frame.contentWindow)return;
  if(e.data?.type==='sensol-rs03-colour-changed')show(e.data.name);
 });
 show(selected);sync();
})();
