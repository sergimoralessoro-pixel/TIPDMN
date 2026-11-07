/* Láminas vectoriales vinculadas exclusivamente a preguntas de identificación visual. */
import {additionalVisualQuestions,additionalVisualMedia} from './visual-extended.js';
const escapeHtml=t=>String(t??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
const boneTargets=[
 {target:'epifisis',answer:'Epífisis',x:142,y:62},
 {target:'diafisis',answer:'Diáfisis',x:160,y:162},
 {target:'medula',answer:'Cavidad medular',x:158,y:202},
 {target:'periostio',answer:'Periostio',x:122,y:154},
];
const shieldTargets=[
 {target:'source',answer:'Fuente de radiación',x:85,y:125},
 {target:'barrier',answer:'Blindaje protector',x:252,y:120},
 {target:'dosimeter',answer:'Dosímetro personal',x:397,y:137},
 {target:'distance',answer:'Distancia a la fuente',x:180,y:204}
];
const glTargets=[
 {target:'eye',answer:'Respuesta ocular',x:104,y:120},
 {target:'verbal',answer:'Respuesta verbal',x:262,y:120},
 {target:'motor',answer:'Respuesta motora',x:420,y:120}
];
const lungsTargets=[
 {target:'trachea',answer:'Tráquea',x:260,y:70},
 {target:'bronchi',answer:'Bronquios principales',x:260,y:140},
 {target:'rightlung',answer:'Pulmón derecho',x:177,y:175},
 {target:'leftlung',answer:'Pulmón izquierdo',x:350,y:175}
];
const labTargets=[
 {target:'tube',answer:'Tubo de muestra',x:114,y:153},
 {target:'microscope',answer:'Microscopio',x:284,y:150},
 {target:'petri',answer:'Placa de cultivo',x:434,y:205}
];
const englishTargets=[
 {target:'past',answer:'Pasado',x:110,y:165},
 {target:'present',answer:'Presente',x:270,y:165},
 {target:'future',answer:'Futuro',x:430,y:165}
];
const groups={bone:boneTargets,shield:shieldTargets,glasgow:glTargets,lungs:lungsTargets,lab:labTargets,english:englishTargets};
export function generateVisualQuestions(lesson){
 const title=String(lesson?.title||'').toLocaleLowerCase('es'),sub=lesson?.subject;
 let kind=null;
 if(sub==='anatomia'&&/locomotor|huesos|[oó]seos|hueso largo|esqueleto/i.test(title))kind='bone';
 else if(sub==='anatomia'&&/respiratorio|pulmones|v[ií]as respiratorias/i.test(title))kind='lungs';
 else if(sub==='proteccion'&&/protecci[oó]n|blindaje|distancia|salas de radiodiagn[oó]stico|exposici[oó]n/i.test(title))kind='shield';
 else if(sub==='atencion'&&/glasgow|nivel de consciencia/i.test(title))kind='glasgow';
 else if(sub==='forense'&&/laboratorio|muestra|microbiolog|cultivo|an[aá]lisis|forense/i.test(title))kind='lab';
 else if(sub==='ingles'&&/pasado|presente|futuro|past|present|future|verbos|tiempos verbales/i.test(title))kind='english';
 if(!kind)return additionalVisualQuestions(lesson);
 const list=groups[kind];
 return [...list.map((item,i)=>[
  kind==='bone'?'¿Qué parte del hueso señala la flecha roja?':kind==='lungs'?'¿Qué estructura anatómica está señalada?':kind==='shield'?'¿Qué elemento de protección radiológica está señalado?':kind==='glasgow'?'¿Qué componente de la escala de Glasgow está señalado?':kind==='lab'?'¿Qué instrumento o material de laboratorio está señalado?':'¿Qué momento de la línea temporal está señalado?',
  list.map(x=>x.answer),i,
  'La flecha señala '+item.answer.toLowerCase()+'. Observa su posición en el esquema.',
  null,{kind,target:item.target}
 ]),...additionalVisualQuestions(lesson)];
}
function arrow(point){
 return '<circle cx="'+point.x+'" cy="'+point.y+'" r="7" fill="#ff5656" stroke="#fff" stroke-width="2"/><path d="M'+(point.x+86)+' '+(point.y-70)+' L'+(point.x+12)+' '+(point.y-10)+'" fill="none" stroke="#ff5656" stroke-width="6" stroke-linecap="round" marker-end="url(#tip)"/>';
}
function skeleton(){
 return '<g transform="translate(0 0)"><path d="M135 40Q105 26 96 56Q88 81 112 97L119 121L118 228Q92 251 107 268Q124 291 148 275Q174 291 190 267Q203 246 178 228L179 121L186 97Q211 74 197 50Q185 26 157 40Z" fill="#efdab6" stroke="#d8b681" stroke-width="6"/><path d="M137 112Q149 106 161 112L160 234Q148 227 136 234Z" fill="#ae5a60" opacity=".78"/><path d="M119 121L118 227M179 121L178 227" stroke="#f5f0dd" stroke-width="7"/><path d="M119 155L114 171" stroke="#d59255" stroke-width="7"/></g>';
}
function shield(){
 return '<g><circle cx="85" cy="125" r="39" fill="#e2b25f" stroke="#ffdf96" stroke-width="4"/><text x="85" y="139" text-anchor="middle" font-size="38">☢</text><path d="M130 125H211M277 125H349" stroke="#f3ce77" stroke-width="5" stroke-dasharray="11 9"/><rect x="217" y="38" width="70" height="184" rx="5" fill="#85939e" stroke="#d3e0e4" stroke-width="5"/><g fill="#bed3d9"><rect x="231" y="51" width="42" height="160" rx="3"/></g><circle cx="404" cy="79" r="28" fill="#a5d7dc"/><path d="M366 125Q404 94 444 125L459 251H349Z" fill="#4e91af"/><path d="M370 157H438" stroke="#dbf7f7" stroke-width="7"/><rect x="385" y="116" width="25" height="39" rx="5" fill="#f8cc74" stroke="#fff0a1" stroke-width="3"/><line x1="93" y1="210" x2="216" y2="210" stroke="#80d5d9" stroke-width="5" stroke-dasharray="8 6"/><path d="M92 205L92 215M216 205L216 215" stroke="#80d5d9" stroke-width="4"/></g>';
}
function glasgow(){
 return '<g><circle cx="104" cy="137" r="65" fill="#1a5474" stroke="#76c6eb" stroke-width="4"/><path d="M63 137Q104 97 145 137Q104 177 63 137" fill="#d4f5fc" stroke="#fff" stroke-width="4"/><circle cx="104" cy="137" r="18" fill="#2d6e99"/><circle cx="104" cy="137" r="8" fill="#122a42"/><circle cx="262" cy="137" r="65" fill="#1a5474" stroke="#76c6eb" stroke-width="4"/><path d="M218 121Q243 99 267 115Q292 99 307 121V160Q274 179 240 156Z" fill="#dcf5fa" stroke="#8de7f7" stroke-width="3"/><path d="M244 135H284" stroke="#1b6d88" stroke-width="5"/><circle cx="420" cy="137" r="65" fill="#1a5474" stroke="#76c6eb" stroke-width="4"/><path d="M402 181V119Q402 109 410 107Q420 107 420 119V96Q420 88 429 88Q439 89 439 97V125Q443 111 453 117Q463 124 452 159L435 181Z" fill="#dcf5fa" stroke="#fff" stroke-width="4"/></g>';
}
function lungs(){
 return '<g><path d="M245 33H275V116L248 143M275 116L306 143" fill="none" stroke="#a9dbea" stroke-width="21" stroke-linejoin="round"/><path d="M226 102Q186 78 145 133Q121 166 118 232Q149 267 224 230Z" fill="#d887a7" stroke="#f3b1cc" stroke-width="5"/><path d="M292 102Q340 76 376 132Q409 169 403 230Q369 266 299 230Z" fill="#d887a7" stroke="#f3b1cc" stroke-width="5"/><path d="M246 141L201 174M271 141L328 173" stroke="#a9dbea" stroke-width="13" stroke-linecap="round"/></g>';
}
function laboratory(){
 return '<g><rect x="73" y="80" width="83" height="155" rx="18" fill="#9fc7d6" stroke="#e1f4f7" stroke-width="5"/><path d="M83 166H146V218H83Z" fill="#cf657d"/><rect x="73" y="67" width="83" height="26" rx="6" fill="#68c4cf"/><path d="M266 60L292 60L292 129L326 157L314 171L263 139Z" fill="#88b5d5" stroke="#d3e6f8" stroke-width="5"/><rect x="281" y="143" width="67" height="25" rx="8" fill="#93c9dc"/><path d="M282 155C259 174 266 207 295 219L322 219" fill="none" stroke="#7fbed2" stroke-width="16"/><rect x="247" y="221" width="123" height="13" rx="5" fill="#d0e4ed"/><ellipse cx="435" cy="199" rx="67" ry="34" fill="#b1e2c6" stroke="#d9f3e6" stroke-width="6"/><ellipse cx="435" cy="195" rx="54" ry="25" fill="#579e7e"/><circle cx="417" cy="194" r="6" fill="#f6d27c"/><circle cx="444" cy="203" r="8" fill="#d8f0b2"/><circle cx="460" cy="188" r="5" fill="#ffd98c"/></g>';
}
function timeline(){
 return '<g><path d="M58 165H490" stroke="#8abbd5" stroke-width="9" stroke-linecap="round"/><path d="M486 150L508 165L486 180" fill="none" stroke="#8abbd5" stroke-width="8" stroke-linecap="round"/><circle cx="110" cy="165" r="34" fill="#2d7090" stroke="#a6d8ec" stroke-width="6"/><circle cx="270" cy="165" r="34" fill="#2d7090" stroke="#a6d8ec" stroke-width="6"/><circle cx="430" cy="165" r="34" fill="#2d7090" stroke="#a6d8ec" stroke-width="6"/><text x="270" y="253" fill="#d7edf4" text-anchor="middle" font-size="15">DIRECCIÓN DEL TIEMPO →</text></g>';
}
export function visualQuestionMedia(q){
 const extra=additionalVisualMedia(q);if(extra)return extra;
 const m=q?.[5];if(!m||!groups[m.kind])return '';
 const found=groups[m.kind].find(x=>x.target===m.target);if(!found)return '';
 const base={bone:skeleton,shield,glasgow,lungs,lab:laboratory,english:timeline}[m.kind]();
 const name={bone:'Esquema de hueso largo',shield:'Esquema de protección y radiación',glasgow:'Componentes de la escala de Glasgow',lungs:'Esquema del aparato respiratorio',lab:'Material de laboratorio',english:'Línea temporal de gramática'}[m.kind];
 return '<figure class="quiz-visual" style="max-width:660px;margin:14px auto 24px;padding:12px;border:1px solid #3e6775;border-radius:18px;background:#092837"><svg role="img" aria-label="'+escapeHtml(name)+' con una flecha roja señalando una estructura" viewBox="0 0 540 310" style="display:block;width:100%;height:auto" xmlns="http://www.w3.org/2000/svg"><defs><marker id="tip" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#ff5656"/></marker></defs>'+base+arrow(found)+'</svg><figcaption style="color:#c7e4ef;font-size:13px;text-align:center">Identifica la estructura indicada por la flecha roja.</figcaption></figure>';
}
