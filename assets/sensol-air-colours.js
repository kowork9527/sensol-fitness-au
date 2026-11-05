(()=>{
  const cards=()=>Array.from(document.querySelectorAll('[data-air-variant]'));
  let chosen=null,syncingCart=false;
  function show(card){if(!card)return;chosen={id:card.dataset.airVariant,name:card.dataset.airName};cards().forEach(c=>c.setAttribute('aria-pressed',String(c.dataset.airVariant===chosen.id)));document.querySelectorAll('[data-air-colour-selected]').forEach(el=>el.textContent=chosen.name);}
  function syncCart(){if(!chosen)return;const select=document.getElementById('CartAirVariant');if(select&&Array.from(select.options).some(o=>o.value===chosen.id)&&select.value!==chosen.id){select.value=chosen.id;syncingCart=true;try{select.dispatchEvent(new Event('change',{bubbles:true}));}finally{syncingCart=false;}}}
  show(cards().find(c=>c.getAttribute('aria-pressed')==='true'));
  document.addEventListener('click',event=>{
    const card=event.target.closest('[data-air-variant]');
    if(card){show(card);syncCart();const input=Array.from(document.querySelectorAll('variant-selects input[type=radio]')).find(i=>i.value===chosen.name);if(input&&!input.checked)input.click();}
    if(event.target.closest('.motion-floating-cta'))syncCart();
  });
  document.addEventListener('change',event=>{
    if(event.target.id==='CartAirVariant'){const card=cards().find(c=>c.dataset.airVariant===event.target.value);show(card);if(syncingCart)return;const input=Array.from(document.querySelectorAll('variant-selects input[type=radio]')).find(i=>i.value===chosen?.name);if(input&&!input.checked)input.click();}
    else if(event.target.matches('variant-selects input[type=radio]')){show(cards().find(c=>c.dataset.airName===event.target.value));syncCart();}
  });
})();
