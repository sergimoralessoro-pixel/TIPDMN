/* Ilustraciones médicas reales y animaciones educativas con páginas de origen y autoría.
 * Wikimedia Commons: usar solo archivos cuya ficha pública permite reutilización.
 * No descargar ni copiar materiales de buscadores sin licencia.
 */
const items=[
 {id:'rm-mri',sub:'rm',match:/resonancia|imán|campo magnético|equipo|seguridad|bobina|adquisición/i,
  file:'An MRI scanner.JPG',alt:'Fotografía real de un equipo de resonancia magnética de uso clínico',credit:'Walter Davies, CC BY-SA 4.0',caption:'Equipo real de resonancia magnética. Fotografía educativa.'},
 {id:'tc-scanner',sub:'tc',match:/tomograf|gantry|detector|tubo|equipos|adquisición|reconstrucción|protocolo/i,
  file:'CAT scanner.jpg',alt:'Fotografía de un tomógrafo computarizado GE LightSpeed y su mesa',credit:'liz west, CC BY 2.0',caption:'Equipo de tomografía computarizada con gantry y camilla.'},
 {id:'nuclear-camara',sub:'nuclear',match:/gammac[aá]mara|SPECT|colimador|equipos|detector|adquisición|mantenimiento/i,
  file:'Gamma camera.jpg',alt:'Fotografía de cámara gamma SPECT y profesional de medicina nuclear',credit:'Brendaicm, CC BY-SA 3.0',caption:'Gammacámara SPECT utilizada en medicina nuclear.'},
 {id:'mamografia',sub:'rxespecial',match:/mamograf|mama|compresi[oó]n|craneocaudal|oblicua/i,
  file:'Mammography machine.jpg',alt:'Fotografía real de equipo de mamografía',credit:'Bill Branson / National Cancer Institute, dominio público',caption:'Equipo de mamografía para adquisición radiográfica de mama.'},
 {id:'rx-torax',sub:'rxsimple',match:/t[oó]rax|radiograf|proyecci[oó]n PA|pulmon|costal|estern[oó]n/i,
  file:'Chest X-Ray.jpg',alt:'Radiografía de tórax con pulmón, tráquea y arcos costales',credit:'US Army, dominio público',caption:'Radiografía de tórax. Se observan campos pulmonares y estructuras mediastínicas.'},
 {id:'rx-posicion',sub:'rxsimple',match:/posicionamiento|colimaci[oó]n|preparaci[oó]n|estudio|recepci[oó]n/i,
  file:'Radiographic positioning of a chest x-ray.jpg',alt:'Profesional posicionando un paciente para radiografía de tórax',credit:'AndyThesis, CC0',caption:'Posicionamiento radiográfico real y ajuste de la exploración.'},
 {id:'eco-real',sub:'tc',match:/ecograf|ultrason|transductor|doppler/i,
  file:'Medical ultrasound.jpg',alt:'Profesional realizando ecografía clínica a un paciente',credit:'US Navy, dominio público',caption:'Exploración clínica con ultrasonidos y transductor.'},

 {id:'cavidades',sub:'anatomia',match:/cavidades|cavidad|diafragma|mediastino/i,
  file:'Scheme body cavities-es.svg',alt:'Cavidades del cuerpo humano en español: craneal, torácica, abdominal y pélvica',credit:'NCI, Mysid y Angelito7, dominio público',caption:'Cavidades corporales, rotuladas en español.'},
 {id:'cultivo',sub:'forense',match:/cultivo|microbiolog|bacteri|colonias|placa/i,
  file:'Microbial isolations on petri dish.jpg',alt:'Fotografía de un cultivo microbiológico en placa de Petri con colonias',credit:'Luis Fernando Flores LAB, CC BY-SA 4.0',caption:'Ejemplo real de colonias y aislamiento de microorganismos en una placa.'},
 {id:'histologia',sub:'forense',match:/histolog|histoquím|histoquim|tinción|tincion|hemosiderina/i,
  file:'Histology microscope slide.jpg',alt:'Fotografía de portaobjetos histológico con tejido teñido con hematoxilina y eosina',credit:'AdamasPudim, CC BY-SA',caption:'Preparación histológica real para observación microscópica.'},
 {id:'radiaciones',sub:'proteccion',match:/alfa|beta|gamma|tipos de radiaci[oó]n|radiaci[oó]n corpuscular/i,
  file:'Details of types of Radiation.png',alt:'Tabla visual de tipos de radiación, alfa, beta, gamma y neutrones, con poder de penetración',credit:'ThatOneEli, CC BY-SA',caption:'Comparación de radiaciones y sus propiedades.'},

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
