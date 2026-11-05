/* Construcción de capítulos originales a partir de apuntes revisados. No copia el texto de los PDF. */
const shift=(a,n)=>a.slice(n).concat(a.slice(0,n));
export function buildModule(subject,source,units){
 return units.map((u,ix)=>{
  const [name,intro,concepts,custom]=u;
  if(concepts.length<6||custom.length<4)throw Error('Tema insuficiente: '+name);
  const sections=concepts.map(([term,explain,scenario],n)=>[
   (n+1)+'. '+term,
   explain,
   'En la práctica: '+scenario.replace(/^[¿]|[?]$/g,'')+'.'
  ]);
  const generated=concepts.map(([term,explain,scenario],i)=>{
    const others=concepts.filter((_,j)=>j!==i).slice(0,3);
    const answers=[term,...others.map(z=>z[0])];
    const why=[explain,...others.map(z=>z[1])];
    const rot=shift([0,1,2,3],(i+ix)%4);
    return [scenario,rot.map(z=>answers[z]),rot.indexOf(0),explain,
      rot.map(z=>z===0?'':'«'+answers[z]+'» no encaja aquí: '+why[z])];
  });
  const quiz=[...generated,...custom.map(([prompt,choices,right,why,wrong],n)=>{
    if(choices.length!==4||right<0||right>3)throw Error('Incorrecta '+prompt);
    const rot=shift([0,1,2,3],(n+ix)%4);
    return [prompt,rot.map(i=>choices[i]),rot.indexOf(right),why,rot.map(i=>i===right?'':(wrong?.[i]||'Esta alternativa describe otra situación distinta. '+why))];
  })];
  return {
   id:'drive-'+subject+'-'+(ix+1),subject,title:'TEMA '+(ix+1)+' · '+name,
   intro,sections,tip:concepts.slice(0,3).map(x=>x[0]).join(' · '),
   summary:concepts.slice(0,3).map(x=>x[0]+': '+x[1]).join(' '),
   sourceLabel:'Apuntes compartidos en la carpeta «Rayos Raluca»: '+source+'. Síntesis redactada para estudiar; comprobar con las diapositivas propias cuando estén disponibles.',
   verified:false,questions:quiz
  };
 });
}