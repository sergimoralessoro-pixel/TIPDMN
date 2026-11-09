/* Diagramas originales para identificar los tres mecanismos de interacción en VT4 RA2. */
const interactions={
 fotoelectrico:{file:'vt4-fotoelectrico.svg',description:'Un fotón se absorbe por completo al expulsar un electrón ligado.',answer:0},
 compton:{file:'vt4-compton.svg',description:'Un fotón sale dispersado con menor energía y expulsa un electrón.',answer:1},
 pares:{file:'vt4-pares.svg',description:'Un fotón energético desaparece y crea un electrón y un positrón.',answer:2}
};
const choices=['Efecto fotoeléctrico','Efecto Compton','Producción de pares','Dispersión de ultrasonidos'];
export const vt4Ra2VisualQuestions=Object.entries(interactions).map(([kind,v])=>[
 'Observa la imagen: ¿qué interacción de un fotón con la materia se representa?',
 [...choices],v.answer,v.description,null,{kind:'vt4-ra2-'+kind}
]);
export function vt4Ra2VisualMedia(question){
 const code=question?.[5]?.kind;
 if(typeof code!=='string'||!code.startsWith('vt4-ra2-'))return '';
 const effect=interactions[code.slice(8)];
 if(!effect)return '';
 return '<figure class="quiz-visual" style="max-width:690px;margin:14px auto 22px;padding:12px;border:1px solid #37617a;border-radius:16px;background:#0c2839"><img src="./diagrams/'+effect.file+'" loading="lazy" decoding="async" alt="Representación esquemática original de interacción de un fotón con materia" style="display:block;width:100%;height:auto;border-radius:8px"><figcaption style="color:#d2e7f2;font-size:13px;text-align:center;padding:9px 0 2px">Analiza qué sucede con el fotón y el electrón. Esquema original sin escala.</figcaption></figure>';
}
