/*
 * Installed iPhone only — allow the existing closet artwork to extend behind
 * the iOS status bar instead of leaving the default opaque white strip.
 * No wardrobe, navigation, illustration, or desktop layout changes.
 */
(() => {
  'use strict';
  const installed = navigator.standalone === true ||
    (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches);
  const phone = /iPhone/i.test(navigator.userAgent);
  if (!installed || !phone) return;

  const viewport = document.querySelector('meta[name="viewport"]');
  if (viewport && !/viewport-fit\s*=/.test(viewport.content)) {
    viewport.content += ', viewport-fit=cover';
  }

  let statusBar = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
  if (!statusBar) {
    statusBar = document.createElement('meta');
    statusBar.name = 'apple-mobile-web-app-status-bar-style';
    document.head.appendChild(statusBar);
  }
  statusBar.content = 'black-translucent';

  // Extend the page's existing background, rather than replacing its artwork.
  const style = document.createElement('style');
  style.id = 'th-installed-iphone-status-bar-fix';
  style.textContent = `
    html, body { min-height:100%; }
    body { min-height:100vh; min-height:100dvh; }
  `;
  document.head.appendChild(style);
})();

/*
 * Tulip & Honey Closet — iPhone layout only, v7.1 (V7 layout + category counter; normal scrolling; four tabs).
 * Original wardrobe records, storage, Supabase authentication and cloud code remain untouched.
 * Desktop layout remains unchanged. No external resources or analytics are loaded.
 * Reversible: remove this file's <script> tag from index.html.
 */
(() => {
  'use strict';
  const MOBILE_QUERY = '(max-width: 720px)';
  const media = window.matchMedia(MOBILE_QUERY);
  const css = `
/* Mobile-only interface: preserves all original design variables, authentication, data, and actions. */
#thMobileNav,#thMobileMore,#thMobileCollections { display:none; }
@media ${MOBILE_QUERY} {
  html { scroll-padding-top:14px; }
  body { overflow-x:hidden; }
  .app { padding:12px 12px calc(96px + env(safe-area-inset-bottom)); max-width:100%; }
  .app>header { position:relative; z-index:7; display:grid; grid-template-columns:minmax(0,1fr) auto;
    column-gap:10px; row-gap:12px; padding:14px 14px 12px; border-radius:25px; }
  .app>header .brand { font-size:clamp(23px,6vw,28px); line-height:1.1; white-space:normal; }
  .app>header .brand+.sub { font-size:11px; margin-top:5px; }
  .app>header .tabs { grid-column:1/-1; grid-row:2; width:100%; display:grid; grid-template-columns:1fr 1fr; gap:7px; }
  .app>header .tabs button { padding:12px 7px; min-width:0; border-radius:17px; font-size:13px; }
  .app>header .sound { display:none!important; }
  #thMobileMore .sound { display:flex!important; flex-wrap:wrap; gap:10px; margin:8px 0 0; }
  #thMobileMore .sound label { flex:1; }
  .app>.hero { display:flex; align-items:center; min-height:90px; margin:11px 0;
    padding:14px 15px; border-radius:23px; gap:8px; } /* Original welcome artwork retained, made compact */
  .app>.hero h1 { font-size:clamp(21px,5.6vw,25px); margin:0 0 5px; }
  .app>.hero p { font-size:11px; line-height:1.45; }
  .app>.hero .art { flex:0 0 65px; width:65px; height:70px; }
  #cloudPanel { margin:0; }
  .app>.layout { display:flex; flex-direction:column; gap:11px; min-width:0; margin-top:10px; }
  .app>.layout>.panel.side { order:0; display:flex; flex-flow:row nowrap; align-items:center;
    gap:7px; width:100%; min-width:0; max-height:none; overflow-x:auto; overflow-y:hidden;
    -webkit-overflow-scrolling:touch; overscroll-behavior-inline:contain;
    touch-action:pan-x; scrollbar-width:none; padding:12px 11px; border-radius:23px;
    white-space:nowrap; scroll-behavior:auto; }
  .app>.layout>.panel.side::-webkit-scrollbar { display:none; }
  .app>.layout>.panel.side h3 { display:none!important; }
  .app>.layout>.panel.side .cat { display:inline-flex; flex:0 0 auto; width:auto; white-space:nowrap;
    align-items:center; gap:7px; font-size:12px; line-height:1.2; margin:0; padding:11px 14px;
    border-radius:999px; background:linear-gradient(165deg,#fff,var(--accent-soft));
    box-shadow:inset 0 1px 1px #fff,0 4px 10px #97738b16; border:1px solid #fff9; }
  .app>.layout>.panel.side .cat.selected { background:linear-gradient(155deg,#ffffff7d,var(--accent) 45%,var(--accent));
    color:white; text-shadow:0 1px 2px #65466755; }
  .app>.layout>.panel.side .subcats { display:none; margin:0; padding:0; border:0; }
  .app>.layout>.panel.side .subcats.expanded { display:contents; }
  .app>.layout>.panel.side .cat[data-filter="Outfits"] { display:none!important; } /* Dedicated bottom Outfits tab */
  .app>.layout>.panel.side .cat.child { border:1px solid var(--accent-soft); background:var(--glow); padding:10px 12px; font-size:11px; }
  .app>.layout>.panel.side .cat.child.selected { background:var(--accent); color:white; }
  .app>.layout>.panel.side .cat .arrow { display:inline; margin-left:2px; float:none; }
  .app>.layout>main.panel { order:1; width:100%; min-width:0; padding:15px 12px 17px; border-radius:25px; }
  main.panel>.mainhead { align-items:center; gap:8px; flex-wrap:nowrap; }
  main.panel>.mainhead h2 { font-size:clamp(24px,6vw,29px); }
  main.panel>.mainhead .sub { font-size:11px; }
  main.panel>.mainhead #add { flex-shrink:0; padding:11px 12px; font-size:12px; border-radius:15px; white-space:nowrap; }
  main.panel>.controls { display:flex; margin:11px 0 15px; gap:8px; }
  main.panel>.controls #search { display:block; width:100%; flex:1 1 100%; min-width:0; margin:0;
    padding:12px 13px; font-size:14px; border-radius:15px; }
  main.panel>.controls #sort,main.panel>.controls #backup,main.panel>.controls #restore { display:none; }
  main.panel>.grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px; padding-top:6px; }
  main.panel>.grid .item { position:relative; min-width:0; padding:2px 2px 9px; }
  main.panel>.grid .polaroid { padding:8px 8px 6px; }
  main.panel>.grid .polaroid-caption { min-height:53px; padding:7px 2px 3px; }
  main.panel>.grid .handwriting { font-size:13px; line-height:1.25; }
  main.panel>.grid .card-tag { font-size:10px; margin-top:7px; }
  main.panel>.grid .item-actions { margin:0; display:flex; justify-content:center; padding:7px; flex-wrap:wrap;
    gap:5px; border:1px solid var(--glass-border); background:var(--glass);
    border-radius:14px; box-shadow:0 8px 26px #97738b33; }
  main.panel>.grid .item-actions button { font-size:11px; padding:8px 10px; }
  main.panel>.grid details.th-card-actions { position:absolute; top:9px; right:9px; z-index:4; }
  main.panel>.grid details.th-card-actions>summary { width:28px; height:28px; display:grid; place-items:center;
    cursor:pointer; list-style:none; border-radius:999px; background:#fffefaed;
    color:var(--accent-ink); font-size:19px; font-weight:bold; line-height:1;
    border:1px solid #fff; box-shadow:0 4px 12px #98728d28; }
  main.panel>.grid details.th-card-actions>summary::-webkit-details-marker {display:none;}
  main.panel>.grid details.th-card-actions .item-actions { position:absolute; top:32px; right:0; width:max-content;
    min-width:126px; max-width:195px; }
  main.panel>.grid .dressing-lounge { grid-column:1/-1; }
  #thMobileMore { display:none; margin:11px 0; padding:15px 13px; border-radius:25px;
    background:var(--glass); border:1.5px solid var(--glass-border);
    backdrop-filter:blur(23px) saturate(1.35); -webkit-backdrop-filter:blur(23px) saturate(1.35);
    box-shadow:0 14px 38px #8b64851c,inset 0 1px 0 #ffffffed; }
  body.th-mobile-more #thMobileMore { display:block; }
  #thMobileMore h2,#thMobileCollections h2 { font:normal 24px Georgia,serif;
    color:var(--accent-ink); margin:0 0 12px; }
  #thMobileMore #cloudPanel { padding:15px 12px; margin-bottom:12px; border-radius:20px; }
  #thMobileMore #cloudPanel .mainhead { gap:10px; }
  #thMobileMore #cloudPanel .mainhead #configure { padding:8px 10px; font-size:11px; }
  #thMobileMore #authArea .controls { display:flex; flex-wrap:wrap; }
  #thMobileMore #authArea .controls input { width:100%; min-width:0; }
  #thMobileMore .th-mobile-tools { display:flex; flex-wrap:wrap; align-items:center; gap:9px;
    padding:12px; background:#ffffff57; border:1px solid #fff; border-radius:18px; margin-top:12px; }
  #thMobileMore .th-mobile-tools label { color:var(--accent-ink); font-size:12px; font-weight:bold; }
  #thMobileMore .th-mobile-tools select { width:100%; }
  #thMobileMore .th-mobile-tools button { flex:1; }
  #thMobileMore .th-mobile-sound { padding:12px; background:#ffffff57; border:1px solid #fff;
    border-radius:18px; margin-top:12px; }
  #thMobileCollections { display:none; width:100%; padding:14px; border-radius:24px;
    background:var(--glass); border:1.5px solid var(--glass-border); box-shadow:0 14px 38px #8b64851c; }
  body.th-mobile-collections #thMobileCollections { display:block; }
  #thMobileCollections .th-cat-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:8px; }
  #thMobileCollections .th-cat-grid button { width:100%; text-align:left; padding:12px 11px;
    background:linear-gradient(145deg,#fff,var(--accent-soft)); border-radius:14px; font-size:12px; }
  #thMobileNav { display:grid; position:fixed; left:50%; bottom:max(9px,env(safe-area-inset-bottom));
    transform:translateX(-50%); z-index:60; width:min(430px,calc(100vw - 24px));
    grid-template-columns:repeat(4,minmax(0,1fr)); align-items:center; gap:5px;
    padding:9px 9px 8px; border-radius:23px; background:var(--glass); border:1.5px solid #fff;
    backdrop-filter:blur(23px) saturate(1.35); -webkit-backdrop-filter:blur(23px) saturate(1.35);
    box-shadow:0 12px 32px #8b64852d,inset 0 1px 0 #fff; }
  body:has(.modal.show) #thMobileNav { display:none; } /* Keep form buttons accessible */
  #thMobileNav button { background:transparent; border:0; box-shadow:none; display:grid; place-items:center;
    gap:3px; padding:7px 3px; min-width:0; border-radius:16px; font-size:10.5px; font-weight:bold;
    color:var(--accent-ink); }
  #thMobileNav button.th-active { background:linear-gradient(145deg,#fff,var(--accent-soft)); }
  #thMobileNav svg { width:21px; height:21px; stroke:currentColor; fill:none;
    stroke-width:1.8; stroke-linecap:round; stroke-linejoin:round; }
  .app>.footer { margin-bottom:8px; }
}
/* V6: Keep the page itself scrollable. The wardrobe wall can scroll locally,
   but no viewport/body scroll lock is applied. */
#thMobileBrowse {display:none;}
@media ${MOBILE_QUERY} {
  html {height:auto!important;min-height:100%;overflow-y:auto!important;scroll-behavior:auto;}
  body {height:auto!important;min-height:100dvh;overflow-y:auto!important;overflow-x:hidden;}
  .app {height:auto!important;min-height:100dvh;max-height:none!important;
    overflow:visible!important;padding:12px 12px calc(110px + env(safe-area-inset-bottom));}
  .app>header {height:auto;overflow:visible;}
  .app>.hero {display:none!important;}
  .app>.layout {display:flex;flex-direction:column;gap:12px;min-height:0;
    height:auto;max-height:none;overflow:visible;margin-top:12px;}
  .app>.layout>.panel.side {display:none!important;}
  .app>.layout>main.panel {display:flex;flex-direction:column;height:auto;max-height:none;
    min-height:0;overflow:visible;padding:14px 12px 16px;}
  .app>.layout>main.panel>.controls {margin:11px 0 10px;flex:0 0 auto;}
  #thMobileBrowse {display:flex;align-items:center;gap:10px;padding:10px 11px;
    margin:0 0 12px;border-radius:16px;background:linear-gradient(135deg,var(--glow),var(--accent-soft));
    border:1px solid #fff9;box-shadow:inset 0 1px 0 #fff;flex:0 0 auto;}
  #thMobileBrowse label {flex:1 1 0;min-width:0;display:flex;flex-direction:column;gap:3px;
    color:var(--accent-ink);font-weight:700;font-size:12px;}
  #thMobileBrowse label small {font-weight:400;font-size:10px;opacity:.8;}
  #thMobileCategorySelect {flex:0 1 57%;width:57%;max-width:57%;min-width:0;
    color:var(--accent-ink);background:#fffdfae8;padding:11px 28px 11px 11px;border-radius:13px;
    border:1px solid #fffa;font-weight:bold;font-size:12px;}
  .app>.layout>main.panel>#grid.grid {display:grid;max-height:min(52dvh,520px);
    min-height:160px;overflow-y:auto;overflow-x:hidden;align-content:start;
    padding:3px 5px 24px;overscroll-behavior-y:auto;
    -webkit-overflow-scrolling:touch;scrollbar-width:thin;scrollbar-color:var(--accent-soft) transparent;}
  .app>.layout>main.panel>#grid.dressing-lounge {display:grid;grid-template-columns:minmax(0,1fr);
    overflow:visible;max-height:none;min-height:0;}
  #thMobileMore {margin:11px 0;max-height:none;overflow:visible;}
  #thMobileCollections {max-height:none;overflow:visible;}
  body.th-mobile-more .app>.layout {display:none;}
  body.th-mobile-collections .app>.layout>main.panel {display:none;}
  body.th-mobile-collections .app>.layout>#thMobileCollections {display:block;}
  body.th-mobile-outfits .app>.layout>main.panel>#thMobileBrowse,
  body.th-mobile-outfits .app>.layout>main.panel>.controls {display:none;}
  #thMobileNav {display:grid!important;position:fixed;bottom:max(9px,env(safe-area-inset-bottom));}
  body:has(.modal.show) #thMobileNav {display:none!important;}
  .app>.footer {display:none;}
}
`;

  function start() {
    const app = document.querySelector('.app');
    const header = app?.querySelector('header');
    const layout = app?.querySelector('.layout');
    const sidebar = document.getElementById('categories');
    const grid = document.getElementById('grid');
    const cloudPanel = document.getElementById('cloudPanel');
    const search = document.getElementById('search');
    const sort = document.getElementById('sort');
    const backup = document.getElementById('backup');
    const restore = document.getElementById('restore');
    const sound = document.querySelector('.app>header .sound');
    if (!app || !header || !layout || !sidebar || !grid || !cloudPanel || !search || !sort || !backup || !restore || !sound) return;

    // Safety: do not apply layout CSS unless every required element exists.
    // This preserves the original closet if app markup ever changes.
    const style = document.createElement('style');
    style.id = 'tulip-honey-mobile-styles';
    style.textContent = css;
    document.head.appendChild(style);

    const original = {
      cloudParent:cloudPanel.parentNode, cloudNext:cloudPanel.nextSibling,
      sortParent:sort.parentNode, sortNext:sort.nextSibling,
      backupParent:backup.parentNode, backupNext:backup.nextSibling,
      restoreParent:restore.parentNode, restoreNext:restore.nextSibling,
      soundParent:sound.parentNode, soundNext:sound.nextSibling
    };
    const after = (parent, el, next) => parent.insertBefore(el, next && next.parentNode === parent ? next : null);
    const more = document.createElement('section');
    more.id = 'thMobileMore';
    more.setAttribute('aria-label', 'Cloud, backups, and preferences');
    more.innerHTML = '<h2>Cloud &amp; little extras ♡</h2><div id="thMobileCloud"></div><div class="th-mobile-tools"><label for="sort">Sort your Polaroids</label></div><div class="th-mobile-sound"></div>';
    header.after(more);
    const collectionPanel = document.createElement('section');
    collectionPanel.id = 'thMobileCollections';
    collectionPanel.setAttribute('aria-label','All closet categories');
    collectionPanel.innerHTML = '<h2>My collections ♡</h2><div class="th-cat-grid"></div>';
    layout.insertBefore(collectionPanel, sidebar);
    // A compact category picker lives above the existing Polaroid wall.
    // It dispatches the original category button events, preserving existing filters and saved records.
    const mainPanel=grid.closest('main.panel');
    const browse=document.createElement('div');
    browse.id='thMobileBrowse';
    browse.innerHTML='<label for="thMobileCategorySelect">Browse collections<small>Pick a category without leaving your wall</small></label><select id="thMobileCategorySelect" aria-label="Browse clothing collections"><option value="All">All pieces</option></select>';
    mainPanel.insertBefore(browse,grid);
    const categorySelect=browse.querySelector('#thMobileCategorySelect');
    const buildBrowseOptions=()=>{
      if(!isMobile)return;
      const existing=categorySelect.value;
      const selected=sidebar.querySelector('.cat.selected')?.dataset.filter||'All';
      categorySelect.replaceChildren();
      const all=document.createElement('option');all.value='All';all.textContent='All pieces';categorySelect.appendChild(all);
      sidebar.querySelectorAll(':scope > .cat[data-filter]').forEach(b=>{
        const name=b.dataset.filter;
        if(name==='All'||name==='Outfits')return;
        const option=document.createElement('option');option.value=name;option.textContent=name;
        categorySelect.appendChild(option);
        const sub=b.nextElementSibling;
        if(sub?.classList?.contains('subcats')){
          sub.querySelectorAll('.cat.child[data-filter]').forEach(child=>{
            const childOption=document.createElement('option');childOption.value=child.dataset.filter;
            childOption.textContent='  '+name+' · '+child.dataset.filter;
            categorySelect.appendChild(childOption);
          });
        }
      });
      categorySelect.value=selected;
      if(categorySelect.selectedIndex<0)categorySelect.value=existing;
      if(categorySelect.selectedIndex<0)categorySelect.value='All';
    };
    categorySelect.addEventListener('change',()=>{
      const name=categorySelect.value;
      const b=Array.from(sidebar.querySelectorAll('.cat[data-filter]')).find(x=>x.dataset.filter===name);
      if(b){b.click();grid.scrollTop=0;setPage('closet');}
    });
    const nav = document.createElement('nav');
    nav.id = 'thMobileNav';
    nav.setAttribute('aria-label','Closet navigation');
    const icons={
      closet:'<path d="M4 8h16v13H4z"/><path d="M8 8V5a4 4 0 0 1 8 0v3"/><path d="M4 12h16"/>',
      outfits:'<path d="m9 4 3 2 3-2 5 5-3 3-2-2v11H9V10l-2 2-3-3z"/>',
      collections:'<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
      more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>'
    };
    const labels={closet:'Closet',outfits:'Outfits',collections:'Collections',more:'More'};
    nav.innerHTML=Object.keys(labels).map(key=>'<button type="button" data-th-nav="'+key+'"'+(key==='closet'?' class="th-active"':'')+' aria-label="'+labels[key]+'"><svg viewBox="0 0 24 24" aria-hidden="true">'+icons[key]+'</svg><span>'+labels[key]+'</span></button>').join('');
    document.body.appendChild(nav);
    let currentView = 'closet';
    let isMobile = false;
    const markNav = view => {
      currentView=view;
      nav.querySelectorAll('button').forEach(b=>{
        const on=b.dataset.thNav === view;
        b.classList.toggle('th-active',on);
        if(on)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');
      });
    };
    const setPage = (view) => {
      document.body.classList.toggle('th-mobile-more',view==='more');
      document.body.classList.toggle('th-mobile-collections',view==='collections');
      document.body.classList.toggle('th-mobile-outfits',view==='outfits');
      markNav(view);
      if(view==='collections') buildCollectionMenu();
    };
    function buildCollectionMenu() {
      const buttons=sidebar.querySelectorAll(':scope > .cat:not(.child)');
      const holder=collectionPanel.querySelector('.th-cat-grid');
      holder.replaceChildren();
      buttons.forEach(b=>{
        if(b.dataset.filter==='Outfits')return; // Outfits has its own bottom tab.
        const target=document.createElement('button');
        target.type='button';
        target.textContent=b.textContent.replace('⌄','').trim();
        target.onclick=()=>{
          // Use the existing closet filter handler, not a second data/filter implementation.
          const currentButton=Array.from(sidebar.querySelectorAll(':scope > .cat')).find(x=>x.dataset.filter===b.dataset.filter);
          if(currentButton) currentButton.click();
          setPage('closet');
          grid.scrollTop=0;
        };
        holder.appendChild(target);
      });
    }
    const originalControls = {sort,backup,restore};
    const moveToMobile = () => {
      more.querySelector('#thMobileCloud').appendChild(cloudPanel);
      const controls=more.querySelector('.th-mobile-tools');
      controls.append(originalControls.sort,originalControls.backup,originalControls.restore);
      more.querySelector('.th-mobile-sound').appendChild(sound);
    };
    const restoreDesktop = () => {
      // Insert in reverse order so the original DOM order is preserved.
      after(original.soundParent,sound,original.soundNext);
      after(original.restoreParent,restore,original.restoreNext);
      after(original.backupParent,backup,original.backupNext);
      after(original.sortParent,sort,original.sortNext);
      after(original.cloudParent,cloudPanel,original.cloudNext);
    };
    const compactCards = () => {
      if (!isMobile) return;
      grid.querySelectorAll('.item-actions').forEach(actions=>{
        if(actions.closest('.th-card-actions'))return;
        if(!actions.closest('.item'))return;
        const menu=document.createElement('details');
        menu.className='th-card-actions';
        const summary=document.createElement('summary');
        summary.textContent='···';
        summary.setAttribute('aria-label','Photo actions');
        menu.appendChild(summary);
        actions.parentElement.insertBefore(menu,actions);
        menu.appendChild(actions); // Existing Edit/Remove click handlers stay attached.
        menu.addEventListener('toggle',()=>{
          if(menu.open) document.querySelectorAll('#grid .th-card-actions[open]').forEach(other=>{if(other!==menu)other.open=false});
        });
      });
    };
    const cardsObserver=new MutationObserver(compactCards);
    cardsObserver.observe(grid,{childList:true,subtree:true});

    // The original render() rebuilds #categories. Preserve the horizontal scroll location.
    const catObserver=new MutationObserver(()=>{
      if(isMobile){buildBrowseOptions();grid.scrollTop=0;}
    });
    catObserver.observe(sidebar,{childList:true});

    nav.addEventListener('click',event=>{
      const btn=event.target.closest('button[data-th-nav]');
      if(!btn)return;
      const view=btn.dataset.thNav;
      if(view==='more'||view==='collections'){
        setPage(view);
        (view==='more'?more:collectionPanel).scrollTop=0;
        return;
      }
      if(view==='closet'||view==='outfits'){
        const selected=sidebar.querySelector('[data-filter="'+(view==='outfits'?'Outfits':'All')+'"]');
        if(selected && selected.dataset.filter==='Outfits')selected.click();
        else if(selected)selected.click();
        setPage(view);
        grid.scrollTop=0;
      }
    });

    sidebar.addEventListener('click', event=>{
      if(!isMobile || !event.target.closest('[data-filter]'))return;
      document.body.classList.remove('th-mobile-more','th-mobile-collections');
      if(event.target.closest('[data-filter]').dataset.filter==='Outfits')markNav('outfits');
      else markNav('closet');
    },true);

    const syncLayout = () => {
      const wantsMobile=media.matches;
      if(wantsMobile===isMobile)return;
      isMobile=wantsMobile;
      if(isMobile){ moveToMobile(); compactCards(); buildBrowseOptions(); }
      else{
        restoreDesktop();
        document.body.classList.remove('th-mobile-more','th-mobile-collections','th-mobile-outfits');
        grid.querySelectorAll('details.th-card-actions').forEach(menu=>{
          const actions=menu.querySelector('.item-actions');
          if(actions)menu.replaceWith(actions);
        });
      }
    };
    if(media.addEventListener)media.addEventListener('change',syncLayout);
    else media.addListener(syncLayout);
    syncLayout();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();


/*
 * V7.1 — Visible category counters on iPhone.
 * Read-only: reuses the existing #count and #heading written by the original
 * Closet render function. Does not access wardrobe records, credentials or cloud.
 */
(() => {
  'use strict';
  const style = document.createElement('style');
  style.id = 'th-category-counter-style';
  style.textContent = `
    #thCategoryCountBadge { display:none; }
    @media (max-width:720px) {
      .app>.layout>main.panel>.mainhead #count { display:none; }
      #thCategoryCountBadge {
        display:inline-flex; align-items:center; justify-content:center;
        width:max-content; max-width:100%; margin-top:7px;
        padding:6px 12px; border-radius:999px;
        font:700 12px/1.3 'Trebuchet MS',system-ui,sans-serif;
        color:var(--accent-ink,#85546f);
        background:linear-gradient(155deg,#fff9,var(--accent-soft,#f8d6e7));
        border:1px solid #fff9; box-shadow:inset 0 1px 0 #fff9,0 3px 9px #97738b17;
      }
    }
  `;
  document.head.appendChild(style);

  function startCounter() {
    const heading = document.getElementById('heading');
    const originalCount = document.getElementById('count');
    if (!heading || !originalCount || document.getElementById('thCategoryCountBadge')) return;
    const badge = document.createElement('span');
    badge.id = 'thCategoryCountBadge';
    badge.setAttribute('role','status');
    badge.setAttribute('aria-live','polite');
    heading.insertAdjacentElement('afterend', badge);

    const update = () => {
      const match = (originalCount.textContent || '').match(/^\s*(\d+)/);
      if (!match) { badge.textContent = ''; return; }
      const n = Number(match[1]);
      const category = (heading.textContent || 'All treasures').trim();
      const title = category === 'All treasures' ? (n === 1 ? 'piece' : 'pieces')
        : category === 'Jewelry' ? (n === 1 ? 'jewelry piece' : 'jewelry pieces')
        : category === 'Makeup' ? (n === 1 ? 'makeup item' : 'makeup items')
        : category === 'Hair' ? (n === 1 ? 'hair item' : 'hair items')
        : category === 'Outfits' ? (n === 1 ? 'outfit' : 'outfits')
        : (n === 1 && category === 'Dresses') ? 'dress'
        : (n === 1 && category === 'Shirts') ? 'shirt'
        : (n === 1 && category === 'Jackets') ? 'jacket'
        : category.toLowerCase();
      badge.textContent = n + ' ' + title;
    };
    const observer = new MutationObserver(update);
    observer.observe(heading, {childList:true,characterData:true,subtree:true});
    observer.observe(originalCount, {childList:true,characterData:true,subtree:true});
    update();
  }
  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded',startCounter,{once:true});
  else startCounter();
})();
