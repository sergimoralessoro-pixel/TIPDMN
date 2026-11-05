/* SVG propios de estudio asociados a cada apartado de Forense. Ilustraciones conceptuales, no fotografías de muestras reales. */
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function wrap(title,body,caption){
return '<figure class="forensic-figure"><div class="forensic-figure-title">🔬 ILUSTRACIÓN DE ESTUDIO · '+esc(title)+'</div><svg viewBox="0 0 620 265" role="img" aria-label="'+esc(caption)+'" preserveAspectRatio="xMidYMid meet">'+body+'</svg><figcaption>'+esc(caption)+'</figcaption></figure>';
}
function custodia(){
 const steps=[['1','RECOGIDA','Indicio'],['2','PRECINTO','Código'],['3','ANÁLISIS','Registro'],['4','INFORME','Trazabilidad']];
 return wrap('Cadena de custodia',
 '<path d="M55 135H555" stroke="#5d9fb2" stroke-width="9" stroke-linecap="round" stroke-dasharray="16 13" class="forensic-dash"/>'+
 steps.map((a,i)=>{const x=80+i*155;return '<rect x="'+(x-57)+'" y="62" width="115" height="142" rx="18" fill="#12394d" stroke="#58b5c5" stroke-width="2"/><circle cx="'+x+'" cy="107" r="27" fill="#4aa9b8"/><text x="'+x+'" y="115" fill="#052333" font-size="23" font-weight="900" text-anchor="middle">'+a[0]+'</text><text x="'+x+'" y="162" fill="#e9f8fd" font-size="15" text-anchor="middle" font-weight="800">'+a[1]+'</text><text x="'+x+'" y="185" fill="#abd2df" font-size="12" text-anchor="middle">'+a[2]+'</text></rect>'}).join(''),
 'La identidad de una evidencia se documenta desde su recogida hasta el informe.');
}
function toxins(){
 return wrap('Muestras y toxicología',
 '<g><rect x="60" y="45" width="95" height="176" rx="20" fill="#d0f6fe" opacity=".15" stroke="#87dcf1" stroke-width="4"/><rect x="68" y="127" width="79" height="82" rx="12" fill="#c95774" opacity=".8"/><rect x="65" y="34" width="84" height="22" rx="6" fill="#68cada"/><text x="107" y="239" fill="#ebfaff" font-size="15" text-anchor="middle">SANGRE</text></g>'+
 '<g><rect x="218" y="45" width="95" height="176" rx="20" fill="#d0f6fe" opacity=".15" stroke="#87dcf1" stroke-width="4"/><rect x="226" y="127" width="79" height="82" rx="12" fill="#e6b951" opacity=".8"/><rect x="223" y="34" width="84" height="22" rx="6" fill="#68cada"/><text x="265" y="239" fill="#ebfaff" font-size="15" text-anchor="middle">ORINA</text></g>'+
 '<g><rect x="379" y="45" width="95" height="176" rx="20" fill="#d0f6fe" opacity=".15" stroke="#87dcf1" stroke-width="4"/><path d="M390 160Q425 120 463 160L463 208H390Z" fill="#73ced5" opacity=".65"/><rect x="385" y="34" width="84" height="22" rx="6" fill="#68cada"/><text x="427" y="239" fill="#ebfaff" font-size="15" text-anchor="middle">HUMOR VÍTREO</text></g>'+
 '<g><path d="M520 75V184" stroke="#8bedf1" stroke-width="5"/><path d="M506 143L520 125L534 143" fill="none" stroke="#8bedf1" stroke-width="5"/><text x="520" y="205" font-size="13" fill="#add7e8" text-anchor="middle">ANALIZAR</text></g>',
 'Las matrices biológicas aportan información diferente según sustancia, tiempo y conservación.');
}
function chromatogram(){
return wrap('Cromatografía y confirmación',
 '<path d="M55 211H568M72 224V40" stroke="#bddce7" stroke-width="3"/>'+
 '<path d="M75 209 L100 207 L122 202 L139 194 Q158 180 172 101 Q188 22 207 102 Q223 188 240 202 L276 204 Q297 192 317 141 Q328 100 341 148 Q360 202 383 204 L405 204 Q428 208 450 65 Q464 18 478 86 Q491 170 515 207 L558 209" fill="none" stroke="#72d8eb" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>'+
 '<text x="178" y="46" fill="#f7d28f" text-anchor="middle" font-size="15">Pico A</text><text x="327" y="87" fill="#f7d28f" text-anchor="middle" font-size="15">Pico B</text><text x="481" y="41" fill="#f7d28f" text-anchor="middle" font-size="15">Pico C</text><text x="550" y="240" fill="#cee4ed" font-size="12" text-anchor="end">Tiempo de retención →</text><text x="28" y="88" fill="#cee4ed" font-size="12" transform="rotate(-90 28 88)">Señal</text>',
 'La cromatografía separa componentes: los picos se interpretan con referencias y controles.');
}
function dna(){
 const left=[],right=[],rungs=[];
 for(let i=0;i<17;i++){const y=28+i*12.3;const dx=66*Math.sin(i*.66);const x1=225+dx,x2=395-dx;left.push((i?'L':'M')+x1.toFixed(1)+' '+y.toFixed(1));right.push((i?'L':'M')+x2.toFixed(1)+' '+y.toFixed(1));if(i%2===0)rungs.push('<path d="M'+x1.toFixed(1)+' '+y.toFixed(1)+'L'+x2.toFixed(1)+' '+y.toFixed(1)+'" stroke="'+(i%4===0?'#e4b06d':'#79dfca')+'" stroke-width="6" stroke-linecap="round"/>')}
 return wrap('ADN y amplificación PCR',
 '<path d="'+left.join(' ')+'" fill="none" stroke="#70c9e8" stroke-width="10" stroke-linecap="round"/><path d="'+right.join(' ')+'" fill="none" stroke="#e98b9b" stroke-width="10" stroke-linecap="round"/>'+rungs.join('')+
 '<text x="70" y="93" fill="#e9f8fd" font-size="17">DOBLE</text><text x="70" y="117" fill="#e9f8fd" font-size="17">HÉLICE</text><path d="M130 103L187 103" stroke="#c4eaf2" stroke-width="3" stroke-dasharray="7 5"/>'+
 '<text x="500" y="98" fill="#e9f8fd" font-size="16">PCR</text><text x="500" y="120" fill="#c0e3e8" font-size="12">amplifica ADN</text><path d="M440 105L492 105" stroke="#c4eaf2" stroke-width="3" stroke-dasharray="7 5"/>',
 'La PCR multiplica segmentos de ADN; los STR son marcadores para comparar perfiles genéticos.');
}
function bacteria(){
 const dots=Array.from({length:22},(_,i)=>{const angle=i*2.399,rad=10+Math.sqrt(i+1)*21,x=310+rad*Math.cos(angle),y=133+rad*Math.sin(angle);return '<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="'+(5+i%3*2)+'" fill="'+(['#76debc','#eebc75','#64bddb'][i%3])+'" opacity=".85"/>'}).join('');
 return wrap('Cultivo microbiológico',
 '<ellipse cx="310" cy="132" rx="183" ry="109" fill="#0b3444" stroke="#91e7ec" stroke-width="8"/><ellipse cx="310" cy="132" rx="161" ry="91" fill="#27717d" opacity=".35" stroke="#4ebabb" stroke-width="3"/>'+dots+
 '<rect x="52" y="103" width="78" height="54" rx="7" fill="#114c61" stroke="#91d8e9"/><text x="92" y="134" fill="#d3f7fc" font-size="13" text-anchor="middle">MUESTRA</text><path d="M131 130L178 130" stroke="#9fdbe6" stroke-width="3" stroke-dasharray="5 7"/><text x="501" y="114" fill="#d7f8fa" font-size="15">COLONIAS</text><path d="M478 125L450 140" stroke="#d7f8fa" stroke-width="3"/>',
 'Los microorganismos viables pueden formar colonias. Un cultivo no equivale a una PCR.');
}
function histology(){
const cells=Array.from({length:21},(_,i)=>{const cx=110+(i%7)*63+(i%2)*12,cy=50+Math.floor(i/7)*71;return '<ellipse cx="'+cx+'" cy="'+cy+'" rx="27" ry="24" fill="#b568aa" opacity=".45" stroke="#e5bddb" stroke-width="2"/><ellipse cx="'+cx+'" cy="'+cy+'" rx="9" ry="12" fill="#674d9c"/>'}).join('');
return wrap('Histología e histoquímica',
 '<rect x="38" y="20" width="544" height="215" rx="24" fill="#493c6c" opacity=".5" stroke="#c59ed1" stroke-width="4"/>'+cells+
 '<rect x="428" y="32" width="140" height="32" rx="9" fill="#193955"/><text x="498" y="54" fill="#dcf5fb" font-size="14" font-weight="800" text-anchor="middle">TEJIDO</text>',
 'Una tinción permite distinguir estructuras o sustancias en tejido; la hemosiderina contiene hierro.');
}
function clock(){
return wrap('Tanatoquimia y estimación post mortem',
 '<circle cx="183" cy="130" r="94" fill="#17394d" stroke="#82dbe8" stroke-width="9"/><circle cx="183" cy="130" r="8" fill="#fbd49a"/><path d="M183 130L183 78M183 130L223 147" stroke="#fbd49a" stroke-width="8" stroke-linecap="round"/><path d="M183 52V64M183 196V208M105 130H117M249 130H261" stroke="#d8f8ff" stroke-width="5"/>'+
 '<path d="M336 187Q387 50 435 175Q475 220 535 89" fill="none" stroke="#73cecf" stroke-width="7" stroke-linecap="round"/><text x="438" y="50" fill="#edf8fe" text-anchor="middle" font-size="19">CAMBIOS</text><text x="438" y="73" fill="#b6dce9" text-anchor="middle" font-size="13">químicos post mortem</text>',
 'La química post mortem orienta estimaciones; ningún marcador aislado determina una hora exacta.');
}
function dental(){
return wrap('Identificación ante mortem y post mortem',
 '<rect x="35" y="29" width="258" height="206" rx="18" fill="#153b53" stroke="#85dce8" stroke-width="3"/><rect x="327" y="29" width="258" height="206" rx="18" fill="#153b53" stroke="#85dce8" stroke-width="3"/>'+
 '<text x="165" y="63" fill="#e9fbff" font-size="17" text-anchor="middle">ANTES (AM)</text><text x="456" y="63" fill="#e9fbff" font-size="17" text-anchor="middle">DESPUÉS (PM)</text>'+
 [150,442].map((x,i)=>'<path d="M'+(x-47)+' 95 Q'+(x-55)+' 72 '+x+' 91 Q'+(x+56)+' 73 '+(x+45)+' 112L'+(x+27)+' 191Q'+x+' 209 '+(x-9)+' 181L'+(x-23)+' 193L'+(x-46)+' 121Z" fill="#e8ede7" stroke="#b5ccd3" stroke-width="4"/><path d="M'+(x-36)+' 120L'+(x+35)+' 120" stroke="#67b3bf" stroke-width="4"/>'+(i?'<circle cx="'+(x+20)+'" cy="112" r="8" fill="#d6a56c"/>':'<circle cx="'+(x+20)+'" cy="112" r="8" fill="#d6a56c"/>')).join('')+
 '<path d="M299 146H322" stroke="#f5d48b" stroke-width="5" stroke-dasharray="6 5"/>',
 'Los hallazgos post mortem se cotejan con registros ante mortem: se buscan concordancias verificables.');
}

function subjectFigure(lesson,heading){
const key=String(heading||lesson.title||'').toLowerCase(), sub=lesson.subject;
let labels=[],kind='';
if(sub==='anatomia'){
 if(/coraz|c[aá]rdio|circulaci[oó]n|s[ií]stole|v[aá]lvula/.test(key)){labels=[['🫀','Aurículas','Reciben sangre'],['🔄','Ventrículos','Bombeo'],['🩸','Vasos','Transporte']];kind='Corazón y circulación'}
 else if(/pulmon|respira|pleura|alveol/.test(key)){labels=[['🌬️','Vías aéreas','Conducen aire'],['🫁','Alvéolos','Intercambio'],['🩸','Capilares','Gases']];kind='Aparato respiratorio'}
 else if(/cereb|neuro|m[eé]dula|nervio|sistema nervioso|mening/.test(key)){labels=[['🧠','Encéfalo','Procesa'],['〰️','Médula','Comunica'],['⚡','Nervios','Transmiten']];kind='Sistema nervioso'}
 else if(/hues|[oó]se|articul|esquelet|cr[aá]neo|costillas/.test(key)){labels=[['🦴','Huesos','Sostienen'],['🦵','Articulaciones','Unen'],['💪','Músculos','Mueven']];kind='Aparato locomotor'}
 else if(/hormon|tiroid|endocrin|p[aá]ncreas|suprarrenal/.test(key)){labels=[['🧠','Hipófisis','Regulación'],['🦋','Tiroides','Metabolismo'],['💉','Páncreas','Glucemia']];kind='Sistema endocrino'}
 else if(/radiograf|tomograf|ecograf|resonancia|imagen/.test(key)){labels=[['🩻','Radiografía','Proyección'],['🖥️','TC','Cortes'],['🧲','RM','Magnetismo']];kind='Técnicas de imagen'}
 else {labels=[['↕️','Sagital','Lados'],['↔️','Coronal','Frente/dorso'],['⊞','Axial','Arriba/abajo']];kind='Orientación anatómica'}
}else if(sub==='proteccion'){
 if(/dosis|magnitud|activid|sievert|gray/.test(key)){labels=[['⚛️','Becquerel','Actividad'],['📊','Gray','Dosis absorbida'],['🛡️','Sievert','Dosis ponderada']];kind='Magnitudes radiológicas'}
 else if(/etapas|efectos|c[eé]lul|radiosensib|lesi[oó]n/.test(key)){labels=[['⚛️','Física','Ionización'],['🧪','Química','Radicales'],['🧬','Biológica','Respuesta']];kind='Efectos radiobiológicos'}
 else if(/distancia|tiempo|blindaje|protecci[oó]n/.test(key)){labels=[['⏱️','Tiempo','Reducir'],['📏','Distancia','Aumentar'],['🛡️','Blindaje','Atenuar']];kind='Medidas de protección'}
 else if(/residuos|decaimiento|transporte/.test(key)){labels=[['☢️','Actividad','Inicial'],['⏳','Semiperiodo','A/2'],['📦','Gestión','Controlada']];kind='Actividad y residuos'}
 else {labels=[['☢️','Fuente','Radiación'],['🔎','Detección','Medición'],['📋','Registro','Control']];kind='Seguridad radiológica'}
}else if(sub==='atencion'){
 if(/comunicaci[oó]n|entrevista|barrera|empat[ií]a/.test(key)){labels=[['🗣️','Emisor','Habla'],['💬','Mensaje','Información'],['👂','Receptor','Comprende']];kind='Comunicación sanitaria'}
 else if(/glasgow|constante|observaci[oó]n|pulso/.test(key)){labels=[['👀','Observación','Identificar'],['🩺','Medición','Registrar'],['📝','Aviso','Comunicar']];kind='Observación del paciente'}
 else {labels=[['🪪','Identificación','Confirmar'],['🩻','Prueba','Preparar'],['🫶','Atención','Acompañar']];kind='Atención centrada en el paciente'}
}else if(sub==='ingles'){
 labels=[['⏮️','PAST','Antes'],['⏺️','PRESENT','Ahora'],['⏭️','FUTURE','Después']];kind='Línea temporal de gramática inglesa';
}else if(sub==='ipe1'||sub==='ipe2'){
 labels=[['🎯','Objetivo','Planificar'],['🛡️','Seguridad','Prevenir'],['💼','Trabajo','Aplicar']];kind='Competencias para el empleo';
}else if(sub==='forense'){return '';}
else {labels=[['🔍','Observar','Información'],['🧪','Analizar','Método'],['📋','Aplicar','Resultados']];kind='Secuencia de estudio'}
const centers=[107,310,513],icons=labels.map((x,i)=>{let cx=centers[i];return '<circle cx="'+cx+'" cy="116" r="64" fill="'+['#13485b','#184c66','#1b5364'][i]+'" stroke="'+['#51c6d5','#8dbbe5','#7ee1bf'][i]+'" stroke-width="3"/><text x="'+cx+'" y="111" text-anchor="middle" font-size="47">'+x[0]+'</text><text x="'+cx+'" y="173" text-anchor="middle" fill="#e9fdff" font-size="16" font-weight="800">'+esc(x[1])+'</text><text x="'+cx+'" y="220" text-anchor="middle" fill="#bcdde7" font-size="15">'+esc(x[2])+'</text>'}).join('');
const arrows='<path d="M178 116H231M381 116H433" fill="none" stroke="#75dbe8" stroke-width="7" stroke-linecap="round"/><path d="M218 104L231 116L218 128M420 104L433 116L420 128" fill="none" stroke="#75dbe8" stroke-width="5" stroke-linecap="round"/>';
return wrap(kind,arrows+icons,'Esquema visual original del apartado. Las relaciones son didácticas y pueden simplificar el proceso.');
}
export function topicFigure(lesson,heading){
if(lesson?.subject!=='forense')return subjectFigure(lesson,heading);
 const h=(heading||'').toLowerCase();
 if(/custodia|forense|recogida|recepci[oó]n|manipulaci[oó]n/.test(h))return custodia();
 if(/cromatograf|t[eé]cnicas de an[aá]lisis|confirmaci[oó]n/.test(h))return chromatogram();
 if(/muestras|intoxicaci[oó]n|t[oó]xic|toxicocin[eé]tica|sangre|orina|etanol/.test(h))return toxins();
 if(/gen[eé]tic|adn|pcr|parentesco/.test(h))return dna();
 if(/microbi|cultivo|bacteri/.test(h))return bacteria();
 if(/histolog|histoqu[ií]m|tinci[oó]n/.test(h))return histology();
 if(/tanato|bioqu[ií]m|post mortem|potasio/.test(h))return clock();
 if(/odontolog|identificaci[oó]n|ante mortem|cotejo|dvi|v[ií]ctimas|cat[aá]strofe|antropolog/.test(h))return dental();
 return /forense-vt-3/.test(lesson.id)?dental():/forense-vt-2/.test(lesson.id)?dna():toxins();
}
