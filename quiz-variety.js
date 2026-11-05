import {generatePractice} from './practice-problems.js';
import {generateVisualQuestions} from './visual-questions.js';
// Selección variada con corrección inalterada para los modos de Radiolab.
export const stableHash=(s)=>{let h=2166136261;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0};
export function rng(seed){let n=stableHash(seed)||123456789;return ()=>{n+=0x6D2B79F5;let t=n;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return ((t^t>>>14)>>>0)/4294967296}}
export function shuffled(items,random=Math.random){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
export function normalizedStem(q){return String(q?.[0]||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim()}
export function uniqueBank(items){const found=new Set();return items.filter(item=>{const q=item.q||item;const stem=normalizedStem(q),answers=(q?.[1]||[]).map(x=>String(x).trim().toLowerCase()).sort().join('|');const signature=stem+'||'+answers+'||'+(q?.[5]?.target||'');if(!stem||found.has(signature))return false;found.add(signature);return true})}
export function varyQuestion(question,random=Math.random,form=0){
 const q=[...question];if(!Array.isArray(q[1])||q[1].length<2||!Number.isInteger(q[2]))return q;
 const order=shuffled(q[1].map((value,i)=>({value,i})),random);
 q[1]=order.map(x=>x.value);q[2]=order.findIndex(x=>x.i===question[2]);
 if(Array.isArray(question[4]))q[4]=order.map(x=>question[4][x.i]);
 // Reformular solo cuando sea inequívocamente equivalente; nunca añadir muletillas.
 const text=String(question[0]||'').trim();
 q[0]=text;
 if(form%3===1){
   if(/^¿Qué concepto corresponde a esta descripción\? «(.+)»$/s.test(text))q[0]=text.replace(/^¿Qué concepto corresponde a esta descripción\? «(.+)»$/s,'¿Qué término se define así? «$1»');
   else if(/^¿Qué afirmación describe correctamente «(.+)»\?$/s.test(text))q[0]=text.replace(/^¿Qué afirmación describe correctamente «(.+)»\?$/s,'¿Cuál es la definición correcta de «$1»?');
   else if(/^¿Qué significa «(.+)»\?$/s.test(text))q[0]=text.replace(/^¿Qué significa «(.+)»\?$/s,'¿A qué se refiere «$1»?');
 }else if(form%3===2){
   if(/^¿Qué concepto corresponde a esta descripción\? «(.+)»$/s.test(text))q[0]=text.replace(/^¿Qué concepto corresponde a esta descripción\? «(.+)»$/s,'Identifica el concepto: «$1»');
   else if(/^¿Qué afirmación describe correctamente «(.+)»\?$/s.test(text))q[0]=text.replace(/^¿Qué afirmación describe correctamente «(.+)»\?$/s,'¿Cómo se define «$1»?');
   else if(/^¿Qué significa «(.+)»\?$/s.test(text))q[0]=text.replace(/^¿Qué significa «(.+)»\?$/s,'¿Cuál es el significado de «$1»?');
 }
 return q;
}
export function drawVaried(items,count,historyKey,options={}){
 const distinct=uniqueBank(items),random=rng(options.seed??(Date.now()+'|'+Math.random()));
 let history=[];try{history=JSON.parse(localStorage.getItem(historyKey)||'[]')}catch{}
 const recent=new Set(history.slice(-Math.max(20,count*5)));
 const mixed=shuffled(distinct,random);
 const pool=[...mixed.filter(item=>!recent.has(item.qid||item.key)),...mixed.filter(item=>recent.has(item.qid||item.key))];
 const result=[],lessons=new Set();
 for(const x of pool){const lesson=x.l||String(x.key||'').split(':')[0];if(!lessons.has(lesson)){result.push(x);lessons.add(lesson)}if(result.length>=count)break}
 for(const x of pool){if(result.length>=count)break;if(!result.includes(x))result.push(x)}
 if(options.remember!==false){try{const ids=result.map(x=>x.qid||x.key);localStorage.setItem(historyKey,JSON.stringify([...history,...ids].slice(-500)))}catch{}}
 return result;
}

/**
 * Preguntas de comprensión creadas exclusivamente a partir de parejas
 * concepto-definición que ya existen en los apuntes del tema.
 * No inventa datos nuevos ni usa respuestas de otros temas como distractores.
 */
export function augmentLessons(lessons){
 return lessons.map(lesson=>{
  const pts=Array.isArray(lesson.sections)&&lesson.sections.length?lesson.sections:(Array.isArray(lesson.points)?lesson.points:[]);
  const eligible=pts.filter(p=>Array.isArray(p)&&typeof p[0]==='string'&&typeof p[1]==='string'&&p[0].trim().length>=4&&p[0].trim().length<=90&&p[1].trim().length>=20&&p[1].trim().length<=190);
  const seen=new Set();
  const distinct=eligible.filter(p=>{const k=p[0].toLocaleLowerCase('es').trim();if(seen.has(k))return false;seen.add(k);return true});
  const extra=[];
  if(distinct.length>=4){
   for(let i=0;i<distinct.length;i++){
    const item=distinct[i],wrong=distinct.filter((_,j)=>j!==i);
    const idxs=shuffled(wrong,rng(lesson.id+'concept'+i)).slice(0,3);
    const conceptOptions=[item,...idxs].map(x=>x[0].trim());
    const answerOptions=[item,...idxs].map(x=>x[1].trim());
    const description=item[1].trim();
    extra.push([
      '¿Qué concepto corresponde a esta descripción? «'+description+'»',
      conceptOptions,0,
      'El concepto correcto es «'+item[0].trim()+'»: '+description
    ]);
    extra.push([
      '¿Qué afirmación describe correctamente «'+item[0].trim()+'»?',
      answerOptions,0,
      description
    ]);
   }
  }
  return {...lesson,questions:[...(lesson.questions||[]),...extra,...generatePractice(lesson),...generateVisualQuestions(lesson)]};
 });
}
