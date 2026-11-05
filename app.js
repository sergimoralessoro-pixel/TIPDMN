import { subjects,lessons } from './content.js';
import {drawVaried,uniqueBank,varyQuestion,shuffled} from './quiz-variety.js';
import {expandedLessons} from './extra-content.js';
import {englishBook} from './english-book.js';
import {patientPart1} from './patient-part1.js';
import {patientPart2} from './patient-part2.js';
import {patientPart3} from './patient-part3.js';
import {patientPart4} from './patient-part4.js';
import {patientPart5} from './patient-part5.js';
import {forensicBook} from './forensic-book.js';
import {ipe1Book} from './ipe1-book.js';
import {classStudyBooks} from './class-books.js?v=4';
import {radiationTopics} from './radiation-topics.js';
import {additionalDriveBooks} from './additional-drive-books.js?v=2';
import {renderStudyBook} from './book-reader.js?v=6';
import {anatomyBookA} from './anatomy-book-a.js';
import {anatomyBookB} from './anatomy-book-b.js';
import {anatomyBookC} from './anatomy-book-c.js';
const anatomyBook=[...anatomyBookA,...anatomyBookB,...anatomyBookC];

import {protectionBookA} from './protection-book-a.js';
import {protectionBookB} from './protection-book-b.js';
const patientBook=[...patientPart1,...patientPart2,...patientPart3,...patientPart4,...patientPart5];
import { SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY } from './config.js';
const configured=Boolean(SUPABASE_URL&&SUPABASE_PUBLISHABLE_KEY);
let supa=null;let connectionError='';
const $=s=>document.querySelector(s),safe=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const state={page:'home',authMode:'choose',mobileMenu:false,sub:null,lesson:null,answers:{},test:[],result:null,user:null,profile:null,records:[],mistakes:{},posts:[],room:'general',mode:'normal',flash:0,flipped:false,bookPage:0,notice:'',loading:false,examTimer:false,startedAt:0,challenge:null,challenges:[],leaderboard:[],customLessons:[],admin:false,theme:localStorage.getItem('radiolab.theme')||'dark',dailyDate:null};
const getStore=(key,def)=>{try{return JSON.parse(localStorage.getItem(key))??def}catch{return def}};
if(!supa){state.records=getStore('radiolab.records',[]);state.mistakes=getStore('radiolab.mistakes',{});}
const ranks=['Estudiante','Auxiliar de imagen','Técnico en prácticas','Técnico de Rayos','Especialista en TC y RM','Técnico Superior de Imagen'];
const xpPenalty=(wrong)=>Array.from({length:Math.max(0,wrong)},(_,i)=>Math.min(6,2+i)).reduce((a,b)=>a+b,0);
const xpChange=(correct,total)=>Math.max(0,Number(correct)||0)*3-xpPenalty(Math.max(0,(Number(total)||0)-(Number(correct)||0)));
function rank(points){return ranks[Math.min(5,Math.floor(points/250))]};function xp(){return Math.max(0,state.records.reduce((n,r)=>n+xpChange(r.correct,r.total),0))};
const average=()=>state.records.length?(state.records.reduce((n,r)=>n+r.score,0)/state.records.length).toFixed(1):'—';
const totalErr=()=>Object.keys(state.mistakes).length;const allLessons=()=>[...anatomyBook,...radiationTopics,...classStudyBooks.filter(l=>l.subject!=='proteccion'),...additionalDriveBooks,...state.customLessons.filter(l=>!['anatomia','ingles','atencion','forense','ipe1','proteccion',...additionalDriveBooks.map(b=>b.subject)].includes(l.subject))];const getLesson=id=>allLessons().find(l=>l.id===id);const getSubject=id=>subjects.find(s=>s[0]===id);
function go(page,args={}){if(state.page==='forum'&&page!=='forum')stopForum();Object.assign(state,args,{page,notice:'',mobileMenu:false});history.pushState({page,sub:state.sub,lesson:state.lesson},'',`#${page}${state.sub?'/'+state.sub:''}${state.lesson?'/'+state.lesson:''}`);render();if(page==='forum')enterForum();window.scrollTo(0,0)}
window.addEventListener('popstate',ev=>{const x=ev.state||{page:'home',sub:null,lesson:null};if(state.page==='forum'&&x.page!=='forum')stopForum();Object.assign(state,{page:x.page,sub:x.sub,lesson:x.lesson});render();if(state.page==='forum')enterForum()});
function notify(msg){state.notice=msg;render()}
async function loadMe(){if(!supa)return;const {data}=await supa.auth.getUser();state.user=data.user||null;state.profile=null;state.records=[];state.mistakes={};state.customLessons=[];state.admin=false;if(state.user){const [p,r,m]=await Promise.all([supa.from('profiles').select('*').eq('id',state.user.id).maybeSingle(),supa.from('attempts').select('*').eq('user_id',state.user.id).order('created_at',{ascending:false}).limit(500),supa.from('mistakes').select('*').eq('user_id',state.user.id)]);state.profile=p.data;const ar=await supa.from('admin_users').select('user_id').eq('user_id',state.user.id).maybeSingle();state.admin=!!ar.data;state.records=(r.data||[]).map(z=>({id:z.id,lesson:z.lesson_id,correct:z.correct,total:z.total,score:z.score,date:z.created_at}));(m.data||[]).forEach(z=>{state.mistakes[z.question_id]={lesson:z.lesson_id,question:z.question_index}});const c=await supa.from('study_lessons').select('*').eq('published',true);state.customLessons=(c.data||[]).map(z=>({id:z.slug,subject:z.subject_id,title:z.title,intro:z.intro,points:z.points||[],summary:z.summary,questions:z.questions||[],verified:true}));}render();if(state.page==='forum'){if(state.user)enterForum();else stopForum()}}
function mast(){return `<header class="top"><div class="logo" data-go="home"><span class="brandicon">🩻</span><span>RADIO<span class="highlight">LAB</span></span></div><div class="flex"><span class="pill">⚡ ${xp()} XP</span><button class="btn small ghost themeToggle" data-action="theme" aria-label="Cambiar tema">${state.theme==='dark'?'☀️':'🌙'}</button>${state.user?`<button class="btn small" data-go="profile">${safe(state.profile?.avatar||'👤')} ${safe(state.profile?.username||'Mi perfil')}</button>`:`<button class="btn small" data-go="auth">${supa?'Acceder':'Modo demo'}</button>`}</div></header>`}
const nav=[['home','⌂ Inicio'],['subjects','▦ Asignaturas'],['exams','📝 Exámenes'],['mistakes','↺ Mis fallos'],['progress','▤ Progreso'],['forum','☏ Foro'],['profile','◉ Perfil'],['daily','⚡ Reto diario'],['arena','🏆 Arena'],['leaderboard','🥇 Ranking'],['admin','🛠 Admin']];
function side(){return `<aside class="sidebar">${nav.filter(x=>x[0]!=='admin'||state.admin).map(([p,t])=>`<button class="nav ${state.page===p?'active':''}" data-go="${p}">${t}</button>`).join('')}<div class="panel" style="margin-top:25px;padding:15px"><div class="meta">RANGO ACTUAL</div><h3 style="color:#50e3ea;margin:8px 0">${rank(xp())}</h3><div class="meter"><div style="width:${xp()%250/250*100}%"></div></div><p class="meta">${xp()%250}/250 XP para el siguiente nivel</p></div></aside>`}
function foot(){return `<div class="foot">Radiolab · Plataforma independiente de estudio, sin afiliación oficial a ILERNA. Contenido inicial de muestra para revisión. No sustituye la formación oficial.</div>`}
function wrap(body){$('#app').innerHTML=`<div class="shell">${mast()}<div class="layout">${side()}<main>${!supa?`<div class="toast">🧪 <strong>Modo local</strong> · ${safe(connectionError||'La conexión online no está disponible.')} Los tests y resúmenes siguen accesibles.</div>`:''}${state.notice?`<div class="toast ${state.notice.includes('Error')?'error':''}">${safe(state.notice)}</div>`:''}${body}${foot()}</main></div></div><div class="navmobile">${nav.filter(x=>['home','subjects','exams','forum'].includes(x[0])).map(([p,t])=>`<button data-go="${p}">${t.split(' ')[0]}<br>${t.split(' ').slice(1).join(' ')}</button>`).join('')}<button data-mobile-more="true" aria-expanded="${state.mobileMenu}" aria-label="Abrir más secciones">☰<br>Más</button></div>${state.mobileMenu?`<div class="mobile-more-overlay" data-mobile-close="true"></div><nav class="mobile-more-panel" aria-label="Más secciones"><div class="mobile-more-title"><strong>Más opciones</strong><button data-mobile-close="true" aria-label="Cerrar">✕</button></div>${nav.filter(x=>!['home','subjects','exams','forum'].includes(x[0])&&(x[0]!=='admin'||state.admin)).map(([p,t])=>`<button data-go="${p}">${t}</button>`).join('')}</nav>`:''}`;bind()}
function home(){return `<div class="hero"><span class="tag">✚ TU CAMPUS DIGITAL</span><h1>Tu futuro en imagen<br><span class="highlight">empieza aquí.</span></h1><p>Estudia por asignaturas, mejora con cada respuesta y domina tus errores. Una academia hecha para estudiantes de Imagen para el Diagnóstico.</p><div class="actions"><button class="btn primary" data-go="subjects">Explorar asignaturas →</button><button class="btn ghost" data-go="mistakes">Repasar mis fallos ↺</button></div></div><section class="section stats"><div class="stat"><span class="muted">Asignaturas</span><b>${subjects.length}</b><small>Disponibles</small></div><div class="stat"><span class="muted">Tests hechos</span><b>${state.records.length}</b><small>Acumulados</small></div><div class="stat"><span class="muted">Nota media</span><b>${average()}</b><small>Sobre 10</small></div><div class="stat"><span class="muted">Por repasar</span><b>${totalErr()}</b><small>Preguntas falladas</small></div></section><section class="section"><div class="flex" style="justify-content:space-between"><h2>Continúa estudiando</h2><button class="btn small" data-go="subjects">Ver todas →</button></div><div class="grid">${subjects.slice(0,6).map(tile).join('')}</div></section><section class="section"><div class="grid"><button class="tile" data-go="daily"><div class="emoji">⚡</div><h3>Reto diario</h3><p>5 preguntas y racha de estudio</p></button><button class="tile" data-go="arena"><div class="emoji">🎮</div><h3>Arena</h3><p>Desafíos privados por código</p></button><button class="tile" data-go="leaderboard"><div class="emoji">🏆</div><h3>Clasificación</h3><p>Compara tus puntos con los compañeros</p></button></div></section><section class="section panel"><h2>🎯 Entrenamiento del día</h2><p class="muted">Un test mixto con preguntas de los temas iniciales. Los aciertos suman XP y los fallos pueden restarla.</p><button class="btn primary" data-action="mixed">Iniciar simulacro</button></section>`}
function tile(s){let n=allLessons().filter(l=>l.subject===s[0]).length;return `<button class="tile" data-sub="${s[0]}"><div class="emoji">${s[2]}</div><h3>${safe(s[1])}</h3><p>${n?`${n} ${n===1?'tema':'temas'} con contenido inicial`:'Pendiente de incorporar temario'}</p></button>`}
function allSubjects(){return `<div class="breadcrumbs"><button class="btn small ghost" data-go="home">← Inicio</button></div><h1>Asignaturas</h1><p class="muted">Selecciona cualquier módulo. Todos están visibles, aunque algunos están pendientes de importar y revisar.</p><div class="grid section">${subjects.map(tile).join('')}</div>`}
function subjectPage(){const s=getSubject(state.sub);if(!s)return allSubjects();const ls=allLessons().filter(l=>l.subject===s[0]);return `<div class="breadcrumbs"><button class="btn small ghost" data-go="subjects">← Asignaturas</button></div><div class="hero"><span class="tag">${s[2]} MÓDULO</span><h1>${safe(s[1])}</h1><p>${safe(s[3])} · Elige el tema que quieres estudiar y practica con preguntas.</p></div><section class="section"><h2>Temas de estudio (en orden)</h2>${s[0]==='anatomia'?`<p class="muted" style="line-height:1.6">Se han ordenado los temas numerados de los documentos accesibles. El Tema 3 no aparece identificado en los archivos consultados y no se ha inventado. El Tema 6 es material complementario del Drive, pendiente de confirmar con las diapositivas de clase.</p>`:''}<div class="list">${ls.length?ls.map(l=>`<div class="rowitem"><input type="checkbox" class="topicSelect" data-topic="${l.id}" aria-label="Seleccionar tema ${safe(l.title)}"><div class="inlineicon">📖</div><div class="grow"><h3>${safe(l.title)}</h3><p>${l.sections?`${l.sections.length} apartados · Libro de estudio · `:'Repaso breve · '}${l.questions.length>=10?`${l.questions.length} preguntas tipo test`: 'Examen de 10 preguntas en preparación'}</p></div><button class="btn primary small" data-lesson="${l.id}">Abrir →</button></div>`).join(''):`<div class="empty">📚 El módulo ya está preparado, pero aún no hay apuntes cargados y verificados. No se han inventado temas para rellenarlo.</div>`}</div></section>${ls.length?`<section class="section panel"><h3>📝 Test de toda la asignatura</h3><p class="muted">Combina las preguntas de los temas disponibles.</p><button class="btn" data-action="subjectTest">Todos los temas</button> <button class="btn primary" data-action="selectedTest">Test de temas seleccionados</button></section>`:''}`}
function diagramFor(id){const head=`<div class="diagram"><div class="meta">ESQUEMA VISUAL · ILUSTRACIÓN ORIGINAL</div>`;const foot=`</div>`;
if(id==='an-snc')return head+`<div class="schematic"><div>🖐️<strong>Estímulo</strong><small>Calor o tacto</small></div><b>→</b><div>⚡<strong>SNP</strong><small>Lleva el aviso</small></div><b>→</b><div>🧠<strong>SNC</strong><small>Integra y responde</small></div><b>→</b><div>💪<strong>SNP</strong><small>Lleva la orden</small></div></div>`+foot;
if(id==='an-cardiaco')return head+`<div class="schematic"><div class="blue">🔵<strong>Ventrículo derecho</strong><small>Envía a pulmones</small></div><b>→</b><div>🫁<strong>Pulmones</strong><small>Recoge O₂</small></div><b>→</b><div class="red">🔴<strong>Aurícula izquierda</strong><small>Recibe sangre</small></div></div><div class="schematic"><div class="red">🔴<strong>Ventrículo izquierdo</strong><small>Envía al cuerpo</small></div><b>→</b><div>🧍<strong>Organismo</strong><small>Utiliza O₂</small></div><b>→</b><div class="blue">🔵<strong>Aurícula derecha</strong><small>Recibe sangre</small></div></div>`+foot;
if(id==='an-planos')return head+`<div class="schematic"><div><strong>↔️ Sagital</strong><small>Derecha / Izquierda</small></div><div><strong>🔀 Frontal</strong><small>Anterior / Posterior</small></div><div><strong>↕️ Transversal</strong><small>Superior / Inferior</small></div></div>`+foot;
if(id==='fun-rayos')return head+`<div class="schematic"><div><strong>Cátodo</strong><small>Emite electrones</small></div><b>→</b><div><strong>Electrones</strong><small>Se aceleran</small></div><b>→</b><div><strong>Ánodo</strong><small>Rayos X + calor</small></div></div>`+foot;
if(id==='tc-eco-bases')return head+`<div class="schematic"><div><strong>🩻 TC</strong><small>Radiación ionizante</small></div><div><strong>🔊 Ecografía</strong><small>Ultrasonidos</small></div></div>`+foot;
return '';}

function protectionVisual(l){
if(!l.id.startsWith('pr-slides-'))return '';
const groups=/etapas|acción|efectos|lesión/i.test(l.title)?[['⚛️','Física'],['🧪','Química'],['🧬','Biológica']]:/residuos|transporte|emergencias/i.test(l.title)?[['📦','Identificar'],['🛡️','Proteger'],['📋','Documentar']]:[['⏱️','Tiempo'],['📏','Distancia'],['🛡️','Blindaje']];
return '<div class="patient-visual"><div class="meta">☢️ ESQUEMA VISUAL · PROTECCIÓN RADIOLÓGICA</div><div class="patient-flow">'+groups.map((v,i)=>(i?'<span class="patient-arrow">→</span>':'')+'<div class="patient-step"><span class="patient-emoji">'+v[0]+'</span><b>'+v[1]+'</b></div>').join('')+'</div></div>';
}
function forensicVisual(l){
 if(!l.id.startsWith('forense-vt-'))return '';
 const hasDNA=/ADN|PCR|parentesco/i.test(l.title), toxic=/Tóxic|muestra|análisis/i.test(l.title);
 const steps=hasDNA?[['🧬','Muestra genética'],['🔁','Amplificación'],['🔬','Comparación']]:toxic?[['🧪','Recogida'],['⚗️','Análisis'],['📄','Interpretación']]:[['🔎','Evidencia'],['🔬','Investigación'],['⚖️','Conclusión']];
 return '<div class="patient-visual"><div class="meta">🔬 ESQUEMA DIDÁCTICO · CIENCIAS FORENSES</div><div class="patient-flow">'+steps.map((x,i)=>(i?'<span class="patient-arrow">→</span>':'')+'<div class="patient-step"><span class="patient-emoji">'+x[0]+'</span><b>'+safe(x[1])+'</b></div>').join('')+'</div></div>';
}
function patientVisual(l){
 if(!l.id.startsWith('patient-'))return '';
 const parts=l.id.split('-');const t=parts[1];
 const visuals={
 '1':[['🏥','Sistema sanitario'],['📋','Organización'],['🩻','Atención de calidad']],
 '2':[['📆','Citación'],['🪪','Identificación'],['🩺','Exploración']],
 '3':[['🗣️','Emisor'],['💬','Mensaje y canal'],['👂','Receptor']],
 '4':[['👀','Observación'],['🩺','Constantes'],['📝','Comunicación']],
 '5':[['🫶','Necesidades'],['🧼','Higiene'],['🧍','Movilización']]};
 const steps=visuals[t]||visuals['1'];
 return '<div class="patient-visual"><div class="meta">🩻 ESQUEMA VISUAL · '+safe(l.title.split(' · ')[0])+'</div><div class="patient-flow">'+steps.map((x,i)=>(i?'<span class="patient-arrow">→</span>':'')+'<div class="patient-step"><span class="patient-emoji">'+x[0]+'</span><b>'+safe(x[1])+'</b></div>').join('')+'</div><div class="patient-pulse" aria-hidden="true"><svg viewBox="0 0 550 50" width="100%" height="50"><path d="M0 25 L165 25 L185 25 L198 7 L210 44 L226 14 L240 25 L550 25" fill="none" stroke="#6addec" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></div></div>'
}
function englishVisual(l){
 if(!l.id.startsWith('eng-vt'))return '';
 let shape=l.title.includes('Pronombres')?'pron':l.title.includes('Future')||l.title.includes('going to')?'future':l.title.includes('Past')||l.title.includes('When')?'past':l.title.includes('Perfect')?'perfect':l.title.includes('Present')?'present':l.title.includes('Modal')?'modal':'compare';
 let nodes=shape==='pron'?[['I','Sujeto'],['ME','Objeto'],['MY','Antes del nombre'],['MINE','Sin nombre']]:shape==='past'?[['ANTES','Pasado anterior'],['PASADO','Acción pasada'],['AHORA','Presente']]:shape==='future'?[['AHORA','Decisión / plan'],['MAÑANA','Acción futura'],['DESPUÉS','Resultado']]:shape==='perfect'?[['ANTES','Acción anterior'],['HASTA','Duración / resultado'],['AHORA','Conexión']]:shape==='modal'?[['CAN','Puedo'],['MUST','Debo'],['SHOULD','Debería']]:shape==='compare'?[['LESS','Menos'],['AS…AS','Igual'],['MORE','Más']]:[['HÁBITO','Siempre'],['AHORA','En este momento'],['RESULTADO','Ya realizado']];
 return '<div class="english-graphic"><div class="meta">ILUSTRACIÓN DIDÁCTICA · ESQUEMA ANIMADO</div><svg viewBox="0 0 660 145" role="img" aria-label="Línea temporal o esquema de gramática inglesa" style="width:100%;height:auto"><line x1="60" y1="73" x2="600" y2="73" stroke="#4b8398" stroke-width="5" stroke-linecap="round"/>'+nodes.map((n,i)=>{const x=nodes.length===4?85+i*160:90+i*235;return '<circle cx="'+x+'" cy="73" r="15" fill="#0b3041" stroke="#55dce8" stroke-width="4"/><circle class="eng-dot" cx="'+x+'" cy="73" r="6" fill="#a2f6a0" style="animation-delay:'+(i*.48)+'s"/><text x="'+x+'" y="38" fill="#dff9fc" text-anchor="middle" font-weight="800" font-size="15">'+safe(n[0])+'</text><text x="'+x+'" y="110" fill="#a3c6d5" text-anchor="middle" font-size="12">'+safe(n[1])+'</text>'}).join('')+'</svg></div>'
}
function anatomyVisual(l){
 if(!l.id.startsWith('anatomia-tema-'))return '';
 const n=Number(l.id.split('-').at(-1));
 let body='';
 if(n===1){body='<rect x="93" y="40" width="75" height="184" rx="34" fill="#2b647d" opacity=".35"/><circle cx="130" cy="25" r="23" fill="#4ea2b4"/><rect x="63" y="56" width="134" height="16" rx="8" fill="#438b9f"/><line x1="130" y1="0" x2="130" y2="230" stroke="#86e6ff" stroke-width="3" stroke-dasharray="7 7"/><path d="M60 88H202V134H60z" fill="#4ce3e6" opacity=".35" stroke="#7efbff" stroke-width="2"/><path d="M97 50L177 90L177 195L97 156Z" fill="#e59a5b" opacity=".35" stroke="#ffb868" stroke-width="2"/><text x="292" y="48" fill="#9eeeff">SAGITAL: derecha / izquierda</text><text x="292" y="90" fill="#ffa96d">CORONAL: anterior / posterior</text><text x="292" y="132" fill="#87efdd">AXIAL: superior / inferior</text><line x1="223" y1="45" x2="282" y2="45" stroke="#8de5fa"/><line x1="223" y1="87" x2="282" y2="87" stroke="#ffa96d"/><line x1="223" y1="129" x2="282" y2="129" stroke="#87efdd"/>';}
 else if(n===2){body='<rect x="26" y="42" width="135" height="125" rx="15" fill="#1a5263" stroke="#6ac5dd"/><rect x="195" y="42" width="135" height="125" rx="15" fill="#1a5263" stroke="#6ac5dd"/><rect x="364" y="42" width="135" height="125" rx="15" fill="#1a5263" stroke="#6ac5dd"/><path d="M56 126L72 78L94 92L116 66L137 125" fill="none" stroke="#7ce5fd" stroke-width="8"/><circle cx="258" cy="98" r="36" fill="none" stroke="#87d4fd" stroke-width="6"/><circle cx="258" cy="98" r="20" fill="none" stroke="#87d4fd" stroke-width="5"/><path d="M405 85Q430 62 455 85Q478 115 455 137Q426 150 405 124Z" fill="#e98f94" opacity=".7"/><text x="93" y="192" text-anchor="middle" fill="#c7f5ff">Radiografía</text><text x="261" y="192" text-anchor="middle" fill="#c7f5ff">TC: cortes</text><text x="430" y="192" text-anchor="middle" fill="#c7f5ff">RM: tejidos</text>';}
 else if(n===4){body='<circle cx="105" cy="45" r="25" fill="none" stroke="#bce7dd" stroke-width="9"/><line x1="105" y1="72" x2="105" y2="135" stroke="#bce7dd" stroke-width="11"/><line x1="105" y1="83" x2="52" y2="125" stroke="#bce7dd" stroke-width="10"/><line x1="105" y1="83" x2="160" y2="125" stroke="#bce7dd" stroke-width="10"/><line x1="105" y1="135" x2="65" y2="211" stroke="#bce7dd" stroke-width="11"/><line x1="105" y1="135" x2="144" y2="211" stroke="#bce7dd" stroke-width="11"/><text x="260" y="55" fill="#cceff3">HUESO</text><text x="260" y="90" fill="#cceff3">Osteoblasto: construye</text><text x="260" y="125" fill="#cceff3">Osteoclasto: reabsorbe</text><text x="260" y="160" fill="#cceff3">Osteocito: mantiene</text><text x="260" y="195" fill="#cceff3">Articulación: une huesos</text>';}
 else if(n===5){body='<path d="M102 138C54 128 55 62 96 48C105 22 162 29 177 50C221 47 240 105 204 137C184 177 119 168 102 138Z" fill="#bd8bc5" stroke="#e9befa" stroke-width="4"/><path d="M107 66C123 83 100 101 123 119M147 51C158 79 138 105 169 129M190 71C166 93 198 102 174 147" fill="none" stroke="#885f9b" stroke-width="4"/><path d="M163 157L161 214" stroke="#a3e0e7" stroke-width="14" stroke-linecap="round"/><text x="273" y="50" fill="#cceff3">SNC: encéfalo + médula</text><text x="273" y="90" fill="#cceff3">SNP: nervios + ganglios</text><text x="273" y="130" fill="#cceff3">Cerebelo: coordinación</text><text x="273" y="170" fill="#cceff3">Occipital: visión</text>';}
 else if(n===6){body='<circle cx="100" cy="43" r="27" fill="#427f92"/><path d="M75 89Q100 68 125 89L130 198H70Z" fill="#2c657b" stroke="#72bac6"/><circle cx="100" cy="39" r="7" fill="#a8e8ea"/><path d="M80 98Q97 82 100 102Q104 82 121 98L108 126H92Z" fill="#e1a1bd"/><circle cx="81" cy="148" r="12" fill="#edd697"/><circle cx="120" cy="148" r="12" fill="#edd697"/><text x="254" y="52" fill="#d6f8fa">Hipófisis: base del cráneo</text><text x="254" y="96" fill="#d6f8fa">Tiroides: cuello</text><text x="254" y="140" fill="#d6f8fa">Suprarrenales: sobre riñones</text><text x="254" y="184" fill="#d6f8fa">Páncreas: abdomen</text>';}
 else if(n===7){body='<rect x="14" y="18" width="238" height="194" rx="20" fill="#133d58" stroke="#2f91ac"/><rect x="296" y="18" width="238" height="194" rx="20" fill="#133d58" stroke="#2f91ac"/><text x="130" y="52" text-anchor="middle" fill="#8fdaf8" font-size="20">CIRCULACIÓN MENOR</text><text x="130" y="95" text-anchor="middle" fill="#e7f9ff">VD → pulmones</text><path d="M45 112C45 154 215 154 215 112" fill="none" stroke="#f0a2a7" stroke-width="8"/><text x="130" y="181" text-anchor="middle" fill="#a9efff">Venas pulmonares → AI</text><text x="413" y="52" text-anchor="middle" fill="#8fdaf8" font-size="20">CIRCULACIÓN MAYOR</text><text x="413" y="95" text-anchor="middle" fill="#e7f9ff">VI → aorta → tejidos</text><path d="M325 112C325 154 505 154 505 112" fill="none" stroke="#ed92a7" stroke-width="8"/><text x="413" y="181" text-anchor="middle" fill="#a9efff">Venas cavas → AD</text>';}
 return '<figure class="anatomy-illustration"><div class="meta">ILUSTRACIÓN ANATÓMICA · ESQUEMA ORIGINAL PARA ESTUDIO</div><svg viewBox="0 0 550 235" role="img" aria-label="Esquema visual didáctico de '+safe(l.title)+'" preserveAspectRatio="xMidYMid meet">'+body+'</svg><figcaption>Esquema orientativo para memorizar estructuras y relaciones; no es una imagen clínica ni está a escala.</figcaption></figure>';
}
function lessonPage(){
 const l=getLesson(state.lesson);if(!l)return allSubjects();
 return `<div class="breadcrumbs"><button class="btn small ghost" data-sub="${l.subject}">← ${safe(getSubject(l.subject)[1])}</button></div>
 <div class="book-intro"><div><span class="tag">📚 LIBRO DE ESTUDIO · ${safe(getSubject(l.subject)[1])}</span><h1>${safe(l.title)}</h1><p>${safe(l.intro)}</p></div><div class="actions"><button class="btn primary" data-action="lessonTest">📝 Examen tipo test (${l.questions.length} preguntas)</button><button class="btn" data-action="flash">🧠 Tarjetas de repaso</button><button class="btn" data-action="timedLesson">⏱️ Contrarreloj</button></div></div>
 ${renderStudyBook(l,state.bookPage)}`;
}
function quiz(questions,mode='normal'){if(!questions.length)return notify('No hay preguntas disponibles todavía');state.test=shuffled(uniqueBank(questions)).map((item,i)=>({...item,q:varyQuestion(item.q,Math.random,i%4)}));state.answers={};state.result=null;state.mode=mode;state.startedAt=Date.now();go('test')}
function getQuestion(id,i){return getLesson(id)?.questions[i]}
function startLesson(){const l=getLesson(state.lesson);if(!l)return;if(l.questions.length<10)return notify('Este tema tiene menos de 10 preguntas y su examen está en preparación. No lo presentaré como examen completo.');quiz(l.questions.map((q,i)=>({qid:`${l.id}:${i}`,l:l.id,i,q}))) }
function startSubject(){const ls=allLessons().filter(l=>l.subject===state.sub);quiz(ls.flatMap(l=>l.questions.map((q,i)=>({qid:`${l.id}:${i}`,l:l.id,i,q}))))}
function selectedTest(){const ids=[...document.querySelectorAll('.topicSelect:checked')].map(x=>x.dataset.topic);if(!ids.length)return notify('Marca uno o varios temas para practicar.');const ls=allLessons().filter(l=>ids.includes(l.id));quiz(ls.flatMap(l=>l.questions.map((q,i)=>({qid:`${l.id}:${i}`,l:l.id,i,q}))),'selected')}
function mixed(){const q=allLessons().flatMap(l=>l.questions.map((x,i)=>({qid:`${l.id}:${i}`,l:l.id,i,q:x})));quiz(drawVaried(q,10,'radiolab.history.mixed'),'mixed')}
function errorsTest(){const q=Object.values(state.mistakes).map(x=>{let a=getQuestion(x.lesson,x.question);return a?{qid:`${x.lesson}:${x.question}`,l:x.lesson,i:x.question,q:a}:null}).filter(Boolean);if(!q.length)return notify('¡No tienes preguntas pendientes de repasar!');quiz(q,'mistakes')}
function whyNotSelected(q,selected){
 if(selected===q[2])return '';
 if(Array.isArray(q[4])&&q[4][selected])return q[4][selected];
 const known={
 'tricúspide':'es la válvula entre aurícula derecha y ventrículo derecho',
 'mitral':'es la válvula entre aurícula izquierda y ventrículo izquierdo',
 'aórtica':'controla la salida desde el ventrículo izquierdo a la aorta',
 'pulmonar':'controla la salida del ventrículo derecho al tronco pulmonar',
 'sagital':'es el plano que separa derecha e izquierda',
 'coronal':'es el plano que divide anterior y posterior',
 'axial':'es el plano que separa superior e inferior',
 'supino':'describe a una persona tumbada boca arriba',
 'prono':'describe a una persona tumbada boca abajo',
 'cúbito':'es el hueso medial del antebrazo en posición anatómica',
 'radio':'es el hueso lateral del antebrazo en posición anatómica',
 'gray':'es la unidad de dosis absorbida',
 'sievert':'es la unidad de dosis equivalente o efectiva',
 'becquerel':'es la unidad de actividad radiactiva',
 'fotoeléctrico':'es la interacción en que el fotón se absorbe por completo',
 'compton':'es la dispersión de un fotón con transferencia parcial de energía',
 'pcr':'amplifica fragmentos específicos de ácido nucleico',
 'cultivo':'permite el crecimiento de microorganismos viables',
 'histoquímica':'identifica sustancias mediante reacciones en tejidos',
 'histología':'estudia la estructura microscópica de los tejidos'
};
 const candidate=String(q[1]?.[selected]||'').trim().toLowerCase();if(known[candidate])return 'La opción «'+q[1][selected]+'» '+known[candidate]+'. La pregunta exige otra estructura o proceso, cuya función se explica en la respuesta correcta.';
 const chosen=String(q[1]?.[selected]||'');
 const question=String(q[0]||'');
 const concept=question.match(/[«"]([^»"]+)[»"]/);
 if(concept){
  const all=allLessons().flatMap(l=>l.questions||[]);
  const matching=all.find(other=>other!==q && other[1]?.[other[2]]===chosen && /[«"]([^»"]+)[»"]/.test(String(other[0]||'')));
  if(matching){
   const label=String(matching[0]).match(/[«"]([^»"]+)[»"]/);
   if(label&&label[1]!==concept[1])return 'La respuesta que marcaste describe «'+label[1]+'», no «'+concept[1]+'». Son conceptos diferentes; revisa la definición y el ejemplo de este tema.';
  }
 }
 return 'La opción «'+chosen+'» no corresponde a lo que se pide en este enunciado. La clave para distinguirla es: '+String(q[3]||'revisa la definición y los ejemplos de este apartado.');
}
function testPage(){if(!state.test.length)return `<div class="empty">Todavía no hay preguntas para este modo.</div>`;const completed=state.result!==null;let html=`<div class="breadcrumbs"><button class="btn small ghost" data-action="leaveTest">← Salir del test</button></div><h1>${completed?'Resultados':'Modo examen'}</h1><p class="muted">${state.test.length} preguntas · 1 respuesta correcta · Corrección explicada${state.mode==='timed'?' · ⏱️ Máximo 60 segundos':''}</p><div class="panel" style="margin:15px 0;padding:16px"><strong>📋 Reglas del examen</strong><p class="muted" style="margin:8px 0 0">✅ Cada acierto suma 10/${state.test.length} puntos a la nota. ❌ Cada fallo resta 0,5 puntos adicionales. La nota final nunca baja de 0/10.</p><p class="muted" style="margin:8px 0 0">⚡ Experiencia: +3 XP por acierto; los fallos restan cada vez más XP en un mismo examen (−2, −3, −4, −5 y hasta −6 XP por error). La experiencia acumulada nunca baja de 0.</p></div>`;if(completed){const misses=state.test.length-state.result.correct;const note=state.result.score>=9?'Sobresaliente':state.result.score>=7?'Notable':state.result.score>=5?'Aprobado':'Necesita repaso';html+=`<div class="hero exam-result"><span class="tag">📊 NOTA DEL EXAMEN</span><h1>${state.result.score.toFixed(2)}/10</h1><h2>${note}</h2><p>✅ ${state.result.correct} aciertos · ❌ ${misses} fallos · 📚 ${state.test.length} preguntas · ${xpChange(state.result.correct,state.result.total)>=0?'+':''}${xpChange(state.result.correct,state.result.total)} XP</p><p>Penalización de nota: −${(misses*0.5).toFixed(2)} puntos por respuestas incorrectas.</p><p>Debajo encontrarás la opción correcta y el motivo de cada respuesta. Los fallos aparecen destacados en rojo.</p><button class="btn primary" data-action="again">Repetir test</button></div>`}
html+=state.test.map((x,i)=>{const q=x.q,sel=state.answers[i];return `<div class="question"><div class="meta">PREGUNTA ${i+1} / ${state.test.length}</div><h3 style="margin:10px 0 15px">${safe(q[0])}</h3>${q[1].map((o,j)=>`<button class="choice ${sel===j?'selected':''} ${completed&&j===q[2]?'good':''} ${completed&&sel===j&&sel!==q[2]?'bad':''}" ${completed?'disabled':''} data-answer="${i}:${j}">${'ABCD'[j]}. ${safe(o)}</button>`).join('')}${completed?`<div class="exam-feedback ${sel===q[2]?'feedback-good':'feedback-bad'}"><strong>${sel===q[2]?'✅ ¡Correcto!':'❌ Has fallado esta pregunta'}</strong><p><b>Respuesta correcta: ${'ABCD'[q[2]]}. ${safe(q[1][q[2]])}</b></p>${sel!==q[2]?`<p>Tu respuesta: ${'ABCD'[sel]||'—'}. ${safe(q[1][sel]||'Sin responder')}</p>`:''}<p><b>✅ ¿Por qué es la correcta?</b> ${safe(q[3]||'Se corresponde con la información explicada en el tema.')}</p>${sel!==q[2]?`<p><b>❌ ¿Por qué no es correcta la que elegiste?</b> ${safe(whyNotSelected(q,sel))}</p>`:''}</div>`:''}</div>`}).join('');if(!completed)html+=`<button class="btn primary" ${Object.keys(state.answers).length!==state.test.length?'disabled':''} data-action="correct">Corregir y guardar nota</button>`;else html+=`<div class="actions"><button class="btn" data-action="goMistakes">Repasar errores (${totalErr()})</button><button class="btn" data-go="progress">Ver progreso</button></div>`;return html}
async function correct(){if(Object.keys(state.answers).length!==state.test.length)return;const good=state.test.filter((x,i)=>state.answers[i]===x.q[2]).length;const wrong=state.test.length-good;const score=Math.max(0,good/state.test.length*10-wrong*0.5);const record={id:crypto.randomUUID(),lesson:['mistakes','mixed','daily','timed','challenge'].includes(state.mode)?state.mode:state.test[0]?.l||'mixto',correct:good,total:state.test.length,score,date:new Date().toISOString()};state.records.unshift(record);state.test.forEach((x,i)=>{if(state.answers[i]===x.q[2])delete state.mistakes[x.qid];else state.mistakes[x.qid]={lesson:x.l,question:x.i}});state.result=record;if(state.mode==='daily'){localStorage.setItem('radiolab.dailyDate',dailyLocalDate())}if(supa&&state.user){const r=await supa.from('attempts').insert({user_id:state.user.id,lesson_id:record.lesson,correct:good,total:state.test.length,score});if(r.error)state.notice='Error al guardar el test: '+r.error.message;const changes=await Promise.all(state.test.map(x=>state.answers[state.test.indexOf(x)]===x.q[2]?supa.from('mistakes').delete().eq('user_id',state.user.id).eq('question_id',x.qid):supa.from('mistakes').upsert({user_id:state.user.id,question_id:x.qid,lesson_id:x.l,question_index:x.i},{onConflict:'user_id,question_id'})));if(changes.some(a=>a.error))state.notice='No se pudo sincronizar alguno de tus fallos.'}else{localStorage.setItem('radiolab.records',JSON.stringify(state.records));localStorage.setItem('radiolab.mistakes',JSON.stringify(state.mistakes))}if(state.mode==='challenge'&&state.challenge&&supa&&state.user){let {error}=await supa.from('challenge_scores').upsert({challenge_id:state.challenge,user_id:state.user.id,score:good,total:state.test.length},{onConflict:'challenge_id,user_id'});if(error)state.notice='No se pudo enviar el resultado del desafío: '+error.message}render()}
function mistakesPage(){return `<div class="breadcrumbs"><button class="btn small ghost" data-go="home">← Inicio</button></div><h1>↺ Mis fallos</h1><p class="muted">Cada error se guarda aquí y desaparece cuando aciertas esa misma pregunta.</p><div class="panel"><h2>${totalErr()} preguntas pendientes</h2>${totalErr()?`<button class="btn primary" data-action="errorsTest">Empezar repaso de fallos →</button>`:'<p>¡Todo al día! Haz un test para detectar nuevas oportunidades de repaso.</p>'}</div>`}
function progressPage(){const recent=state.records.slice(0,30);return `<div class="breadcrumbs"><button class="btn small ghost" data-go="home">← Inicio</button></div><h1>Mi progreso</h1><div class="stats section"><div class="stat"><span class="muted">Tests</span><b>${state.records.length}</b></div><div class="stat"><span class="muted">Media</span><b>${average()}</b></div><div class="stat"><span class="muted">XP</span><b>${xp()}</b></div><div class="stat"><span class="muted">Fallos</span><b>${totalErr()}</b></div></div><section class="section"><h2>Resultados por asignatura</h2><div class="list">${subjects.map(sb=>{const ls=allLessons().filter(l=>l.subject===sb[0]).map(l=>l.id);const rows=state.records.filter(r=>ls.includes(r.lesson));if(!rows.length)return '';const avg=rows.reduce((a,r)=>a+Number(r.score),0)/rows.length;return `<div class="rowitem"><span>${sb[2]} ${safe(sb[1])}</span><span class="tag">${avg.toFixed(1)}/10 · ${rows.length} tests</span></div>`}).filter(Boolean).join('')||'<div class="empty">Haz tests para ver tus medias por materia.</div>'}</div></section><section class="section"><h2>Historial de exámenes</h2><div class="list">${recent.length?recent.map(r=>`<div class="rowitem"><div><h3>${safe(getLesson(r.lesson)?.title||r.lesson)}</h3><p>${new Date(r.date).toLocaleDateString('es-ES')} · ${r.correct}/${r.total} aciertos</p></div><span class="tag">${Number(r.score).toFixed(1)}/10</span></div>`).join(''):'<div class="empty">Cuando hagas tu primer test, aquí aparecerá la nota.</div>'}</div></section>`}
function flashPage(){const l=getLesson(state.lesson);if(!l)return '';const cards=l.sections||l.points||[];if(!cards.length)return `<div class="empty">Todavía no hay tarjetas de este tema.</div>`;const n=state.flash%cards.length;return `<div class="breadcrumbs"><button class="btn small ghost" data-lesson="${l.id}">← Tema</button></div><h1>Tarjetas de repaso</h1><p class="muted">Toca para dar la vuelta. Tarjeta ${n+1} de ${cards.length}.</p><div class="panel flash" data-action="flip">${safe(state.flipped?(cards[n][2]||cards[n][1]):cards[n][0])}</div><div class="actions section"><button class="btn" data-action="prevFlash">← Anterior</button><button class="btn primary" data-action="nextFlash">Siguiente →</button></div>`}
function authPage(){
 if(!configured)return '<div class="panel"><h2>Servicio de cuentas no configurado</h2><p>Los temas pueden leerse sin iniciar sesión.</p></div>';
 if(state.user)return profilePage();
 const mode=state.authMode||'choose';
 const tabs='<div class="auth-mode-tabs"><button type="button" data-auth-mode="login" class="auth-mode-button '+(mode==='login'?'active':'')+'">Iniciar sesión</button><button type="button" data-auth-mode="signup" class="auth-mode-button '+(mode==='signup'?'active':'')+'">Registrarse</button></div>';
 if(mode==='choose')return '<div class="auth panel auth-choice"><span class="tag">RADIO LAB ACADEMY</span><h1>Accede a tu cuenta</h1><p class="muted">Elige si ya tienes una cuenta o si quieres registrarte por primera vez.</p><div class="auth-cards"><button type="button" class="auth-option" data-auth-mode="login"><strong>🔐 Iniciar sesión</strong><span>Ya tengo una cuenta</span></button><button type="button" class="auth-option" data-auth-mode="signup"><strong>✨ Registrarse</strong><span>Crear una cuenta nueva</span></button></div><p class="muted">Puedes estudiar sin cuenta, pero necesitas registrarte para sincronizar notas, exámenes y progreso.</p></div>';
 const creating=mode==='signup';
 return '<div class="auth panel auth-form-container"><h1>'+(creating?'Crear cuenta':'Iniciar sesión')+'</h1><p class="muted">'+(creating?'Regístrate con tu correo para guardar tus resultados. Recibirás un mensaje de confirmación si está activada la verificación en Supabase.':'Introduce el correo y la contraseña de tu cuenta.')+'</p>'+tabs+
 '<form id="authform">'+(creating?'<label>Nombre de usuario</label><input class="field" name="username" minlength="3" maxlength="24" autocomplete="nickname" required placeholder="Ej. RxMaster25"><label>Avatar inicial</label><select class="field" name="avatar"><option value="🩻">🩻 Rayos X</option><option value="🧠">🧠 Cerebro</option><option value="🫀">🫀 Corazón</option><option value="🔬">🔬 Microscopio</option><option value="☢️">☢️ Protección radiológica</option></select>':'')+
 '<label>Correo electrónico</label><input class="field" name="email" type="email" autocomplete="email" required placeholder="tu@email.com"><label>Contraseña</label><input class="field" name="password" type="password" autocomplete="'+(creating?'new-password':'current-password')+'" required minlength="6" placeholder="Mínimo 6 caracteres">'+
 (creating?'<p class="auth-help">📨 Después del registro, comprueba tu correo y la carpeta de spam. Pulsa el enlace de confirmación para activar la cuenta.</p>':'')+
 '<button class="btn primary auth-submit" type="submit" name="action" value="'+(creating?'signup':'login')+'">'+(creating?'Crear cuenta y recibir confirmación':'Entrar a Radiolab')+'</button></form>'+
 (creating?'<p class="muted">¿Ya tienes cuenta? <button type="button" class="auth-text-link" data-auth-mode="login">Iniciar sesión</button></p>':'<button class="btn small ghost" data-action="resetpass">¿Olvidaste tu contraseña?</button>')+'</div>';
}
async function doAuth(form,submitter){
 const f=new FormData(form),email=String(f.get('email')||'').trim(),password=String(f.get('password')||'');
 const action=submitter?.value|| (state.authMode==='signup'?'signup':'login');
 const username=String(f.get('username')||'').trim();
 if(action==='signup'&&username.length<3)return notify('El nombre de usuario debe tener al menos 3 caracteres.');
 if(!email||!password)return notify('Introduce correo electrónico y contraseña.');
 const button=form.querySelector('button[type=submit]');
 if(button){button.disabled=true;button.textContent=action==='signup'?'Creando cuenta…':'Iniciando sesión…'}
 try{
  const r=action==='signup'
   ?await supa.auth.signUp({email,password,options:{emailRedirectTo:'https://radiolab-academy.pages.dev/',data:{username,avatar:String(f.get('avatar')||'🩻').slice(0,6)}}})
   :await supa.auth.signInWithPassword({email,password});
  if(r.error)return notify('No se ha podido '+(action==='signup'?'registrar':'iniciar sesión')+': '+r.error.message);
  if(action==='signup'){
   if(r.data?.session){await supa.auth.signOut();state.user=null;state.authMode='login';return notify('La cuenta se ha creado, pero la confirmación del correo todavía no está activada en Supabase. Activa Confirm Email en Authentication → Providers → Email.')}
   state.authMode='login';
   return notify('📨 Solicitud de registro recibida. Revisa tu correo y spam, abre el enlace de confirmación y después inicia sesión. Si no llega, comprueba el proveedor de correo de Supabase.');
  }
  await loadMe();
  notify('Has iniciado sesión correctamente.');
 }catch(error){notify('Error de conexión: '+(error?.message||'Inténtalo de nuevo.'))}
}

function resetPage(){return `<div class="auth panel"><h2>🔐 Cambiar contraseña</h2><form id="resetform"><label>Contraseña nueva</label><input class="field" name="password" type="password" minlength="8" required><button class="btn primary">Guardar contraseña</button></form></div>`}
function profilePage(){return `<div class="breadcrumbs"><button class="btn small ghost" data-go="home">← Inicio</button></div><div class="hero"><span class="tag">👤 PERFIL</span><h1>${safe(state.profile?.avatar||'🩻')} ${safe(state.profile?.username||'Mi perfil')}</h1><p>Rango: ${rank(xp())} · ${xp()} XP · Nota media: ${average()}/10</p></div><section class="section panel"><h2>Mi cuenta</h2><p class="muted">${configured?(state.user?'Tu sesión se sincroniza con Supabase.':'Inicia sesión para sincronizar tus avances.'):'En modo demo, el progreso se conserva en este navegador.'}</p>${state.user?'<form id="profileForm"><label>Apodo público</label><input class="field" name="username" minlength="3" maxlength="24" value="'+safe(state.profile?.username||'')+'" required><label>Elige tu avatar de radiología y medicina</label><div id="avatarPreview" style="font-size:54px;line-height:1.4;margin:8px 0">🩻</div><select class="field" name="avatar" id="avatarSelect"><option value="🩻">🩻 Rayos X</option><option value="🧠">🧠 Cerebro</option><option value="🫀">🫀 Corazón</option><option value="🫁">🫁 Pulmones</option><option value="🦴">🦴 Huesos</option><option value="💀">💀 Cráneo</option><option value="🦷">🦷 Dientes</option><option value="🩺">🩺 Medicina</option><option value="🥼">🥼 Bata</option><option value="💉">💉 Jeringa</option><option value="💊">💊 Farmacia</option><option value="🔬">🔬 Microscopio</option><option value="🧫">🧫 Cultivo</option><option value="🧬">🧬 ADN</option><option value="🩸">🩸 Sangre</option><option value="🦠">🦠 Microbiología</option><option value="⚗️">⚗️ Laboratorio</option><option value="☢️">☢️ Radiación</option><option value="⚛️">⚛️ Átomo</option><option value="🖥️">🖥️ Tomografía</option><option value="🛡️">🛡️ Protección</option><option value="🧪">🧪 Química</option><option value="⚡">⚡ Energía</option><option value="📚">📚 Estudio</option><option value="🎓">🎓 Graduación</option><option value="🏆">🏆 Campeón</option><option value="👩‍⚕️">👩‍⚕️ Doctora</option><option value="👨‍⚕️">👨‍⚕️ Doctor</option><option value="🧑‍⚕️">🧑‍⚕️ Técnico</option><option value="🦾">🦾 Robótica</option><option value="🌡️">🌡️ Temperatura</option><option value="🧤">🧤 Guantes</option></select><p class="muted">Podrás cambiarlo cuando quieras. Pulsa Guardar perfil.</p><button type="submit" class="btn primary">Guardar perfil</button></form><button class="btn" data-action="logout">Cerrar sesión</button>':`<button class="btn primary" data-go="auth">${configured?'Iniciar sesión / registrarme':'Consultar configuración'}</button>`}</section>`}
let channel=null,forumPollTimer=null,forumRoomToken=0;
function forumMessageHtml(p){
 return '<div class="post" data-post-id="'+safe(p.id)+'"><span class="meta">'+safe(p.avatar)+' '+safe(p.display_name)+' · '+new Date(p.created_at).toLocaleString('es-ES')+'</span><p>'+safe(p.body)+'</p><button class="btn small ghost" data-reply="'+safe(p.id)+'">↩️ Responder</button></div>';
}
function forumStatus(message,kind=''){
 const status=document.querySelector('#forumStatus');
 if(status){status.textContent=message;status.dataset.status=kind;}
}
function drawForumPosts(){
 const list=document.querySelector('#forumMessages');
 if(!list||state.page!=='forum')return;
 const count=document.querySelector('#forumPostCount');
 if(count)count.textContent=state.posts.length+' mensajes recientes';
 // Solo cambia la lista: el formulario y el texto que esté escribiendo el usuario no se pierden.
 list.innerHTML=state.posts.length?state.posts.map(forumMessageHtml).join(''):'<p class="muted">Todavía no hay mensajes en esta sala. ¡Escribe el primero!</p>';
 list.querySelectorAll('[data-reply]').forEach(el=>el.onclick=()=>{
  const input=document.querySelector('#postform textarea');
  if(!input)return;input.value='↩️ Respuesta a #'+el.dataset.reply+': ';input.focus();
 });
}
async function loadPosts(){
 if(!supa||!state.user||state.page!=='forum')return;
 const room=state.room,token=forumRoomToken;
 const r=await supa.from('forum_posts').select('id,room,author_id,display_name,avatar,body,created_at').eq('room',room).order('created_at',{ascending:false}).limit(100);
 if(room!==state.room||token!==forumRoomToken||state.page!=='forum')return;
 if(r.error){forumStatus('Error al cargar mensajes: '+r.error.message,'error');return}
 state.posts=r.data||[];drawForumPosts();
}
function stopForum(){
 forumRoomToken++;
 if(channel&&supa){supa.removeChannel(channel);channel=null;}
 if(forumPollTimer!==null){clearInterval(forumPollTimer);forumPollTimer=null;}
}
function listenRoom(){
 if(!supa||!state.user||state.page!=='forum')return;
 if(channel)supa.removeChannel(channel);
 const room=state.room;
 forumStatus('● Conectando al foro…','connecting');
 channel=supa.channel('radiolab-foro-'+room+'-'+Date.now())
 .on('postgres_changes',{event:'*',schema:'public',table:'forum_posts',filter:'room=eq.'+room},()=>{if(state.page==='forum'&&state.room===room)loadPosts()})
 .subscribe(status=>{
  if(state.page!=='forum'||state.room!==room)return;
  if(status==='SUBSCRIBED')forumStatus('● En directo · mensajes automáticos','live');
  else if(status==='CHANNEL_ERROR'||status==='TIMED_OUT'||status==='CLOSED')forumStatus('● Reconectando · comprobación automática','connecting');
 });
}
function enterForum(){
 if(!supa||!state.user||state.page!=='forum')return;
 stopForum();state.posts=[];drawForumPosts();
 loadPosts();listenRoom();
 // Respaldo: sincroniza incluso si el móvil suspende su conexión WebSocket.
 forumPollTimer=setInterval(()=>{if(state.page==='forum'&&state.user&&document.visibilityState==='visible')loadPosts()},12000);
}
function forumPage(){
 if(!state.user)return '<div class="panel"><h2>💬 Foro de estudiantes</h2><p>Para ver y enviar mensajes compartidos, inicia sesión con tu cuenta. Una vez dentro los mensajes se actualizarán sin recargar.</p><button class="btn primary" data-go="auth">'+(configured?'Iniciar sesión o registrarse':'Conectar base de datos')+'</button></div>';
 return '<h1>💬 Foro de dudas</h1><p class="muted">Comparte dudas y ayuda a tus compañeros. No publiques información identificable de pacientes.</p>'+
 '<div class="forum-status" id="forumStatus" role="status" aria-live="polite" data-status="connecting">● Conectando al foro…</div>'+
 '<div class="forum-room-picker"><label for="forumRoomSelect">📂 Elige dónde preguntar</label><select class="field" id="forumRoomSelect" aria-label="Categoría del foro"><option value="general" '+(state.room==='general'?'selected':'')+'>🌐 General</option>'+
 subjects.map(z=>'<option value="'+z[0]+'" '+(state.room===z[0]?'selected':'')+'>'+z[2]+' '+safe(z[1])+'</option>').join('')+'</select></div>'+
 '<section class="section panel"><div class="forum-heading"><h3>Canal: '+safe(state.room==='general'?'General':getSubject(state.room)?.[1]||state.room)+'</h3><small id="forumPostCount">'+state.posts.length+' mensajes recientes</small></div>'+
 '<form id="postform"><label for="forumBody">Tu mensaje</label><textarea class="field" id="forumBody" rows="3" maxlength="1000" name="body" placeholder="Escribe tu duda..." required></textarea><button class="btn primary" type="submit">Enviar mensaje</button></form>'+
 '<div id="forumMessages" class="list" aria-live="polite">'+(state.posts.length?state.posts.map(forumMessageHtml).join(''):'<p class="muted">Cargando mensajes…</p>')+'</div></section>';
}
async function post(form){
 if(!supa||!state.user)return notify('Inicia sesión para publicar.');
 const body=String(new FormData(form).get('body')||'').trim();
 if(!body||body.length>1000)return;
 const btn=form.querySelector('button[type=submit]');
 if(btn)btn.disabled=true;
 const r=await supa.from('forum_posts').insert({room:state.room,author_id:state.user.id,body,display_name:state.profile?.username||'Estudiante',avatar:state.profile?.avatar||'🩻'});
 if(btn)btn.disabled=false;
 if(r.error){forumStatus('No se pudo enviar: '+r.error.message,'error');return}
 form.reset();await loadPosts();
}

const dailyLocalDate=(d=new Date())=>{const parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Madrid',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(d);const get=t=>parts.find(p=>p.type===t)?.value||'';return get('year')+'-'+get('month')+'-'+get('day')};
const dayNumber=()=>Number(dailyLocalDate().replaceAll('-',''));
function hashQuestion(s,seed){for(const c of s)seed=(Math.imul(seed,31)+c.charCodeAt(0))|0;return seed>>>0}
const dailyMissions=[
 {name:'🩻 Reto Rayos X',subtitle:'Identifica técnicas, equipos y posiciones radiográficas.',subs:['rxsimple','rxespecial','fundamentos'],count:7,target:5},
 {name:'🦴 Explorador anatómico',subtitle:'Demuestra que dominas huesos, órganos y estructuras humanas.',subs:['anatomia'],count:8,target:6},
 {name:'☢️ Escudo radiológico',subtitle:'Comprueba cómo proteger al paciente y al profesional.',subs:['proteccion','fundamentos'],count:7,target:5},
 {name:'🧲 Misión de imagen avanzada',subtitle:'Responde preguntas de resonancia, TC y ecografía.',subs:['rm','tc'],count:8,target:6},
 {name:'🔬 Detective del laboratorio',subtitle:'Investiga muestras, procedimientos e interpretación forense.',subs:['forense','radiofarmacia'],count:7,target:5},
 {name:'🩺 Atención segura',subtitle:'Practica la comunicación y los cuidados del paciente.',subs:['atencion'],count:6,target:5},
 {name:'🌍 Técnico internacional',subtitle:'Entrena inglés sanitario y preparación para el empleo.',subs:['ingles','ipe1','ipe2'],count:8,target:6},
 {name:'⚛️ Desafío isotópico',subtitle:'Pon a prueba conocimientos de medicina nuclear y radiofarmacia.',subs:['nuclear','radiofarmacia'],count:8,target:6},
 {name:'💻 Futuro sostenible',subtitle:'Aplica digitalización y sostenibilidad al trabajo sanitario.',subs:['digital','sostenibilidad'],count:7,target:5},
 {name:'🏆 Gran mezcla Radiolab',subtitle:'Un recorrido variado por todas las asignaturas del ciclo.',subs:null,count:10,target:8}
];
function dailyMission(){
 const seed=dayNumber(),index=(Math.floor(Date.UTC(Number(String(seed).slice(0,4)),Number(String(seed).slice(4,6))-1,Number(String(seed).slice(6,8)))/86400000))%dailyMissions.length;
 return {...dailyMissions[index],seed};
}
function dailyRecordDate(r){return dailyLocalDate(new Date(r.date))}
function dailyFinished(){return state.records.find(r=>r.lesson==='daily'&&dailyRecordDate(r)===dailyLocalDate())}
function dailyStart(){
 if(dailyFinished())return notify('¡Ya has completado la misión de hoy! Vuelve mañana para una nueva.');
 const mission=dailyMission();
 const all=uniqueBank(allLessons().filter(l=>!mission.subs||mission.subs.includes(l.subject)).flatMap(l=>l.questions.map((q,i)=>({qid:l.id+':'+i,l:l.id,i,q}))));
 let seed=hashQuestion(dailyLocalDate()+mission.name,0x9e3779b9);
 const random=()=>{seed=(seed+0x6d2b79f5)|0;let a=Math.imul(seed^(seed>>>15),1|seed);a^=a+Math.imul(a^(a>>>7),61|a);return ((a^(a>>>14))>>>0)/4294967296};
 const shuffle=list=>{const a=[...list];for(let i=a.length-1;i>0;i--){let j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
 const distinct=new Map();for(const item of shuffle(all)){const key=String(item.q[0]||'').normalize('NFD').replace(/[\\u0300-\\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'');if(key&&!distinct.has(key))distinct.set(key,item)}
 const history=getStore('radiolab.dailyHistory',[]).filter(x=>x.date!==dailyLocalDate()&&x.date>=dailyLocalDate(new Date(Date.now()-7*86400000)));
 const used=new Set(history.flatMap(x=>x.ids));const items=shuffle([...distinct.values()]);const ordered=[...items.filter(x=>!used.has(x.qid)),...items.filter(x=>used.has(x.qid))];const chosen=[];const lessons=new Set();
 for(const x of ordered){if(!lessons.has(x.l)){chosen.push(x);lessons.add(x.l)}if(chosen.length>=mission.count)break}for(const x of ordered){if(chosen.length>=mission.count)break;if(!chosen.includes(x))chosen.push(x)}
 const positions=shuffle([0,1,2,3]);const questions=chosen.map((x,i)=>{const q=x.q,correct=q[1][q[2]],wrong=shuffle(q[1].map((v,j)=>({v,j})).filter(o=>o.j!==q[2])).map(o=>o.v),position=positions[i%4];wrong.splice(position,0,correct);return {...x,q:[q[0],wrong,position,q[3]]}});
 history.push({date:dailyLocalDate(),ids:chosen.map(x=>x.qid)});localStorage.setItem('radiolab.dailyHistory',JSON.stringify(history));
 quiz(questions,'daily');
}
function dailyPage(){
 const today=dailyLocalDate(),mission=dailyMission(),finished=dailyFinished();
 const days=[...new Set(state.records.filter(r=>r.lesson==='daily').map(dailyRecordDate))].sort().reverse();
 let streak=0,cursor=new Date();
 if(!days.includes(dailyLocalDate(cursor)))cursor.setDate(cursor.getDate()-1);
 while(days.includes(dailyLocalDate(cursor))){streak++;cursor.setDate(cursor.getDate()-1)}
 const completed=finished&&finished.correct>=mission.target;
 return '<div class="breadcrumbs"><button class="btn small ghost" data-go="home">← Inicio</button></div>'+
 '<div class="hero"><span class="tag">⚡ MISIÓN QUE CAMBIA CADA DÍA</span><h1>'+safe(mission.name)+'</h1><p>'+safe(mission.subtitle)+'</p><p class="muted">Nueva misión cada día a las 00:00 (hora peninsular española). Las preguntas y la asignatura se seleccionan automáticamente.</p><div class="actions"><span class="pill">🔥 '+streak+' días de racha</span><span class="pill">📅 '+today+'</span><span class="pill">🎯 '+mission.target+' de '+mission.count+' aciertos para superar la misión</span></div></div>'+
 '<section class="section panel"><h2>'+(finished?(completed?'🏆 ¡Misión superada!':'📘 Misión realizada'):'¿Preparado para la misión de hoy?')+'</h2>'+
 '<p class="muted">'+(finished?'Aciertos: '+finished.correct+'/'+finished.total+' · Nota '+finished.score.toFixed(1)+'/10. La misión de mañana será diferente.':'Tienes '+mission.count+' preguntas seleccionadas para hoy. Completarla registra un día en tu racha; conseguir el objetivo te da el reconocimiento de misión superada.')+'</p>'+
 '<button class="btn primary" data-action="daily" '+(finished?'disabled':'')+'>'+(finished?'Completada · vuelve mañana':'Empezar misión de hoy')+'</button></section>';
}
async function loadLeaderboard(){if(!supa||!state.user)return notify('El ranking necesita que el registro esté configurado.');const x=await supa.from('public_leaderboard').select('*').limit(50);if(x.error)return notify('Ranking no disponible: '+x.error.message);state.leaderboard=x.data||[];render()}
function leaderboardPage(){return `<div class="breadcrumbs"><button class="btn small ghost" data-go="home">← Inicio</button></div><h1>🏆 Ranking de estudiantes</h1><p class="muted">Tabla orientativa de XP calculada a partir de tests. No es una evaluación académica ni sistema antifraude.</p><div class="panel"><button class="btn small" data-action="refreshLeaderboard">↻ Actualizar</button>${!configured?'<p class="muted">Para compartir la clasificación entre compañeros, hay que conectar un proyecto nuevo de Supabase.</p>':''}<div class="list section">${state.leaderboard.length?state.leaderboard.map((x,i)=>`<div class="rowitem"><div><strong>${['🥇','🥈','🥉'][i]||'#'+(i+1)} ${safe(x.avatar||'🩻')} ${safe(x.username)}</strong><p class="muted">${x.tests} tests</p></div><span class="tag">${x.xp} XP</span></div>`).join(''):'<div class="empty">Aún no hay puntuaciones compartidas.</div>'}</div></div>`}
function examsPage(){return `<div class="breadcrumbs"><button class="btn small ghost" data-go="home">← Inicio</button></div><div class="hero"><span class="tag">📝 CENTRO DE EXÁMENES</span><h1>Prepárate para el examen.</h1><p>Elige asignatura o una mezcla de todas; corrige, guarda tus notas y repasa tus errores.</p></div><div class="section grid"><div class="panel"><h2>🎲 Examen aleatorio</h2><label>Preguntas</label><select id="examCount" class="field"><option value="10">10 preguntas</option><option value="20">20 preguntas</option><option value="30">30 preguntas</option><option value="50">50 preguntas</option></select><button class="btn primary" data-action="examRandom">Comenzar →</button></div><div class="panel"><h2>📚 Examen por asignatura</h2><label>Asignatura</label><select id="examSubject" class="field">${subjects.map(s=>`<option value="${s[0]}">${safe(s[1])}</option>`).join('')}</select><label>Tema</label><select id="examTopic" class="field" aria-label="Selecciona tema del examen"></select><p class="muted" id="examTopicInfo" style="font-size:12px">Elige un tema específico o todos los temas de la asignatura.</p><label>Preguntas</label><select id="examSubjectCount" class="field"><option value="10">10 preguntas</option><option value="20">20 preguntas</option><option value="30">30 preguntas</option></select><button class="btn primary" data-action="examSubject">Comenzar →</button></div><div class="panel"><h2>⏱️ Contrarreloj</h2><p class="muted">Test mixto de 10 preguntas con un minuto total.</p><button class="btn primary" data-action="examTimed">Comenzar →</button></div></div><div class="section panel"><h2>Resultados</h2><p>Consulta tu nota media, XP y errores desde Mi progreso.</p><button class="btn" data-go="progress">Ver progreso</button></div>`}
function refreshExamTopics(){
 const subject=document.querySelector('#examSubject'), topic=document.querySelector('#examTopic');
 if(!subject||!topic)return;
 const available=allLessons().filter(l=>l.subject===subject.value&&Array.isArray(l.questions)&&l.questions.length>=10);
 const previous=topic.value;
 topic.innerHTML='<option value="">📚 Todos los temas ('+available.length+')</option>'+available.map(l=>'<option value="'+safe(l.id)+'" '+(l.questions.length<10?'disabled':'')+'>'+safe(l.title)+(l.questions.length<10?' · En preparación (mín. 10 preguntas)':' · '+l.questions.length+' preguntas')+'</option>').join('');
 if(available.some(l=>l.id===previous))topic.value=previous;
 const info=document.querySelector('#examTopicInfo');
 if(info)info.textContent=available.length?'Selecciona un tema o deja «Todos los temas» para mezclar sus preguntas.':'Aún no hay preguntas en esta asignatura.';
}
function runExam(subject,count,timed=false,topicId=null){
 let selected=allLessons().filter(l=>(!subject||l.subject===subject)&&(!topicId||l.id===topicId));
 if(topicId&&!selected.length)return notify('Ese tema no está disponible en la asignatura seleccionada.');
 let all=selected.flatMap(l=>(l.questions||[]).map((q,i)=>({qid:`${l.id}:${i}`,l:l.id,i,q})));
 if(!all.length)return notify('Todavía no hay preguntas disponibles para este examen.');
 if(topicId&&all.length<10)return notify('Este tema todavía no tiene 10 preguntas distintas. Su examen está en preparación.');
 const q=drawVaried(all,Math.max(1,count),'radiolab.history.exam.'+(topicId||subject||'all'));
 if(!q.length)return notify('No hay preguntas distintas para este examen.');
 quiz(q,timed?'timed':'exam');
}
function arenaPage(){return `<div class="breadcrumbs"><button class="btn small ghost" data-go="home">← Inicio</button></div><div class="hero"><span class="tag">🎮 ARENA RADIO LAB</span><h1>Desafía a tus<br><span class="highlight">compañeros.</span></h1><p>Compite en duelos por turnos o en Kahoot simultáneo y continúa tus partidas guardadas.</p></div><section class="section panel"><h2>🎡 Duelos con ruleta · 1 contra 1</h2><p>Gira por turnos, consigue emojis al acertar tres preguntas por asignatura y continúa la partida más tarde (hasta 2 horas). Cada pregunta dura 20 segundos.</p><a class="btn primary" href="./duelos.html">Entrar a Duelos con Ruleta →</a></section><section class="section panel"><h2>🎯 Kahoot Radiolab · Grupos</h2><p>Elige una asignatura o preguntas aleatorias, crea una sala por código y competid en directo con clasificación y podio.</p><a class="btn primary" href="./kahoot.html">Entrar a Kahoot en directo →</a></section><section class="section grid"><div class="panel"><h2>🏁 Crear desafío asíncrono</h2><form id="challengeCreate"><label>Asignatura</label><select class="field" name="subject">${subjects.map(x=>`<option value="${x[0]}">${safe(x[1])}</option>`).join('')}</select><button class="btn primary" ${!state.user?'disabled':''}>Crear código</button></form></div><div class="panel"><h2>🎟️ Unirse</h2><form id="challengeJoin"><label>Código de 6 caracteres</label><input class="field" name="code" maxlength="6" minlength="6" required placeholder="AB12CD"><button class="btn primary" ${!state.user?'disabled':''}>Entrar al reto</button></form></div></section>${!state.user?'<p class="muted">Necesitas una cuenta para guardar los desafíos compartidos. En modo demo usa los tests individuales.</p>':''}<section class="section panel"><h2>💡 Cómo funciona</h2><p>Esta modalidad es asíncrona: cada jugador responde cuando entra, y los resultados se guardan. No se presenta falsamente como Kahoot en directo.</p>${state.challenge?`<p class="tag">Código o identificador: ${safe(state.challenge)}</p><button class="btn" data-action="refreshChallenge">Ver estado</button>`:''}${state.challenges.length?state.challenges.map(x=>`<div class="rowitem"><span>${safe(x.username||'Alumno')}: ${x.score}/${x.total}</span></div>`).join(''):''}</section>`}
async function createChallenge(form){if(!supa||!state.user)return notify('Debes iniciar sesión');const sub=new FormData(form).get('subject');const ls=allLessons().filter(x=>x.subject===sub);if(!ls.length)return notify('Esa asignatura no tiene preguntas todavía');const code=Math.random().toString(36).slice(2,8).toUpperCase();const {data,error}=await supa.from('challenges').insert({code,subject_id:sub,created_by:state.user.id}).select().single();if(error)return notify('Error al crear: '+error.message);state.challenge=data.id;const el=document.createElement('div');notify('Código de tu reto: '+data.code+' (compártelo con tus compañeros)')}
async function joinChallenge(form){if(!supa||!state.user)return notify('Debes iniciar sesión');const code=String(new FormData(form).get('code')).trim().toUpperCase();const r=await supa.from('challenges').select('*').eq('code',code).maybeSingle();if(r.error||!r.data)return notify('Código no encontrado');const q=allLessons().filter(l=>l.subject===r.data.subject_id).flatMap(l=>l.questions.map((x,i)=>({qid:`${l.id}:${i}`,l:l.id,i,q:x}))).slice(0,10);if(!q.length)return notify('El reto no tiene preguntas disponibles en esta versión.');state.challenge=r.data.id;quiz(q,'challenge')}
async function refreshChallenge(){if(!supa||!state.challenge)return;const r=await supa.from('challenge_scores').select('score,total,user_id').eq('challenge_id',state.challenge).order('score',{ascending:false});if(r.error)return notify(r.error.message);state.challenges=(r.data||[]).map(x=>({...x,username:x.user_id.slice(0,8)}));render()}
function adminPage(){if(!state.admin)return `<div class="panel"><h2>🔒 Área del administrador</h2><p>Acceso reservado al propietario autorizado. Los alumnos no pueden publicar o cambiar las lecciones.</p></div>`;return `<div class="breadcrumbs"><button class="btn small ghost" data-go="home">← Inicio</button></div><h1>🛠 Gestión de contenidos</h1><p class="muted">Importa temas redactados y revisados por ti. Para publicar PDF de terceros, asegúrate de tener permiso.</p><div class="panel"><h2>Crear tema verificado</h2><form id="adminform"><label>Asignatura</label><select name="subject" class="field">${subjects.map(x=>`<option value="${x[0]}">${safe(x[1])}</option>`).join('')}</select><label>Título</label><input name="title" class="field" required maxlength="140"><label>Introducción</label><textarea name="intro" class="field" required maxlength="2000"></textarea><label>Explicación (una línea por concepto, separa TÍTULO | EXPLICACIÓN)</label><textarea name="points" rows="7" class="field" required></textarea><label>Resumen final</label><textarea name="summary" class="field" required></textarea><label>Banco de preguntas JSON (matriz: [pregunta,[opciones],índice correcto,explicación])</label><textarea name="questions" class="field" rows="8" placeholder='[["¿Pregunta?",["A","B","C","D"],0,"Explicación"]]'></textarea><button class="btn primary">Publicar tema</button></form></div>`}
async function saveLesson(form){if(!state.admin||!supa)return;const f=new FormData(form);let questions;try{questions=JSON.parse(f.get('questions')||'[]');if(!Array.isArray(questions)||questions.some(q=>!Array.isArray(q)||q.length!==4||!Array.isArray(q[1])||q[2]<0||q[2]>=q[1].length))throw Error()}catch{return notify('Las preguntas deben tener el formato JSON indicado.')}const title=String(f.get('title')).trim();const slug='custom-'+crypto.randomUUID().slice(0,12);const points=String(f.get('points')).split('\n').filter(x=>x.trim()).map(x=>{const i=x.indexOf('|');return i<0?['Concepto',x.trim()]:[x.slice(0,i).trim(),x.slice(i+1).trim()]});const item={slug,subject_id:f.get('subject'),title,intro:f.get('intro'),points,summary:f.get('summary'),questions,published:true};const r=await supa.from('study_lessons').insert(item);if(r.error)return notify('Error al publicar: '+r.error.message);state.customLessons.push({id:slug,subject:item.subject_id,title,intro:item.intro,points,summary:item.summary,questions,verified:true});notify('Tema guardado y publicado.');}

async function saveProfile(f){if(!supa||!state.user)return;const data=new FormData(f);const username=String(data.get('username')||'').trim();if(!/^[a-zA-Z0-9_-]{3,24}$/.test(username))return notify('Usa de 3 a 24 caracteres: letras, números, guion o guion bajo.');const avatar=String(data.get('avatar')||'🩻');const r=await supa.from('profiles').update({username,avatar}).eq('id',state.user.id);if(r.error)return notify('Error al actualizar: '+r.error.message);state.profile={...state.profile,username,avatar};notify('Perfil actualizado.');}
function render(){let b=state.page==='home'?home():state.page==='subjects'?allSubjects():state.page==='subject'?subjectPage():state.page==='lesson'?lessonPage():state.page==='test'?testPage():state.page==='mistakes'?mistakesPage():state.page==='progress'?progressPage():state.page==='flash'?flashPage():state.page==='auth'?authPage():state.page==='reset'?resetPage():state.page==='profile'?profilePage():state.page==='forum'?forumPage():state.page==='daily'?dailyPage():state.page==='arena'?arenaPage():state.page==='exams'?examsPage():state.page==='leaderboard'?leaderboardPage():state.page==='admin'?adminPage():home();document.documentElement.dataset.theme=state.theme;wrap(b)}
function bind(){document.querySelectorAll('[data-mobile-more]').forEach(el=>el.onclick=()=>{state.mobileMenu=!state.mobileMenu;render()});document.querySelectorAll('[data-mobile-close]').forEach(el=>el.onclick=()=>{state.mobileMenu=false;render()});document.querySelectorAll('[data-auth-mode]').forEach(el=>el.onclick=()=>{state.authMode=el.dataset.authMode;render()});const paper=document.querySelector('.book-paper');if(paper){let touchStart=null;paper.addEventListener('touchstart',ev=>{const t=ev.changedTouches[0];touchStart={x:t.clientX,y:t.clientY}},{passive:true});paper.addEventListener('touchend',ev=>{if(!touchStart)return;const t=ev.changedTouches[0],dx=t.clientX-touchStart.x,dy=t.clientY-touchStart.y;touchStart=null;if(Math.abs(dx)<85||Math.abs(dy)>Math.abs(dx)*0.6)return;const max=(getLesson(state.lesson)?.sections||[]).length+1;state.bookPage=Math.max(0,Math.min(max,state.bookPage+(dx<0?1:-1)));render();window.scrollTo?.(0,0)},{passive:true})}document.querySelectorAll('[data-page-select]').forEach(el=>el.onclick=()=>{state.bookPage=Number(el.dataset.pageSelect)||0;render();window.scrollTo?.(0,0)});document.querySelectorAll('[data-chapter-scroll]').forEach(el=>el.onclick=()=>document.querySelector('#chapter-part-'+el.dataset.chapterScroll)?.scrollIntoView({behavior:'smooth',block:'start'}));const subSelector=document.querySelector('#examSubject');if(subSelector){refreshExamTopics();subSelector.onchange=refreshExamTopics;}document.querySelectorAll('[data-go]').forEach(el=>el.onclick=()=>go(el.dataset.go,{sub:null,lesson:null}));document.querySelectorAll('[data-sub]').forEach(el=>el.onclick=()=>go('subject',{sub:el.dataset.sub,lesson:null}));document.querySelectorAll('[data-lesson]').forEach(el=>el.onclick=()=>(state.bookPage=0,go('lesson',{lesson:el.dataset.lesson,sub:getLesson(el.dataset.lesson)?.subject})));document.querySelectorAll('[data-answer]').forEach(el=>el.onclick=()=>{const [i,j]=el.dataset.answer.split(':').map(Number);state.answers[i]=j;render()});document.querySelectorAll('[data-reply]').forEach(el=>el.onclick=()=>{const f=$('#postform textarea');if(f){f.value='↩️ Respuesta a #'+el.dataset.reply+': ';f.focus()}});const forumRoomSelect=document.querySelector('#forumRoomSelect');if(forumRoomSelect)forumRoomSelect.onchange=()=>{if(state.room===forumRoomSelect.value)return;state.room=forumRoomSelect.value;stopForum();state.posts=[];render();enterForum()};document.querySelectorAll('[data-action]').forEach(el=>el.onclick=()=>actions(el.dataset.action));const a=$('#authform');if(a)a.onsubmit=e=>{e.preventDefault();doAuth(a,e.submitter)};const p=$('#postform');if(p)p.onsubmit=e=>{e.preventDefault();post(p)};const f=$('#challengeCreate');if(f)f.onsubmit=e=>{e.preventDefault();createChallenge(f)};const j=$('#challengeJoin');if(j)j.onsubmit=e=>{e.preventDefault();joinChallenge(j)};const ad=$('#adminform');if(ad)ad.onsubmit=e=>{e.preventDefault();saveLesson(ad)};const pf=$('#profileForm');if(pf){pf.onsubmit=e=>{e.preventDefault();saveProfile(pf)};const avatar=pf.querySelector('#avatarSelect');if(avatar){avatar.value=state.profile?.avatar||'🩻';avatar.onchange=()=>{const preview=pf.querySelector('#avatarPreview');if(preview)preview.textContent=avatar.value};avatar.onchange()}};const rp=$('#resetform');if(rp)rp.onsubmit=async e=>{e.preventDefault();const pass=String(new FormData(rp).get('password')||'');if(!supa)return;const r=await supa.auth.updateUser({password:pass});notify(r.error?'Error al actualizar: '+r.error.message:'Contraseña actualizada.');if(!r.error)go('profile')}}
async function actions(a){if(a==='examRandom')runExam(null,Number(document.querySelector('#examCount')?.value||10));if(a==='examSubject')runExam(document.querySelector('#examSubject')?.value,Number(document.querySelector('#examSubjectCount')?.value||10),false,document.querySelector('#examTopic')?.value||null);if(a==='examTimed')runExam(null,10,true);if(a==='mixed')mixed();if(a==='daily')dailyStart();if(a==='timedLesson'){const l=getLesson(state.lesson);if(l)quiz(l.questions.map((q,i)=>({qid:`${l.id}:${i}`,l:l.id,i,q})),'timed')}if(a==='theme'){state.theme=state.theme==='dark'?'light':'dark';localStorage.setItem('radiolab.theme',state.theme);render()}if(a==='refreshLeaderboard')loadLeaderboard();if(a==='refreshChallenge')refreshChallenge();if(a==='subjectTest')startSubject();if(a==='selectedTest')selectedTest();if(a==='lessonTest')startLesson();if(a==='errorsTest')errorsTest();if(a==='correct'){if(state.mode==='timed'&&Date.now()-state.startedAt>60000)notify('Se ha agotado el tiempo de 60 segundos: el test no se ha puntuado.');else correct()}if(a==='again')quiz([...state.test],state.mode);if(a==='leaveTest')go('subjects');if(a==='goMistakes')go('mistakes');if(a==='bookNext'){state.bookPage=Math.min((getLesson(state.lesson)?.sections||[]).length+1,state.bookPage+1);render();window.scrollTo?.(0,0)}if(a==='bookPrev'){state.bookPage=Math.max(0,state.bookPage-1);render();window.scrollTo?.(0,0)}if(a==='bookContents'){state.bookPage=0;render();window.scrollTo?.(0,0)}if(a==='flash'){state.flash=0;state.flipped=false;go('flash')}if(a==='flip'){state.flipped=!state.flipped;render()}if(a==='nextFlash'){state.flash++;state.flipped=false;render()}if(a==='prevFlash'){state.flash=Math.max(0,state.flash-1);state.flipped=false;render()}if(a==='logout'&&supa){stopForum();await supa.auth.signOut();go('home')}if(a==='resetpass'&&supa){const email=prompt('¿A qué correo enviamos el enlace de recuperación?');if(email){const r=await supa.auth.resetPasswordForEmail(email,{redirectTo:location.origin+location.pathname});notify(r.error?'Error: '+r.error.message:'Revisa tu correo para recuperar la contraseña.')}}}
render();
let dailyPageDate=dailyLocalDate();
setInterval(()=>{
 const now=dailyLocalDate();
 if(now!==dailyPageDate){dailyPageDate=now;if(state.page==='daily'||state.page==='home')render();}
},30000);
document.addEventListener('visibilitychange',()=>{
 if(document.visibilityState==='visible'&&state.page==='daily'&&dailyPageDate!==dailyLocalDate()){dailyPageDate=dailyLocalDate();render();}
});
if(configured){
 import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.49.10/+esm').then(({createClient})=>{
  supa=createClient(SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY);
  supa.auth.onAuthStateChange(event=>{if(event==='PASSWORD_RECOVERY')go('reset');setTimeout(()=>loadMe().catch(console.error),0)});
  loadMe().catch(err=>{console.error('Error al iniciar sesión',err);state.notice='No se pudo cargar el perfil; el temario está disponible.';render();});
 }).catch(err=>{
  connectionError='El servicio de cuentas no está disponible en este navegador. Abre Safari para iniciar sesión.';
  console.error('Carga del servicio de cuentas',err);
  render();
 });
}
