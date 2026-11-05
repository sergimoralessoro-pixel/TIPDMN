import {buildModule} from './drive-book-engine.js';
const q=(p,r,w,y)=>[p,[r,...w],0,y];
const u=[
['Radiaciones, ondas y magnitudes físicas','La primera unidad formativa presenta estructura atómica, excitación, ionización y propiedades de ondas. Estos conceptos permiten comprender cómo se generan y detectan imágenes médicas.',[
['Número atómico Z','Cuenta protones del núcleo y determina el elemento químico. El número másico A suma protones y neutrones.','Un átomo tiene once protones: ¿qué magnitud vale once?'],
['Isótopos','Son átomos del mismo elemento que conservan número de protones y difieren en neutrones. Pueden ser estables o inestables.','Dos átomos poseen igual Z pero diferente número de neutrones: ¿cómo se relacionan?'],
['Excitación','Una partícula o electrón gana energía y ocupa un estado de mayor energía sin desprenderse necesariamente del átomo. Puede liberar energía al volver a su estado inicial.','Un electrón absorbe energía y pasa temporalmente a un estado superior sin abandonar el átomo: ¿qué proceso ocurre?'],
['Ionización','Se forma un ion al retirar o añadir electrones. La radiación ionizante tiene energía suficiente para crear pares iónicos en la materia.','Un fotón arranca un electrón de un átomo: ¿qué proceso se ha producido?'],
['Frecuencia y periodo','La frecuencia f expresa ciclos por segundo y se relaciona con el período T mediante f=1/T. Para ondas electromagnéticas se cumple v=λ·f en un medio.','Una onda realiza numerosos ciclos cada segundo y se desea cuantificarlo en hertzios: ¿qué magnitud se utiliza?'],
['Refracción','Una onda cambia de velocidad y dirección al pasar entre medios según sus propiedades. Se distingue de reflexión, que es retorno parcial desde una interfaz.','Una onda atraviesa una interfaz y cambia su dirección de propagación: ¿qué fenómeno se describe?']
],[
q('¿Qué relación une frecuencia y periodo?','f = 1/T',['f = T²','f = T + 1','f = masa/volumen'],'La frecuencia es inversa del período.'),
q('¿Qué relación es válida para velocidad, longitud de onda y frecuencia?','v = λ × f',['v = λ + f','v = f/masa','v = dosis × tiempo'],'La velocidad de propagación relaciona longitud de onda y frecuencia.'),
q('¿Qué distingue excitación de ionización?','En ionización se produce un ion; excitación no requiere separar electrón',['Son siempre lo mismo','La ionización solo ocurre en líquidos','La excitación elimina el núcleo'],'La pérdida de electrón es el rasgo clave de la ionización.'),
q('¿Qué partículas tienen carga positiva en el núcleo?','Protones',['Neutrones','Electrones','Fotones'],'Los protones determinan Z y tienen carga positiva.')
]],
['Producción de rayos X y equipos de radiología','La segunda unidad explica los componentes de un equipo convencional, la interacción de electrones en el ánodo, los espectros y las diferencias de exposición.',[
['Cátodo','El cátodo del tubo contiene un filamento que emite electrones mediante calentamiento, bajo condiciones controladas.','El filamento caliente libera electrones en el polo negativo de un tubo: ¿qué componente es?'],
['Ánodo','Es el blanco positivo sobre el que inciden electrones acelerados. Convierte casi toda su energía en calor y una pequeña parte en rayos X.','Electrones rápidos impactan en una superficie metálica positiva y generan rayos X: ¿qué pieza es?'],
['Bremsstrahlung','La radiación de frenado aparece cuando electrones se desaceleran en el campo de núcleos del blanco. Produce un espectro continuo de fotones.','Un electrón se desvía y pierde energía cerca del núcleo de tungsteno produciendo fotones: ¿qué radiación se origina?'],
['Radiación característica','Se produce cuando se crean vacantes en capas internas del átomo blanco y electrones de niveles superiores las rellenan. Origina fotones con energías discretas.','Tras expulsar un electrón interno del ánodo, otro ocupa su lugar emitiendo energía específica: ¿qué fenómeno se observa?'],
['Kilovoltaje kVp','Controla la energía máxima de los fotones y la penetración general del haz. Cambia también contraste y dosis según técnica.','Una técnica aumenta la diferencia de potencial para generar fotones más energéticos: ¿qué parámetro modifica?'],
['Producto mAs','Relaciona corriente del tubo con tiempo de exposición y condiciona cantidad de fotones. No se debe confundir con energía de cada fotón.','Se duplica el tiempo con igual corriente y aumenta cantidad de fotones: ¿qué parámetro varía?']
],[
q('¿Dónde se generan rayos X en el tubo?','Al impactar electrones sobre el ánodo',['En el cristal del monitor','En la mesa radiológica','En el teclado'],'Las interacciones en el blanco producen radiación de frenado y característica.'),
q('¿Qué indica kVp principalmente?','Energía o penetración del haz',['Número de protones del paciente','Actividad en MBq','Tiempo de resonancia'],'El kilovoltaje determina energía del espectro.'),
q('¿Qué diferencia mAs de kVp?','mAs afecta número de fotones y kVp su energía',['Son unidades idénticas','mAs mide temperatura','kVp mide actividad'],'Ambos son ajustes importantes pero representan aspectos diferentes.'),
q('¿Cuál es la mayor parte de energía depositada en el ánodo?','Calor',['Luz visible útil','Señales de resonancia','Actividad de radiofármacos'],'La eficiencia de producción de rayos X es reducida.')
]],
['Procesamiento y gestión de la imagen médica','La tercera unidad estudia detectores, procesado digital y sistemas de archivo e intercambio de imagen. Importa distinguir adquisición de visualización e informe.',[
['Receptor digital','Convierte la energía del haz de rayos X o la luz del centelleador en una señal registrable. Su respuesta determina aspectos de calidad.','Una placa electrónica recoge información tras la exposición radiográfica: ¿qué componente emplea?'],
['Resolución espacial','Capacidad de distinguir detalles pequeños y próximos. Depende de adquisición, geometría y procesamiento.','Dos líneas muy cercanas no pueden diferenciarse en una imagen: ¿qué propiedad es insuficiente?'],
['Ruido de imagen','Variación aleatoria que dificulta distinguir estructuras de bajo contraste. Puede aumentar cuando se recogen pocas señales útiles.','Una imagen resulta granulada y dificulta ver detalle fino: ¿qué limitación tiene?'],
['Contraste','Diferencia de señal entre estructuras que permite distinguirlas. Influyen atenuación, parámetros de adquisición y ventana de visualización.','Una lesión y el tejido vecino muestran tonos demasiado parecidos para diferenciarse: ¿qué propiedad falta?'],
['PACS','Sistema de archivo y comunicación de imágenes médicas que permite consultar y transmitir estudios. Debe gestionar permisos y disponibilidad.','Un hospital almacena imágenes y las distribuye a estaciones de diagnóstico: ¿qué sistema utiliza?'],
['DICOM','Estándar que define estructura e intercambio de imágenes médicas con metadatos. Ayuda a interoperar entre equipos y sistemas.','Una TC envía imágenes a PACS usando un formato común de imagen médica: ¿qué estándar emplea?']
],[
q('¿Qué sistema organiza el archivo de imágenes médicas?','PACS',['Un tensiómetro','Un colimador físico','Un generador de radiofármacos'],'PACS gestiona almacenamiento y comunicación de imágenes.'),
q('¿Qué estándar se usa para intercambiar estudios de imagen?','DICOM',['PDF como estándar único','CSV exclusivamente','Bluetooth'],'DICOM especifica formato y comunicación de imágenes.'),
q('¿Qué aspecto empeora cuando la señal es escasa?','Relación señal-ruido',['El número de pacientes del hospital','La longitud del cable de red siempre','La concentración de oxígeno'],'El ruido puede ocultar detalles.'),
q('¿Qué término describe distinguir estructuras con tonos diferentes?','Contraste',['Actividad','Biodistribución','Semiperiodo'],'El contraste hace visible la diferencia entre zonas.')
]],
['Equipos de RM, ultrasonidos y TC','La cuarta unidad compara sistemas de imagen desde sus fundamentos físicos y componentes. Es importante no confundir qué tecnología emplea cada modalidad.',[
['Imán de RM','Genera un campo B0 intenso y relativamente homogéneo para estudiar resonancia de núcleos. La instalación requiere normas específicas de seguridad.','Un equipo utiliza un campo de varios teslas y señales de hidrógeno: ¿qué componente principal tiene?'],
['Bobinas de RM','Las bobinas generan o reciben campos de radiofrecuencia para excitar y captar señal. Se seleccionan según región y objetivo.','Un técnico coloca una antena cercana a una rodilla para mejorar señal en RM: ¿qué equipo usa?'],
['Transductor ultrasónico','Emite y recibe ultrasonidos mediante efecto piezoeléctrico. Aporta imagen dinámica sin radiación ionizante.','Se apoya una sonda que envía pulsos acústicos y recibe ecos de tejidos: ¿qué componente es?'],
['Detector de TC','Registra rayos X residuales durante adquisición alrededor del paciente, transformándolos en señal para reconstrucción.','La radiación atravesó al paciente y es captada en un anillo de elementos: ¿qué pieza trabaja?'],
['Gantry','Estructura del tomógrafo que aloja elementos de adquisición alrededor de la abertura para paciente.','Una persona se desplaza por el aro del tomógrafo: ¿qué estructura observa?'],
['Ecografía Doppler','Evalúa cambios de frecuencia ligados al movimiento de tejidos o sangre. Permite estudiar dirección y características del flujo.','Se desea estudiar la circulación en una arteria mediante cambio de frecuencia de ecos: ¿qué modalidad se emplea?']
],[
q('¿Qué modalidad NO utiliza ionización por rayos X?','RM',['TC','Radiografía','Fluoroscopia'],'La RM usa campo magnético y radiofrecuencia.'),
q('¿Qué componente produce ultrasonidos?','Transductor piezoeléctrico',['Tubo de rayos X','Ánodo de tungsteno','Colimador de gamma'],'El transductor convierte señales eléctricas y acústicas.'),
q('¿Qué fenómeno permite obtener señal de flujo en ecografía?','Doppler',['Fotoeléctrico','Annihilación de positrones','Bremsstrahlung'],'La frecuencia cambia por movimiento relativo.'),
q('¿Qué mecanismo usa TC para formar cortes?','Medición de atenuación de rayos X y reconstrucción',['Resonancia de protones','Cultivo celular','Reacciones inmunológicas'],'TC utiliza múltiples proyecciones de rayos X.')
]]
];
export const fundamentosDriveBook=buildModule('fundamentos','RESUMEN 2.pdf — UF1 radiaciones; UF2 equipos; UF3 procesamiento; UF4 RM y ultrasonidos',u);
