/* Láminas originales del repositorio, sin dependencia de imágenes externas. */
const assetGroups={
 planes:{file:'planes.svg',title:'planos anatómicos',answers:['Plano sagital','Plano frontal o coronal','Plano transversal','Plano oblicuo']},
 articulacion:{file:'articulacion.svg',title:'articulación sinovial',answers:['Cartílago articular','Cápsula articular','Membrana sinovial','Tejido nervioso']},
 oido:{file:'oido.svg',title:'anatomía del oído',answers:['Pabellón auricular','Huesecillos del oído medio','Cóclea','Nervio óptico']},
 atomo:{file:'atomo.svg',title:'estructura del átomo',answers:['Electrón','Protón','Neutrón','Molécula de agua']},
 elisa:{file:'elisa.svg',title:'técnica ELISA',answers:['Pocillo de la microplaca','Anticuerpo de detección','Antígeno','Molécula de ADN']},
 pcr:{file:'pcr.svg',title:'etapas de la PCR',answers:['Desnaturalización','Alineamiento','Extensión','Centrifugación']},
 maslow:{file:'maslow.svg',title:'pirámide de Maslow',answers:['Necesidades fisiológicas','Seguridad','Afiliación','Reconocimiento']},
 dosimetro:{file:'dosimetro.svg',title:'protección radiológica',answers:['Fuente radiactiva','Blindaje','Dosímetro personal','Pulsioxímetro']},
 posiciones:{file:'posiciones.svg',title:'posiciones del paciente',answers:['Decúbito supino','Decúbito prono','Fowler','Bipedestación']}
};
function topicsFor(lesson){
 const sub=lesson.subject, t=String(lesson.title||'').toLowerCase();
 if(sub==='anatomia'){
   if(/localizaci[oó]n|planos|ejes/.test(t))return ['planes'];
   if(/locomotor|articulaci[oó]n|m[uú]scul/.test(t))return ['articulacion'];
   if(/nervioso|sentidos/.test(t))return ['oido'];
 }
 if(sub==='forense'){
   if(/t[oó]xic|muestras/.test(t))return ['elisa'];
   if(/gen[eé]tic|microbiolog/.test(t))return ['pcr','elisa'];
 }
 if(sub==='proteccion'){
   if(/estructura at[oó]mica|[aá]tomo|radiaciones y magnitudes/.test(t))return ['atomo'];
   if(/protecci[oó]n|exposici[oó]n|dosimetr[ií]a|salas de radiodiagn[oó]stico/.test(t))return ['dosimetro'];
 }
 if(sub==='atencion'){
   if(/preparaci[oó]n|higiene|movilizaci[oó]n/.test(t))return ['posiciones','maslow'];
   if(/observaci[oó]n del paciente/.test(t))return ['posiciones'];
 }
 return [];
}
export function additionalVisualQuestions(lesson){
 return topicsFor(lesson).flatMap(kind=>[0,1,2].map(i=>[
  'Observa el esquema de '+assetGroups[kind].title+'. ¿Qué estructura o concepto indica la letra '+ 'ABC'[i] +'?',
  [...assetGroups[kind].answers],i,
  'La letra '+ 'ABC'[i] +' corresponde a '+assetGroups[kind].answers[i]+'. Es un esquema didáctico original, no a escala.',
  null,{kind:'lab-original-'+kind,target:'ABC'[i]}
 ]));
}
export function additionalVisualMedia(q){
 const kind=q?.[5]?.kind;
 if(!kind||!kind.startsWith('lab-original-'))return '';
 const data=assetGroups[kind.slice(13)];if(!data)return '';
 const letter=q[5].target;
 return '<figure class="quiz-visual" style="max-width:690px;margin:14px auto 22px;padding:10px;border:1px solid #37617a;border-radius:16px;background:#0c2839"><img src="./diagrams/'+data.file+'" loading="lazy" decoding="async" alt="Esquema original de '+data.title+' con las estructuras A, B y C" style="display:block;width:100%;height:auto;border-radius:8px"><figcaption style="color:#d2e7f2;font-size:13px;text-align:center;padding:9px 0 2px">Identifica la letra '+letter+'. Ilustración didáctica, no a escala.</figcaption></figure>';
}
