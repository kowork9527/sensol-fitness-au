(() => {
  const mount = root => {
    if (!root || root.dataset.homeMounted) return;
    root.dataset.homeMounted = 'true';
    const data = JSON.parse(root.querySelector('[data-home-data]').textContent);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const $ = s => root.querySelector(s), $$ = s => [...root.querySelectorAll(s)];
    const cleanup = [];
    const on = (el, event, fn, options) => { el.addEventListener(event, fn, options); cleanup.push(() => el.removeEventListener(event, fn, options)); };
    const play = video => { const p = video.play(); if (p?.catch) p.catch(() => {}); };
    const hero = $('[data-home-hero]');
    const heroSize = window.matchMedia('(max-width:749px)');
    const chooseHeroSource = () => {const mobile=heroSize.matches;hero.poster=mobile?hero.dataset.mobilePoster:hero.dataset.desktopPoster;hero.src=mobile?hero.dataset.mobileSrc:hero.dataset.desktopSrc;};
    chooseHeroSource();
    on(hero,'loadedmetadata',()=>{if(heroSize.matches&&hero.duration>20)hero.currentTime=12;});
    on(hero,'timeupdate',()=>{if(heroSize.matches&&hero.currentTime>=20)hero.currentTime=12;});
    let heroUserPaused = reduced;
    on(heroSize,'change',()=>{chooseHeroSource();if(!heroUserPaused)play(hero);});
    const heroToggle = $('[data-hero-toggle]');
    const syncHero = () => { heroToggle.textContent = hero.paused ? 'Play film' : 'Pause film'; };
    on(hero, 'play', syncHero); on(hero, 'pause', syncHero);
    on(heroToggle, 'click', () => { if(hero.paused){heroUserPaused=false;play(hero);}else{heroUserPaused=true;hero.pause();} });
    const intro = $('[data-home-intro]'), enterButton = intro.querySelector('.smh-enter');
    let introOpened = false;
    try { introOpened = sessionStorage.getItem('sensol-home-opened-v1') === 'yes'; } catch (_) {}
    let opening = false, introTimer;
    const openIntro = () => {
      if (opening || intro.hidden) return;
      opening = true; $('.smh-hero').scrollIntoView({block:'start',behavior:'instant'}); intro.classList.add('is-opening');
      try { sessionStorage.setItem('sensol-home-opened-v1', 'yes'); } catch (_) {}
      if (!heroUserPaused) play(hero);
      introTimer = window.setTimeout(() => {
        intro.hidden = true; document.body.classList.remove('smh-intro-locked');
        $('.smh-hero').removeAttribute('inert');
        if (document.activeElement === enterButton) { const link = $('.smh-hero-copy a'); link.focus({preventScroll:true}); }
      }, reduced ? 0 : 1120);
    };
    if ((!introOpened || new URLSearchParams(location.search).get('intro') === '1') && !location.hash) {
      document.body.append(intro); intro.hidden = false; document.body.classList.add('smh-intro-locked');
      intro.setAttribute('role','dialog'); intro.setAttribute('aria-modal','true'); intro.setAttribute('aria-label','Enter the SENSOL experience');
      $('.smh-hero').setAttribute('inert', '');
      on(enterButton, 'click', openIntro); enterButton.focus({preventScroll:true});
      on(intro, 'wheel', e => { if (e.deltaY > 8) { e.preventDefault(); openIntro(); } }, {passive:false});
      let touchStart = 0;
      on(intro, 'touchstart', e => { touchStart = e.touches[0].clientY; }, {passive:true});
      on(intro, 'touchmove', e => { if (touchStart - e.touches[0].clientY > 14) { e.preventDefault(); openIntro(); } }, {passive:false});
      on(document, 'keydown', e => { if(!intro.hidden && e.key==='Tab'){e.preventDefault();enterButton.focus({preventScroll:true});} if (!intro.hidden && ['ArrowDown','PageDown',' ','Enter','Escape'].includes(e.key)) { e.preventDefault(); openIntro(); } });
    } else if (!heroUserPaused) play(hero);
    const heroObserver = new IntersectionObserver(entries => entries.forEach(e => { if (!e.isIntersecting) hero.pause(); else if (!heroUserPaused && (intro.hidden || opening)) play(hero); }), {threshold:.1});
    heroObserver.observe(hero);
    const journey = $('#HomeJourney'), years = $$('[data-year-index]');
    let era = -1, manualEraUntil = 0, raf = 0;
    const showEra = index => {
      index = Math.max(0, Math.min(3,index)); if (era === index) return; era = index;
      const c = data.chapters[index];
      $('[data-year]').textContent = c.year;
      $('[data-era-title]').textContent = c.label;
      $('[data-era-status]').textContent = c.planned ? 'PLANNED / NEXT CHAPTER' : ['THE BEGINNING','A SHARED MOVEMENT','OUR AUSTRALIAN CHAPTER'][index];
      $('[data-era-countries]').textContent = c.where; $('[data-era-copy]').textContent = c.copy;
      years.forEach((b,i) => b.setAttribute('aria-current',String(i===index)));
      $$('[data-map-era]').forEach(g => { const i = Number(g.dataset.mapEra); g.classList.toggle('is-active',i===index); g.classList.toggle('is-arrived',i<index); });
      journey.dataset.currentEra = String(index);
      if(!reduced)$('.smh-timeline-readout').animate([{opacity:.2,transform:'translateY(24px)'},{opacity:1,transform:'translateY(0)'}],{duration:550,easing:'cubic-bezier(.2,.7,.2,1)'});
    };
    const updateEra = () => {
      if(root.dataset.homeRedesign==='v4')return;
      raf = 0; if (Date.now() < manualEraUntil || reduced) return;
      const r = journey.getBoundingClientRect(), range = Math.max(1,journey.offsetHeight - window.innerHeight);
      showEra(Math.floor(Math.max(0,Math.min(.999,-r.top/range))*4));
    };
    on(window,'scroll',() => { if (!raf) raf = requestAnimationFrame(updateEra); },{passive:true});
    years.forEach((b,i) => on(b,'click',() => { manualEraUntil = Date.now()+4000; showEra(i); }));
    showEra(0);
    const stage=$('[data-stage]');let stageFrame=0;const stageObserver={disconnect(){}};

    const selectSpace=i=>{
      $('#HomeSpaces').dataset.activeSpace=String(i);
      $$('[data-space-index]').forEach((el,k)=>el.setAttribute('aria-pressed',String(i===k)));
      $$('[data-space-image]').forEach((el,k)=>{el.hidden=false;el.classList.toggle('is-selected',i===k);el.setAttribute('aria-pressed',String(i===k));});
      const s=data.spaces[i];$('[data-space-kicker]').textContent=`0${i+1} / ${s.name.toUpperCase()}`;$('[data-space-title]').textContent=s.title;$('[data-space-copy]').textContent=s.copy;
    };
    $$('[data-space-index]').forEach((b,i)=>on(b,'click',()=>selectSpace(i)));$$('[data-space-image]').forEach((b,i)=>on(b,'click',()=>selectSpace(i)));selectSpace(0);
    const setup=$('.smh-setup');
    on(setup,'toggle',()=>{if(!setup.open)$$('[data-setup-video]').forEach(v=>v.pause());});
    $$('[data-setup-video]').forEach(v=>on(v,'play',()=>{$$('[data-setup-video]').forEach(other=>{if(other!==v)other.pause();});}));
    // Pointer-follow and scroll progression share one frame loop per event burst.
    let motionFrame=0;const sceneState=new Map();
    const motionScenes=[$('.smh-hero'),stage,$('#HomeSpaces')];
    const drawMotion=()=>{motionFrame=0;for(const el of motionScenes){const r=el.getBoundingClientRect(),state=sceneState.get(el)||{x:0,y:0};el.style.setProperty('--follow-x',`${state.x.toFixed(2)}px`);el.style.setProperty('--follow-y',`${state.y.toFixed(2)}px`);const p=Math.max(0,Math.min(1,(innerHeight-r.top)/(innerHeight+r.height)));el.style.setProperty('--scroll-progress',p.toFixed(3));if(el.classList.contains('smh-hero'))el.style.setProperty('--hero-reveal',`${Math.max(0,18-(p-.5)*90).toFixed(2)}%`);}};
    const queueMotion=()=>{if(!motionFrame)motionFrame=requestAnimationFrame(drawMotion);};
    if(!reduced){for(const el of motionScenes){on(el,'pointermove',e=>{if(e.pointerType==='touch')return;const r=el.getBoundingClientRect();sceneState.set(el,{x:((e.clientX-r.left)/r.width-.5)*36,y:((e.clientY-r.top)/r.height-.5)*22});queueMotion();});on(el,'pointerleave',()=>{sceneState.set(el,{x:0,y:0});queueMotion();});}on(window,'scroll',queueMotion,{passive:true});on(window,'resize',queueMotion);}
    years.forEach((b,i)=>on(b,'pointerenter',()=>{if(matchMedia('(hover:hover)').matches){manualEraUntil=Date.now()+1200;showEra(i);}}));
    const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>e.target.classList.toggle('is-in-view',e.isIntersecting)),{threshold:.15});
    $$('.smh-system-card,.smh-service-grid>a').forEach(el=>revealObserver.observe(el));
    cleanup.push(()=>{cancelAnimationFrame(motionFrame);revealObserver.disconnect();});drawMotion();
    on(document,'shopify:section:unload',e => { if(e.detail?.sectionId===root.dataset.sectionId) { cleanup.forEach(fn=>fn());cancelAnimationFrame(stageFrame);clearTimeout(introTimer);cancelAnimationFrame(raf);heroObserver.disconnect();stageObserver.disconnect();intro.remove();document.body.classList.remove('smh-intro-locked'); } });
  };
  document.querySelectorAll('[data-sensol-home]').forEach(mount);
  document.addEventListener('shopify:section:load',e => mount(e.target.querySelector('[data-sensol-home]')));
})();
