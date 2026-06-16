/* ════════════════════════════════════════
   CURSOR
════════════════════════════════════════ */
const cur=document.getElementById('cur'), ring=document.getElementById('ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px';});
(function lerp(){rx+=(mx-rx)*.13;ry+=(my-ry)*.13;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(lerp);})();

/* ════════════════════════════════════════
   NAV SCROLL
════════════════════════════════════════ */
window.addEventListener('scroll',()=>{document.getElementById('nav').classList.toggle('scrolled',window.scrollY>60);});

/* ════════════════════════════════════════
   SCROLL REVEAL
════════════════════════════════════════ */
const ro=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in');});},{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>ro.observe(el));

/* ════════════════════════════════════════
   THEME TOGGLE
════════════════════════════════════════ */
function toggleTheme(){
  const html=document.documentElement;
  const isDark=html.dataset.theme==='dark';
  html.dataset.theme=isDark?'light':'dark';
  document.getElementById('tt-dark').classList.toggle('active',!isDark);
  document.getElementById('tt-light').classList.toggle('active',isDark);
}


/* ════════════════════════════════════════
   TOOL SELECTOR VISUAL
════════════════════════════════════════ */
const taskMeta={
  soundtrack:{
    name:'Soundtrack Drafting',
    badge:'Audio',
    image:'suno.png',
    url:'https://suno.com'
  },

  opening:{
    name:'Opening Sequence',
    badge:'Video',
    image:'veo.png',
    url:'https://deepmind.google/models/veo/'
  },

  lyric:{
    name:'Lyric Video',
    badge:'Visual + Motion',
    image:'firefly.png',
    url:'https://firefly.adobe.com'
  },

  promo:{
    name:'Promotional Visuals',
    badge:'Design',
    image:'banana.png',
    url:'https://runwayml.com'
  },

  lipsync:{
    name:'Lipsync / Motion',
    badge:'Performance',
    image:'kling.png',
    url:'https://klingai.com'
  },
};
function onTaskChange(){
  const v = document.getElementById('taskSelect').value;
  const img = document.getElementById('selImg');
  const badge = document.getElementById('selBadge');
  const taskName = document.getElementById('selTaskName');
  const lbl = document.getElementById('selLabel');

  if (v && taskMeta[v]) {
    const t = taskMeta[v];

    img.classList.add('active');
    img.style.backgroundImage = `linear-gradient(rgba(0,0,0,.35), rgba(0,0,0,.55)), url('${t.image}')`;
    img.style.backgroundSize = 'cover';
    img.style.backgroundPosition = 'center';
    img.style.cursor='pointer';

img.onclick=function(){
  window.open(t.url,'_blank');
};

    badge.textContent = t.badge;
    taskName.textContent = t.name;
    lbl.textContent = t.hint;
  } else {
    img.classList.remove('active');
    img.style.backgroundImage = '';

    badge.textContent = '—';
    taskName.textContent = '';
    lbl.textContent = 'Task visual will appear here';
    img.onclick=null;
img.style.cursor='default';
  }
}
const recs={
  soundtrack:{title:'Soundtrack Drafting',tools:'Suno',use:'Melody generation, mood testing, emotional tone exploration, and temporary draft soundtracks.',warn:'Human review required for musical quality, licensing, and final creative approval.'},
  opening:{title:'Opening Sequence',tools:'Nano Banana Pro · Veo 3',use:'Use Nano Banana Pro for starting-frame creation; Veo 3 for short video generation and sequence assembly.',warn:'Human editing essential — video consistency and motion control can be unstable.'},
  lyric:{title:'Lyric Video',tools:'Firefly · Nano Banana Pro · Veo 3 · Higgsfield · Runway · Kling',use:'Visual concepts, animated backgrounds, lyric scenes, rhythm-based imagery, and artist visuals.',warn:'Human supervision required for visual identity, typography, rhythm, and cultural relevance.'},
  promo:{title:'Promotional Visuals',tools:'Adobe Firefly · Nano Banana Pro · Runway · Higgsfield',use:'Posters, teasers, social media assets, concept frames, and short promotional clips.',warn:'Verify copyright, brand identity, and platform rules before publishing.'},
  lipsync:{title:'Lipsync / Motion Control',tools:'Kling',use:'Kling Lipsync for mouth sync; Kling Motion Control for digital performance visuals.',warn:'Careful human review needed — small lipsync and motion errors are highly visible.'}
};
function recommendTools(){
  const v=document.getElementById('taskSelect').value;
  const panel=document.getElementById('result');
  const inner=document.getElementById('result-inner');
  if(!v){inner.innerHTML='<p style="color:#d4704a;font-size:12px;">Please select a task first.</p>';panel.classList.add('open');return;}
  const r=recs[v];
  inner.innerHTML=`<h3>${r.title}</h3><div class="sel-tools">${r.tools}</div><p>${r.use}</p><div class="sel-warn">⚠ ${r.warn}</div>`;
  panel.classList.add('open');
}

 function toggleAudioList(event, head) {
  event.preventDefault();
  event.stopPropagation();

  const accordion = head.closest('.audio-accordion');
  const body = accordion.querySelector('.audio-accordion-body');

  const isOpen = accordion.classList.contains('open');

  if (isOpen) {
    body.style.maxHeight = body.scrollHeight + 'px';

    requestAnimationFrame(() => {
      body.style.maxHeight = '0px';
    });

    accordion.classList.remove('open');
  } else {
    accordion.classList.add('open');
    body.style.maxHeight = body.scrollHeight + 'px';
  }
}

/* ════════════════════════════════════════
   TOOL DRAWERS
════════════════════════════════════════ */
const toolInfo={
  suno:{
  name:'Suno',
  tag:'AI Music Generation · Soundtrack Drafting',
  desc:'Suno was used in the Uljan case to generate soundtrack drafts, test emotional tone, and create several musical directions before human selection and refinement. The tracks below demonstrate how AI-assisted music outputs can support mood testing in audiovisual production.',
  prompt:`Mood: intimate, melancholic, dramatic
Style: cinematic soundtrack for Kazakh web series
Instruments: soft piano, strings, subtle ambient texture
Tempo: slow to medium
Vocals: optional / minimal
Purpose: emotional soundtrack draft for scene atmosphere`,
  audio:[
    {
      title:'jan (Original TV Series Soundtrack)',
      file:'jan.mp3',
      note:'Main Theme Music for the Ulzhan web series.'
    },
    {
      title:'taweldi is (Original TV Series Soundtrack)',
      file:'taweldi.mp3',
      note:'Episode Music for the Ulzhan web series.'
    },
    {
      title:'qashpa (Original TV Series Soundtrack)',
      file:'qashpa.mp3',
      note:'Final Theme Music for the Ulzhan web series.'
    }
  ],
  img1:'suno.png'
},
  nano:{
    name:'Nano Banana Pro',
    tag:'AI Image Generation · Starting Frames',
    desc:'Nano Banana Pro was used to generate cinematic starting frames — single high-quality images that define the visual language for each scene. For Offside, these frames established lighting, palette, and composition before Veo 3 animated them into sequences.',
    prompt:`Cinematic still frame, film photography aesthetic
Scene: two players on a Soviet-era football pitch at dusk
Lighting: golden hour, long shadows, overcast edge
Color grade: desaturated blues and warm ambers
Aspect ratio: 2.39:1 anamorphic
Style: Eastern European arthouse, 35mm grain`,
    img1:'banana.png',
  },
  veo3:{
    name:'Veo 3',
    tag:'AI Video Generation · Motion',
    desc:'Google Veo 3 was used to animate starting frames into short video sequences. For Offside it produced the opening 8-second title sequence; for ZAQ BETTER LP it generated rhythm-synced visual loops. Human editors corrected motion artefacts and blended cuts.',
    prompt:`Animate from starting frame:
Slow camera pull-back from extreme close-up
Subject: football boot laces, morning dew
Motion: gentle rack focus, fog moving left
Duration: 6 seconds
FPS: 24
Style: arthouse, minimal movement, handheld feel
No cuts, no music sync required`,
    img1:'veo.png'
  },
  firefly:{
    name:'Adobe Firefly',
    tag:'AI Image Generation · Visual Design',
    desc:'Adobe Firefly was the primary visual generation tool for ZAQ BETTER LP lyric video. Its commercial-safe training data made it ideal for assets that needed to be published. Used for poster frames, abstract backgrounds, and typographic environment concepts.',
    prompt:`Concept: ZAQ — BETTER LP album visual
Concept: surreal floating steppe settlement

Style: Central Asian surrealism meets cinematic lo-fi aesthetics

Environment: isolated rural road, old wooden houses, small roadside gas station, open Kazakh steppe, endless horizon

Composition: fragmented floating landmass suspended above reflective clouds, dreamlike perspective, quiet and empty atmosphere

Colors: warm sunset amber, deep twilight blue, muted green, soft earth tones

Lighting: golden hour with long shadows and subtle atmospheric haze

Texture: aged film stock, gentle film burn, analog photography feel, slight grain

Mood: nostalgic, contemplative, liminal, poetic realism

Typography space: large clean negative space in the upper third for lyric overlay

Output: landscape 16:9, high resolution, cinematic composition`,
    img1:'ffly.png',
    img2:'auldan.png',
  },
  higgsfield:{
    name:'Higgsfield',
    tag:'AI Video · Character Motion',
    desc:'Higgsfield was used for character-driven motion sequences in ZAQ BETTER LP — specifically for animating still portrait frames into moving, breathing subjects. Its strength is realistic micro-movement: head sway, blink, ambient body motion.',
    prompt:`Source: portrait photo of ZAQ (provided)
Motion type: ambient breathing loop
Head movement: slight sway, 5–8° range
Eyes: natural blink cycle every 3–4 seconds
Duration: 8 second seamless loop
Speed: slow, contemplative
No background motion
Export: ProRes 4444 with alpha`,
    img1:null,
  },
  runway:{
    name:'Runway',
    tag:'AI Video · Gen-2 / Gen-3',
    desc:'Runway Gen-3 was used for abstract visual sequences that needed more stylistic freedom than Veo. For ZAQ BETTER LP it generated texture transitions and dream-sequence imagery that were composited over performance footage in DaVinci Resolve.',
    prompt:`Text-to-video: abstract transition
Concept: cassette tape unspooling into a starlit steppe
Colors: deep black, silver magnetic tape, scattered amber light
Motion: tape spirals outward into negative space
Duration: 4 seconds
Camera: static, macro lens simulation
Blend mode: overlay with live footage (editor note)`,
    img1:null,
  },
  kling:{
    name:'Kling',
    tag:'AI Video · Lipsync & Motion Control',
    desc:'Kling was used for two distinct tasks: Lipsync mode to synchronize ZAQ\'s mouth movements to the final mixed audio track, and Motion Control to generate camera movement paths for performance scenes. Both required careful human review to catch artefacts.',
    prompt:`Lipsync task:
Source video: ZAQ performance, static camera, 30 seconds
Audio: final mixed track "BETTER" (provided)
Sync accuracy: high, prioritize consonants
Smoothing: medium — retain natural imperfection
Face region: full face tracking
Output: match source resolution and FPS

Motion Control task:
Shot type: slow dolly-in to performer
Start: wide, 2 meters
End: medium close-up
Duration: 8 seconds, eased`,
    img1:'kling.png',
  },
};

let activeDrawerPills={}; // drawerId → toolKey

function openDrawer(toolKey, drawerId){
  const drawer=document.getElementById(drawerId);
  const inner=document.getElementById(drawerId+'-inner');
  const t=toolInfo[toolKey];
  if(!t) return;

  // If same tool already open in this drawer, close it
  if(drawer.classList.contains('open') && activeDrawerPills[drawerId]===toolKey){
    closeDrawer(drawerId, toolKey);
    return;
  }

  // Update active pill styling
  resetPills(drawerId);
  // Find and mark active pill
  drawer.previousElementSibling.querySelectorAll('.tool-pill').forEach(p=>{
    if(p.textContent.trim()===t.name) p.classList.add('active');
  });
  activeDrawerPills[drawerId]=toolKey;

  const audioBlock = t.audio ? `
  <div class="audio-accordion">
    <div class="audio-accordion-head" onclick="toggleAudioList(event, this)">
      <span>ULJAN OST</span>
      <span class="audio-accordion-count">${t.audio.length} tracks</span>
      <span class="audio-accordion-arrow">↓</span>
    </div>

    <div class="audio-accordion-body">
      <div class="audio-samples">
        ${t.audio.map((track, index) => `
          <div class="audio-row">
            <div class="audio-num">${String(index + 1).padStart(2, '0')}</div>
            <div class="audio-content">
              <div class="audio-title">${track.title}</div>
              <div class="audio-note">${track.note}</div>
              <audio controls preload="metadata">
                <source src="${track.file}" type="audio/mpeg">
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        `).join('')}

        <div class="audio-disclaimer">
          Audio excerpts are included for academic demonstration purposes within the case study.
        </div>
      </div>
    </div>
  </div>
` : '';

inner.innerHTML=`
  <div>
    <div class="drawer-tool-name">${t.name}</div>
    <div class="drawer-tag">${t.tag}</div>
    <p class="drawer-desc">${t.desc}</p>

    ${audioBlock}

    <div class="drawer-prompt-label">Demonstration Prompt</div>
    <div class="drawer-prompt">${t.prompt}</div>
  </div>

  <div class="drawer-visuals">

${t.img1 ? `
<div class="drawer-img">
<img src="${t.img1}" alt="">
</div>
` : ''}

${t.img2 || t.img3 ? `
<div class="drawer-img-small">

${t.img2 ? `
<div class="drawer-img">
<img src="${t.img2}" alt="">
</div>
` : ''}

${t.img3 ? `
<div class="drawer-img">
<img src="${t.img3}" alt="">
</div>
` : ''}

</div>
` : ''}

</div>
`;

  drawer.classList.add('open');

  // Smooth scroll to drawer
  setTimeout(()=>{drawer.scrollIntoView({behavior:'smooth',block:'nearest'});},80);
}

function closeDrawer(drawerId, toolKey){
  const drawer=document.getElementById(drawerId);
  drawer.classList.remove('open');
  resetPills(drawerId);
  delete activeDrawerPills[drawerId];
}

function resetPills(drawerId){
  const drawer=document.getElementById(drawerId);
  // find the case-panel before this drawer
  const panel=drawer.previousElementSibling;
  if(panel) panel.querySelectorAll('.tool-pill').forEach(p=>p.classList.remove('active'));
}

/* ════════════════════════════════════════
   CHECKLIST + SMOOTH GAUGE
════════════════════════════════════════ */
let currentPct=0, targetPct=0, rafId=null;

function toggle(el){
  el.classList.toggle('on');
  const total=6, done=document.querySelectorAll('.check-row.on').length;
  targetPct=Math.round(done/total*100);
  if(!rafId) animateGauge();
}

function animateGauge(){
  if(Math.abs(currentPct-targetPct)<0.5){
    currentPct=targetPct;
    renderGauge(currentPct);
    rafId=null; return;
  }
  currentPct+=(targetPct-currentPct)*0.08;
  renderGauge(currentPct);
  rafId=requestAnimationFrame(animateGauge);
}

function renderGauge(pct){
  const rounded=Math.round(pct);
  const deg=pct/100*360;
  const col = pct>=99?'#c8a45a': pct>=66?'#c8a45a': pct>=33?'#d4904a':'#b03c14';
  const trackCol = getComputedStyle(document.documentElement).getPropertyValue('--border2').trim() || 'rgba(255,255,255,0.07)';
  document.getElementById('gaugeRing').style.background=`conic-gradient(${col} ${deg}deg, var(--border2) ${deg}deg)`;

  const pctEl=document.getElementById('gaugePct');
  pctEl.classList.remove('rolling');
  void pctEl.offsetWidth; // reflow to restart animation
  pctEl.textContent=rounded+'%';
  pctEl.classList.add('rolling');

  const t=document.getElementById('gaugeTitle'), m=document.getElementById('gaugeMsg');
  if(rounded>=100){t.textContent='Production Ready';m.textContent='All risk points reviewed. Material may proceed to final human approval.';}
  else if(rounded>=66){t.textContent='Almost Ready';m.textContent='Most checks complete. Address remaining items before publishing.';}
  else if(rounded>0){t.textContent='In Progress';m.textContent='Continue working through the checklist. Several items remain.';}
  else{t.textContent='Not Ready';m.textContent='Complete the checklist to assess production readiness.';}
}

window.toggleAudioList = toggleAudioList;
window.openDrawer = openDrawer;
window.closeDrawer = closeDrawer;
window.toggleTheme = toggleTheme;
window.onTaskChange = onTaskChange;
window.recommendTools = recommendTools;
window.toggle = toggle;

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("video").forEach(video => {
    video.muted = true;
    video.play().catch(() => {});
  });
});

