(() => {
 const mount=root=>{
  if(root.dataset.flexMounted)return;root.dataset.flexMounted='true';
  const data=JSON.parse(root.querySelector('[data-flex-courses]').textContent),$=s=>root.querySelector(s),$$=s=>[...root.querySelectorAll(s)];
  let selected=0,detail=false;
  const render=()=>{
   const c=data[selected];root.dataset.view=detail?'detail':'browse';
   $('[data-flex-screen]').src=detail?c.detail:c.list;
   $('[data-flex-screen]').alt=`SENSOL FLEX ${detail?'class details':'course list'}: ${c.title}`;
   $('[data-flex-title]').textContent=c.title;$('[data-flex-category]').textContent=c.focus.toUpperCase();$('[data-flex-duration]').textContent=c.duration;$('[data-flex-summary]').textContent=c.summary;
   $('[data-flex-caption]').textContent=detail?'CLASS DETAILS / REAL APP SCREEN':'COURSES / REAL APP SCREEN';
   $('[data-flex-open]').textContent=detail?'Download SENSOL FLEX ↗':'View on the phone →';
   $('[data-flex-instruction]').textContent=detail?'Explore the class screen. Download SENSOL FLEX to start your practice.':'Tap the featured course on the phone to see its details.';
   $('[data-flex-back]').hidden=!detail;$('[data-flex-tile]').hidden=detail;$('[data-flex-phone-back]').hidden=!detail;$('[data-flex-start]').hidden=!detail;
   $('[data-flex-tile]').setAttribute('aria-label',`View ${c.title} on the phone`);
   $('[data-flex-list]').setAttribute('aria-pressed',String(!detail));$('[data-flex-detail]').setAttribute('aria-pressed',String(detail));
   $$('[data-flex-goal]').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===selected)));
  };
  const view=value=>{detail=value;render();};
  $$('[data-flex-goal]').forEach((b,i)=>b.addEventListener('click',()=>{selected=i;view(false);}));
  $('[data-flex-list]').addEventListener('click',()=>view(false));$('[data-flex-detail]').addEventListener('click',()=>view(true));
  $('[data-flex-tile]').addEventListener('click',()=>view(true));$('[data-flex-phone-back]').addEventListener('click',()=>view(false));
  $('[data-flex-back]').addEventListener('click',()=>view(false));
  const dialog=$('[data-flex-dialog]'),download=()=>dialog.showModal();
  $('[data-flex-start]').addEventListener('click',download);$('[data-flex-open]').addEventListener('click',()=>detail?download():view(true));
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  render();
 };
 document.querySelectorAll('[data-flex-preview]').forEach(mount);
 document.addEventListener('shopify:section:load',e=>e.target.querySelectorAll('[data-flex-preview]').forEach(mount));
})();
