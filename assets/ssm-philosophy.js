(()=>{
function init(root){
if(root.dataset.ready)return;root.dataset.ready='true';
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const manifest=root.querySelector('[data-sp-manifesto]');
if(manifest){const lines=manifest.innerHTML.split(/<br\s*\/?\s*>/i);manifest.innerHTML=lines.map(line=>line.split(/\s+/).map(w=>`<span>${w}</span>`).join(' ')).join('<br>');}
const words=manifest?.querySelectorAll('span')||[];
let scheduled=false;
function scroll(){scheduled=false;const h=innerHeight;const hero=root.querySelector('.sp-hero').getBoundingClientRect();const progress=Math.min(1,Math.max(0,-hero.top/hero.height));root.style.setProperty('--progress',`${progress*100}%`);if(!reduced)root.style.setProperty('--photo-shift',`${Math.min(14,Math.max(-14,hero.top*.025))}px`);if(manifest){const r=manifest.getBoundingClientRect();const p=reduced?1:Math.max(0,Math.min(1,(h*.87-r.top)/(h*.45)));words.forEach((w,i)=>w.classList.toggle('is-read',i<Math.ceil(p*words.length)));}}
function request(){if(!scheduled){scheduled=true;requestAnimationFrame(scroll);}}
window.addEventListener('scroll',request,{passive:true});window.addEventListener('resize',request);scroll();
const photos=[['sensol-home-ig-DdbQJmfFs5A_02.jpg?v=1792572333','FLEX AIR practice in a warm home interior','01 / A PLACE IN YOUR EVERYDAY'],['sensol-home-ig-DbnY3UdG_XK_03.jpg?v=1792572351','FLEX AIR lunge and reach practice','02 / YOUR WAY TO MOVE'],['sensol-home-ig-DbnY3UdG_XK_02.jpg?v=1792572345','FLEX AIR hand strap detail during practice','03 / DETAILS WITH A PURPOSE']];
const details=[...root.querySelectorAll('[data-sp-principle]')];let photoIndex=0;
details.forEach((detail,i)=>detail.addEventListener('toggle',()=>{if(!detail.open)return;details.forEach(other=>{if(other!==detail)other.open=false;});if(photoIndex===i)return;photoIndex=i;const img=root.querySelector('[data-sp-principle-image]');img.style.opacity='0';img.onload=()=>img.style.opacity='1';img.src='https://cdn.shopify.com/s/files/1/1020/4263/2324/files/'+photos[i][0];img.alt=photos[i][1];if(img.complete)img.style.opacity='1';root.querySelector('[data-sp-caption]').textContent=photos[i][2];}));
const years=[['2022','North America.','United States · Canada','The SENSOL journey begins in the United States and Canada.','OUR FIRST CHAPTER'],['2023','Across Europe.','Germany · United Kingdom · Spain · Italy · Czechia · Denmark','The journey continues across six European markets.','A GROWING COMMUNITY'],['2026','Hello, Australia.','Australia','A new Australian chapter, bringing SENSOL into more everyday spaces.','OUR AUSTRALIAN CHAPTER'],['2027','Looking ahead.','Singapore · South Korea · Indonesia','Our next planned chapter takes SENSOL into three more Asian markets.','PLANNED EXPANSION']];
const buttons=[...root.querySelectorAll('[data-sp-year]')];
function year(i){buttons.forEach((b,j)=>b.setAttribute('aria-pressed',String(i===j)));const y=years[i];['number','title','countries','copy','state'].forEach((key,k)=>root.querySelector('[data-sp-year-'+key+']').textContent=y[k]);root.querySelectorAll('[data-sp-region]').forEach((p,j)=>p.classList.toggle('is-active',i===j));root.style.setProperty('--globe-turn',`${[0,-9,7,-5][i]}deg`);}
buttons.forEach((b,i)=>{b.addEventListener('click',()=>year(i));b.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?3:(i+(e.key==='ArrowRight'?1:3))%4;year(next);buttons[next].focus();});});year(0);
}
document.querySelectorAll('[data-sensol-philosophy]').forEach(init);document.addEventListener('shopify:section:load',e=>e.target.querySelectorAll('[data-sensol-philosophy]').forEach(init));
})();
