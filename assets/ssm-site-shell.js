(() => {
 const mount=()=>{const header=document.querySelector('.ss-site-header');if(!header||header.dataset.shellMounted)return;header.dataset.shellMounted='true';let frame=0;const update=()=>{frame=0;header.dataset.scrolled=String(scrollY>32);};const queue=()=>{if(!frame)frame=requestAnimationFrame(update);};window.addEventListener('scroll',queue,{passive:true});update();};mount();document.addEventListener('shopify:section:load',mount);
})();
