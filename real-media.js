/* Ilustraciones médicas reales y animaciones educativas con páginas de origen y autoría.
 * Wikimedia Commons: usar solo archivos cuya ficha pública permite reutilización.
 * No descargar ni copiar materiales de buscadores sin licencia.
 */
const items=[
 {id:'hueso',sub:'anatomia',match:/hues|óse|ose|epífisis|epifisis|diáfisis|diafisis|médula ósea|medula osea|osteoblast|osteoclast/i,
  file:'603 Anatomy of Long Bone esp.jpg',alt:'Anatomía de un hueso largo: epífisis, diáfisis, médula ósea, periostio y hueso compacto',credit:'OpenStax College, CC BY-SA 4.0',caption:'Estructura de un hueso largo con sus partes señaladas en español.'},
 {id:'cerebro',sub:'anatomia',match:/cereb|lóbulo|lobulo|encéfalo|encefalo|sistema nervioso/i,
  file:'Brainlobes.svg',alt:'Lóbulos cerebral frontal, parietal, temporal, occipital y cerebelo diferenciados por colores',credit:'Washington irving y colaboradores, dominio público',caption:'Lóbulos principales del cerebro y cerebelo.'},
 {id:'corazon',sub:'anatomia',match:/coraz|cardiac|cardíac|circulaci|válvula|valvula|aurícula|auricula|ventrícul|ventricul/i,
  file:'Diagram of the human heart.svg',alt:'Cavidades, válvulas y grandes vasos del corazón humano con números indicativos',credit:'Wapcaplet y Yaddah, Wikimedia Commons',caption:'Cámaras, válvulas y vasos del corazón humano.'},
 {id:'latidos',sub:'anatomia',match:/flujo sanguíneo|recorrido|circulación menor|circulación mayor|sístole|diástole|bombe|ciclo cardíaco/i,
  file:'Latidos.gif',alt:'GIF animado del recorrido de la sangre entre aurículas, ventrículos y grandes vasos',credit:'josiño, dominio público',caption:'GIF: flujo sanguíneo a través de las cámaras del corazón.',animated:true},
 {id:'gota',sub:'forense',match:/sangre|salpicadura|mancha|gota|patr[oó]n hem[aá]tic|impacto/i,
  file:'Examples of Blood-Spatter and Droplet patterns.svg',alt:'Diagrama de patrones de salpicaduras y gotas de sangre en una escena forense',credit:'JJPMaster, CC BY-SA 4.0 (basado en Kimberly Lopez)',caption:'Distintos patrones de gotas y salpicaduras de sangre. La interpretación requiere contexto.'},
 {id:'adn',sub:'forense',match:/adn|pcr|gen[eé]tica|herencia|parentesco|str/i,
  file:'DNA animation.gif',alt:'GIF de una doble hélice de ADN girando sobre su eje',credit:'Magadan / Elecbullet, dominio público',caption:'GIF: estructura tridimensional de la doble hélice del ADN.',animated:true},
 {id:'tuborx',sub:'proteccion',match:/rayos x|radiograf|tubo|fuente|radiaci[oó]n|fot[oó]n/i,
  file:'X-ray tube schematic.png',alt:'Esquema del tubo de rayos X y su generador',credit:'Daniel W. Rickey, CC BY-SA 3.0',caption:'Tubo de rayos X y generador: referencia visual para comprender la emisión.'},
 {id:'flujo',sub:'anatomia',match:/flujo sanguíneo|circulaci[oó]n sist[eé]mica|circulaci[oó]n pulmonar/i,
  file:'Circulatory system SMIL.svg',alt:'Esquema animado de la circulación sistémica y pulmonar con sangre oxigenada y desoxigenada',credit:'Cmglee, CC BY-SA 3.0',caption:'Sistema circulatorio: sangre oxigenada y desoxigenada.',animated:true}
];
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function figure(r){
 const filepath='https://commons.wikimedia.org/wiki/Special:FilePath/'+encodeURIComponent(r.file).replace(/%2F/g,'/');
 const page='https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(r.file).replace(/%20/g,'_');
 return '<figure class="study-real-image"><img loading="lazy" decoding="async" src="'+filepath+'" alt="'+esc(r.alt)+'" referrerpolicy="no-referrer" onerror="this.closest(\'figure\').style.display=\'none\'"><figcaption><strong>'+esc(r.caption)+'</strong><small>Fuente: <a href="'+page+'" target="_blank" rel="noopener noreferrer">'+esc(r.credit)+' · Wikimedia Commons</a></small></figcaption></figure>';
}
export function topicRealMedia(lesson,heading){
 const text=String(heading||'')+' '+String(lesson?.title||'');
 const sub=lesson?.subject||'';
 let matches=items.filter(x=>x.sub===sub&&x.match.test(text));
 // Priorizar especificidad del apartado, no solo el título del tema.
 const local=items.filter(x=>x.sub===sub&&x.match.test(String(heading||'')));
 if(local.length)matches=local;
 if(sub==='anatomia'&&/circulaci|sístole|diástole|bombe|recorrido/i.test(text)){
   const still=items.find(x=>x.id==='corazon'),gif=items.find(x=>x.id==='latidos');
   return figure(still)+figure(gif);
 }
 if(sub==='forense'&&/sangre|salpicadura|gota|mancha/i.test(text))return figure(items.find(x=>x.id==='gota'));
 if(!matches.length)return '';
 // Evitar imágenes duplicadas en una misma hoja y evitar 8 imágenes al abrir un capítulo.
 const unique=[...new Set(matches.map(x=>x.id))].map(id=>items.find(x=>x.id===id));
 return unique.slice(0,2).map(figure).join('');
}
