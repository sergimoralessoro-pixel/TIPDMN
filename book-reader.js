/* Lector de libros de Radiolab: hojas, navegación, fórmulas, tablas y animación didáctica. */
import {topicFigure} from './topic-illustrations.js';
import {topicRealMedia} from './real-media.js';
const e=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function underlinedText(text){
  const input=String(text||'');
  const terms=['plano sagital','plano coronal','plano axial','decúbito supino','decúbito prono','aurícula derecha','aurícula izquierda','ventrículo derecho','ventrículo izquierdo','arterias pulmonares','venas pulmonares','válvula tricúspide','válvula mitral','circulación pulmonar','circulación sistémica','etapa física','etapa química','etapa biológica','acción directa','acción indirecta','radicales libres','dosis absorbida','dosis efectiva','actividad','distancia','tiempo','blindaje','fotoeléctrico','Compton','semiperiodo','Becquerel','Gray','Sievert'];
  let pattern=new RegExp('('+terms.map(x=>x.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|')+')','gi');
  return input.split(pattern).map((x,i)=>i%2===1?'<strong class="book-underline">'+e(x)+'</strong>':e(x)).join('');
}
function paragraphs(p){
 const raw=String(p||'').trim();
 if(!raw)return '';
 // Apuntes de glosario: cada término y su definición pasan a puntos separados.
 const re=/(?:^|(?<=\. )|(?<=\? )|(?<=\! ))([A-ZÁÉÍÓÚÑ][A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9()\/\- ]{2,43}):\s/g;
 const matches=[...raw.matchAll(re)];
 if(matches.length>=2){
   const intro=raw.slice(0,matches[0].index).trim();
   const lead=intro?intro.split(/(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚÑ])/).map(t=>'<p>'+underlinedText(t)+'</p>').join(''):'';
   const bullets=matches.map((m,i)=>{
     const valueStart=m.index+m[0].length;
     const valueEnd=i+1<matches.length?matches[i+1].index:raw.length;
     return '<li><strong class="book-underline">'+e(m[1])+':</strong> '+underlinedText(raw.slice(valueStart,valueEnd).trim())+'</li>';
   }).join('');
   return lead+'<ul class="book-study-points">'+bullets+'</ul>';
 }
 // Texto narrativo: punto y aparte cada dos frases para que se pueda estudiar.
 const chunks=raw.split(/(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚÑ0-9])/);
 let groups=[];for(let i=0;i<chunks.length;i+=2)groups.push(chunks.slice(i,i+2).join(' '));
 return groups.map(x=>'<p>'+underlinedText(x)+'</p>').join('');
}
function heartAnimation(){
 return '<figure class="heart-chart"><div class="meta">🫀 ANIMACIÓN DE ESTUDIO · CIRCULACIÓN SANGUÍNEA</div><svg viewBox="0 0 640 350" role="img" aria-label="Flujo sanguíneo: venas cavas a aurícula derecha y ventrículo derecho, arterias pulmonares a pulmones, venas pulmonares a aurícula izquierda, ventrículo izquierdo y aorta" preserveAspectRatio="xMidYMid meet">'+
 '<defs><marker id="heartArrowB" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10Z" fill="#5fb9fa"/></marker><marker id="heartArrowR" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10Z" fill="#fd7984"/></marker></defs>'+
 '<g class="hb-heart"><path d="M290 124C257 89 207 102 205 147C203 193 254 234 320 279C386 234 437 193 435 147C433 102 383 89 350 124L320 155Z" fill="#dd5966" opacity=".72" stroke="#ffd4d6" stroke-width="4"/>'+
 '<rect x="258" y="141" width="54" height="48" rx="12" fill="#317caf" stroke="#d6f4ff" stroke-width="2"/><rect x="258" y="197" width="54" height="49" rx="12" fill="#236aa2" stroke="#d6f4ff" stroke-width="2"/><rect x="329" y="141" width="54" height="48" rx="12" fill="#ea9aa2" stroke="#fff4f4" stroke-width="2"/><rect x="329" y="197" width="54" height="49" rx="12" fill="#f77d84" stroke="#fff4f4" stroke-width="2"/>'+
 '<g fill="white" font-size="16" font-weight="800" text-anchor="middle"><text x="285" y="173">AD</text><text x="285" y="229">VD</text><text x="356" y="173">AI</text><text x="356" y="229">VI</text></g></g>'+
 '<g font-size="14" font-weight="750" fill="#b1e9ff"><text x="20" y="46">VENAS CAVAS</text><text x="18" y="95">SANGRE POBRE EN O₂</text><text x="20" y="315">PULMONES</text></g><g font-size="14" font-weight="750" fill="#ffd1d4"><text x="495" y="45">AORTA</text><text x="445" y="92">SANGRE RICA EN O₂</text><text x="481" y="315">TEJIDOS</text></g>'+
 '<path id="blueHeartFlow" d="M130 50 L186 50 Q213 50 213 90 L213 163 L257 163 L283 163 L283 219 Q277 271 215 271 L96 271 L96 304" fill="none" stroke="#62baff" stroke-width="9" stroke-linecap="round" stroke-dasharray="15 12" marker-end="url(#heartArrowB)" class="flow-blue"/>'+
 '<path id="redHeartFlow" d="M105 304 Q105 329 171 329 L457 329 Q470 329 470 276 L470 164 L383 164 L356 164 L356 220 Q356 269 444 268 L545 268 L545 93" fill="none" stroke="#ff8f9b" stroke-width="9" stroke-linecap="round" stroke-dasharray="15 12" marker-end="url(#heartArrowR)" class="flow-red"/>'+
 '<g fill="#d5f1ff" font-size="12"><text x="105" y="252">Arteria pulmonar</text><text x="410" y="246">Venas pulmonares</text><text x="255" y="302">Intercambio de O₂ en pulmones</text></g>'+
 '</svg><div class="heart-legend"><span><i class="blue-dot"></i> Sin oxigenar: cuerpo → corazón derecho → pulmones</span><span><i class="red-dot"></i> Oxigenada: pulmones → corazón izquierdo → cuerpo</span></div><figcaption>Diagrama simplificado del recorrido de la sangre. El flujo se representa con líneas animadas; la anatomía no está a escala.</figcaption></figure>';
}
function radiationVisual(l,page){if(l.subject!=='proteccion')return '';const slide=(l.formulas||[]).length;const charts=(l.tables||[]).length;return (slide||charts)?'<div class="book-info-chip">∑ '+slide+' fórmulas · ▦ '+charts+' tablas al final del tema</div>':''}
function extras(l){
 let h='<div class="book-paper extras"><div class="book-eyebrow">ÚLTIMA HOJA · FÓRMULAS, TABLAS Y REPASO</div><h2>📐 Fórmulas y tablas para estudiar</h2>';
 if(l.formulas?.length){h+='<h3>Fórmulas esenciales</h3>'+l.formulas.map(f=>'<section class="book-equation"><b>'+e(f[0])+'</b><div class="equation">'+e(f[1])+'</div><p>'+e(f[2])+'</p></section>').join('')}
 if(l.tables?.length){const datasets=Array.isArray(l.tables[0]?.[0])?l.tables:[l.tables];h+='<h3>Tablas de comparación</h3>'+datasets.map(t=>'<div class="book-table-scroll"><table class="book-table"><thead><tr>'+t[0].map(c=>'<th>'+e(c)+'</th>').join('')+'</tr></thead><tbody>'+t.slice(1).map(row=>'<tr>'+row.map(c=>'<td>'+e(c)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>').join('')}
 if(!l.formulas?.length&&!l.tables?.length)h+='<p>Repasa los conceptos principales y pon a prueba tu comprensión.</p>';
 h+='<div class="book-recall"><strong>💡 Recuerda para el examen</strong><p>'+e(l.tip||l.summary||'Repasa los términos clave.')+'</p></div></div>';return h;
}
export function renderStudyBook(l,current){
 const sections=l.sections||l.points||[];
 const total=sections.length+2;
 const page=Math.max(0,Math.min(current,total-1));
 const pct=Math.round((page+1)/total*100);
 let content='';
 if(page===0)content='<div class="book-paper book-cover"><div class="book-eyebrow">🩻 RADIO LAB · LIBRO DIGITAL DE ESTUDIO</div><div class="book-cover-mark">✦</div><h1>'+e(l.title)+'</h1><p class="book-lede">'+e(l.intro)+'</p>'+radiationVisual(l,page)+'<div class="book-toc"><h3>Índice del capítulo</h3>'+sections.map(([title],i)=>'<button type="button" class="book-toc-link" data-page-select="'+(i+1)+'"><span>'+e(title)+'</span><b>p. '+(i+2)+'</b></button>').join('')+'</div>'+(l.subject==='anatomia'&&l.id==='anatomia-tema-7'?heartAnimation():'')+'<p class="book-small">'+e(l.sourceLabel||'Material de repaso original')+'</p>'+(l.sourceUrl?'<p class="book-small"><a href="'+e(l.sourceUrl)+'" target="_blank" rel="noopener noreferrer">📎 Consultar PDF original en Google Drive</a></p>':'')+'</div>';
 else if(page===total-1)content=extras(l);
 else{const [title,p,tip]=sections[page-1];content='<article class="book-paper"><div class="book-eyebrow">CAPÍTULO · '+e(l.title)+'</div><h2>'+e(title)+'</h2>'+(topicRealMedia(l,title)||topicFigure(l,title))+'<div class="book-reading">'+paragraphs(p)+'</div>'+(tip?'<aside class="book-recall"><strong>💡 Para memorizar</strong><p>'+e(tip)+'</p></aside>':'')+(l.subject==='anatomia'&&l.id==='anatomia-tema-7'&&(page===4||page===5||page===6)?heartAnimation():'')+'</article>';}
 return '<div class="book-shell"><div class="book-topline"><span>📖 LIBRO INTERACTIVO</span><span>Página '+(page+1)+' / '+total+'</span></div><div class="book-track"><div style="width:'+pct+'%"></div></div>'+content+'<nav class="book-controls" aria-label="Navegación por las páginas"><button class="btn" data-action="bookPrev" '+(page===0?'disabled':'')+'>← Hoja anterior</button><button class="btn ghost" data-action="bookContents">☰ Índice</button><button class="btn primary" data-action="bookNext" '+(page===total-1?'disabled':'')+'>Siguiente hoja →</button></nav><div class="book-bottom-note">Puedes consultar el índice o pasar las hojas. La última reúne las tablas, fórmulas y claves del examen.</div></div>';
}
