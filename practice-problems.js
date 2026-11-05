/* Ejercicios originales de cálculo y casos clínicos de práctica. Todos los resultados se calculan, no se eligen a mano. */
const rng=(input)=>{let n=2166136261;for(const c of String(input)){n^=c.charCodeAt(0);n=Math.imul(n,16777619)}return ()=>{n=(n+0x6D2B79F5)|0;let t=Math.imul(n^(n>>>15),1|n);t^=t+Math.imul(t^(t>>>7),61|t);return ((t^(t>>>14))>>>0)/4294967296}};
const shuffled=(items,random=Math.random)=>{const out=[...items];for(let i=out.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[out[i],out[j]]=[out[j],out[i]]}return out};
const eye=['','no abre los ojos','abre los ojos únicamente ante un estímulo doloroso','abre los ojos al hablarle','abre los ojos espontáneamente'];
const verbal=['','no emite respuesta verbal','emite sonidos incomprensibles','pronuncia palabras inapropiadas','responde, pero está confundido o desorientado','responde de forma orientada'];
const motor=['','no presenta respuesta motora','responde con extensión anormal','responde con flexión anormal','retira la extremidad ante un estímulo doloroso','localiza el origen del estímulo doloroso','obedece órdenes motoras'];
const styles=[
 p=>'En urgencias se valora a una persona que '+p+'. ¿Qué puntuación total tiene en la escala de Glasgow?',
 p=>'Durante la valoración neurológica se observa que '+p+'. Calcula el total de Glasgow.',
 p=>'Un paciente presenta estas respuestas: '+p+'. ¿Cuál es la suma de los componentes E + V + M?',
 p=>'Caso clínico: '+p+'. ¿Qué resultado corresponde a la escala de coma de Glasgow?'
];
const round=n=>Number(n.toFixed(2)),fmt=n=>Number(n.toFixed(2)).toLocaleString('es-ES',{maximumFractionDigits:2});
function options(correct,unit,random,min=0,max=Infinity){
 const values=[round(correct)],candidates=[correct*0.5,correct*2,correct*1.5,correct*0.75,correct+1,correct+2,correct+3,correct-1,correct-2,correct-3,correct+4,correct-4];
 for(const n of shuffled(candidates,random)){const v=round(n);if(v>=min&&v<=max&&Math.abs(v-correct)>0.00001&&!values.includes(v))values.push(v);if(values.length===4)break}
 for(let i=1;values.length<4;i++){const v=round(correct+i*.25);if(v<=max&&!values.includes(v))values.push(v)}
 return {choices:values.map(x=>fmt(x)+(unit?' '+unit:'')),answer:0};
}
function buildGlasgow(lesson){
 const random=rng('glasgow:'+lesson.id),cases=[];
 for(let e=1;e<=4;e++)for(let v=1;v<=5;v++)for(let m=1;m<=6;m++)cases.push({e,v,m});
 return shuffled(cases,random).map((c,i)=>{
  const total=c.e+c.v+c.m,desc=[eye[c.e],verbal[c.v],motor[c.m]].join('; '),style=styles[i%styles.length];
  const negatives=shuffled(Array.from({length:13},(_,j)=>j+3).filter(x=>x!==total),rng('glasgow:choices'+i)).slice(0,3);
  const values=[total,...negatives];
  return [style(desc.charAt(0).toLowerCase()+desc.slice(1)),values.map(n=>n+' puntos'),0,
    'Glasgow = apertura ocular ('+c.e+') + respuesta verbal ('+c.v+') + respuesta motora ('+c.m+') = '+total+'/15. Se registra E'+c.e+' V'+c.v+' M'+c.m+'.'];
 });
}
function problem(family,step,random){
 const pick=a=>a[Math.floor(random()*a.length)],n=(a,b)=>a+Math.floor(random()*(b-a+1));
 let label='',choices,answer,explanation,unit='',min=0,max=Infinity;
 if(family==='distance'){
  const r1=pick([1,2,3]),factor=pick([2,3,4]),rate2=n(2,22),rate1=rate2*factor*factor,r2=r1*factor;
  const intro=step%2===0?'A una distancia de '+r1+' m de una fuente aproximadamente puntual se mide una tasa de dosis de '+rate1+' µSv/h.':'Un técnico registra '+rate1+' µSv/h a '+r1+' m de una fuente puntual, sin modificar el blindaje.';
  label=intro+' ¿Cuál es la tasa esperada a '+r2+' m, suponiendo la ley del inverso del cuadrado?';
  answer=rate2;unit='µSv/h';
  explanation='Ley del inverso del cuadrado: tasa₂ = tasa₁ × (d₁/d₂)² = '+rate1+' × ('+r1+'/'+r2+')² = '+fmt(answer)+' µSv/h. Se asume fuente puntual ideal y ausencia de cambios en la atenuación.';
 }else if(family==='time'){
  const rate=pick([6,12,18,24,30,36]),mins=pick([10,15,20,30,40,45,60]),dose=round(rate*mins/60);
  label=(step%2?'En una zona de trabajo la tasa de dosis es constante e igual a ':'Una persona permanece junto a una fuente con tasa de dosis constante de ')+rate+' µSv/h durante '+mins+' minutos. ¿Qué dosis aproximada acumula?';
  answer=dose;unit='µSv';
  explanation='Dosis = tasa de dosis × tiempo. Convierte minutos a horas: '+mins+'/60 h. D = '+rate+' µSv/h × ('+mins+'/60 h) = '+fmt(dose)+' µSv.';
 }else if(family==='decay'){
  const half=pick([2,4,6,8,12,24]),cycles=n(1,4),start=pick([128,256,384,512,640,768]),after=start/(2**cycles),elapsed=half*cycles;
  label='Una muestra radiactiva tiene inicialmente '+start+' MBq y un semiperiodo físico de '+half+' horas. Suponiendo solo decaimiento físico, ¿cuánta actividad conserva tras '+elapsed+' horas?';
  answer=after;unit='MBq';
  explanation='A = A₀ × (1/2)^(t/T½). En '+elapsed+' h transcurren '+cycles+' semiperiodos. A = '+start+' × (1/2)^'+cycles+' = '+fmt(after)+' MBq.';
 }else if(family==='shield'){
  const halves=n(1,5),base=pick([64,128,256,384,512,768]),thick=pick([2,3,4,5]),final=base/(2**halves);
  label='Un blindaje tiene una capa hemirreductora (CHR) de '+thick+' mm para una radiación determinada. Si la intensidad inicial es '+base+' unidades y se usan '+(thick*halves)+' mm del mismo material, ¿qué intensidad queda en este modelo ideal?';
  answer=final;unit='unidades';
  explanation='Número de capas hemirreductoras = '+(thick*halves)+'/'+thick+' = '+halves+'. Intensidad final = I₀ × (1/2)^'+halves+' = '+base+' / '+(2**halves)+' = '+fmt(final)+' unidades. Es una simplificación ideal.';
 }else if(family==='absorbed'){
  const mass=pick([1,2,4,5,8]),value=n(2,18),energy=value*mass;
  label='Durante una irradiación se depositan '+energy+' mJ de energía en una masa de '+mass+' kg. ¿Cuál es la dosis absorbida en mGy?';
  answer=value;unit='mGy';
  explanation='Dosis absorbida D = energía/masa. Como 1 mJ/kg = 1 mGy, D = '+energy+' mJ / '+mass+' kg = '+value+' mGy.';
 }else if(family==='equivalent'){
  const dose=pick([1,2,3,4,5,6,8,10,12]),w=pick([1,2,5,10]),result=dose*w;
  label='Ejercicio teórico: un tejido recibe '+dose+' mGy de dosis absorbida por una radiación con factor de ponderación wR = '+w+' (valor facilitado en el enunciado). ¿Cuál es la dosis equivalente?';
  answer=result;unit='mSv';
  explanation='H = D × wR. H = '+dose+' mGy × '+w+' = '+result+' mSv. Se usa exclusivamente el factor de ponderación proporcionado para el ejercicio; no se está asignando ese valor a un tipo de radiación concreto.';
 }else return null;
 const o=options(answer,unit,random,min,max);
 return [label,o.choices,o.answer,explanation];
}
const categories=[
 ['distance',/distancia|inverso|exposici[oó]n|protecci[oó]n|blindaje|tasa|dosis/i],
 ['time',/tiempo|dosis|dosimetr[ií]a|exposici[oó]n|protecci[oó]n/i],
 ['decay',/semiperiodo|decaimiento|actividad|desintegraci[oó]n|radioactiv/i],
 ['shield',/blindaje|hemirred|atenuaci[oó]n|protecci[oó]n/i],
 ['absorbed',/dosis absorbida|magnitudes|energ[ií]a depositada/i],
 ['equivalent',/dosis equivalente|magnitudes|ponderaci[oó]n|dosis efectiva/i]
];
export function hasPractice(lesson){
 const t=String(lesson?.title||'');
 if(lesson?.subject==='atencion')return /glasgow|nivel de consciencia/i.test(t);
 if(lesson?.subject==='proteccion')return categories.some(x=>x[1].test(t));
 return false;
}
export function generatePractice(lesson){
 const title=String(lesson?.title||'');
 if(lesson?.subject==='atencion'&&/glasgow|nivel de consciencia/i.test(title))return buildGlasgow(lesson);
 if(lesson?.subject!=='proteccion')return [];
 const applicable=categories.filter(x=>x[1].test(title)).map(x=>x[0]);
 if(!applicable.length)return [];
 const result=[];
 for(const family of applicable){
  for(let i=0;i<36;i++){
   const q=problem(family,i,rng('radiolab-practice:'+lesson.id+':'+family+':'+i));
   if(q)result.push(q);
  }
 }
 return result;
}
