(()=>{
  const mounted=new WeakSet();
  function mount(root){
    if(mounted.has(root))return;mounted.add(root);
    const panels=[...root.querySelectorAll('[data-bridge-panel]')],buttons=[...root.querySelectorAll('[data-bridge-go]')],stage=root.querySelector('.air-bridge-stage'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
    let raf=0,disposed=false;
    const clamp=v=>Math.max(0,Math.min(1,v));
    function paint(){raf=0;if(disposed)return;if(reduced.matches){panels.forEach(p=>{p.removeAttribute('aria-hidden');p.style.opacity='1';p.style.visibility='visible';});return;}
      const range=Math.max(1,root.offsetHeight-stage.offsetHeight),progress=clamp(-root.getBoundingClientRect().top/range),cursor=progress*3,index=Math.min(2,Math.floor(cursor));
      panels.forEach((panel,i)=>{const local=cursor-i,fadeIn=i===0?1:clamp((local+.09)/.18),fadeOut=i===2?1:clamp((1.09-local)/.18),alpha=Math.min(fadeIn,fadeOut);panel.style.opacity=String(alpha);panel.style.visibility=alpha>0?'visible':'hidden';panel.setAttribute('aria-hidden',String(i!==index));panel.classList.toggle('is-active',i===index);panel.style.setProperty('--bridge-scale',String(i===0?1.03+clamp(local)*.16:i===1?1.08-clamp(local)*.08:1+clamp(local)*.04));});
      buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));root.dataset.bridgeStep=String(index);
    }
    function schedule(){if(!raf&&!disposed)raf=requestAnimationFrame(paint);}
    buttons.forEach((button,i)=>button.addEventListener('click',()=>{if(reduced.matches)return;const range=Math.max(1,root.offsetHeight-stage.offsetHeight);window.scrollTo({top:scrollY+root.getBoundingClientRect().top+range*((i+.35)/3),behavior:'instant'});schedule();}));
    window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);reduced.addEventListener('change',schedule);paint();
    document.addEventListener('shopify:section:unload',e=>{if(e.target.contains(root)){disposed=true;window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);reduced.removeEventListener('change',schedule);if(raf)cancelAnimationFrame(raf);}});
  }
  document.querySelectorAll('[data-air-bridge]').forEach(mount);
  document.addEventListener('shopify:section:load',e=>e.target.querySelectorAll('[data-air-bridge]').forEach(mount));
})();

