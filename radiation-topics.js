/* Protección Radiológica. Cada UF se divide en capítulos temáticos que se basan en las diapositivas VT2–VT10. */
import {protectionBookA} from './protection-book-a.js';
import {protectionBookB} from './protection-book-b.js';
import {radioprotectionClassroom} from './radioprotection-classroom.js';
import {detectorEfficiencyProblems} from './detector-efficiency-problems.js';
import {vt4Ra2Questions} from './vt4-ra2-questions.js';
import {vt4Ra2VisualQuestions} from './vt4-ra2-visual.js';
const slides=[...protectionBookA,...protectionBookB];
function make(id,title,intro,from,to,formulas,tables,explain,tip){
 const parts=slides.slice(from,to);
 return {id,subject:'proteccion',title,intro,sourceLabel:'Diapositivas de Protección Radiológica VT'+(from<8?Math.max(2,Math.floor(from/2)+2):Math.min(10,from-3))+' y temas relacionados de UF1/UF2/UF3',sections:[
 ...explain.map(x=>x),
 ...parts.map((l,i)=>['Apartado '+(explain.length+i+1)+'. '+l.title.replace(/^VT\d+[–\d]* · /,''),l.intro+' '+l.points.map(([h,d])=>h+': '+d).join(' '),l.tip])
 ],questions:parts.flatMap(l=>l.questions),formulas,tables,tip,
 summary:tip,verified:true};
}
export const radiationTopics=[
make('pr-t1','TEMA 1 · Estructura atómica, radiaciones y magnitudes','De qué está hecha la materia, qué significa ionización y cómo se miden actividad y dosis.',0,2,
[['Actividad','A = N / t','Bq = desintegraciones por segundo (si N es el número de desintegraciones en t).'],['Dosis absorbida','D = E absorbida / masa','Gy = J/kg. No confundir con dosis efectiva.'],['Dosis equivalente','Hᵀ = Σ wᴿ · Dᵀ,ᴿ','Dosis absorbida ponderada por tipo de radiación, en sievert.'],['Dosis efectiva','E = Σ wᵀ · Hᵀ','Suma por órganos y tejidos ponderada por sensibilidad, en sievert.']],
[['Magnitud','Símbolo','Unidad','Qué mide'],['Actividad','A','Bq','Desintegraciones por segundo'],['Dosis absorbida','D','Gy','Energía depositada por masa'],['Dosis equivalente','Hᵀ','Sv','Efecto ponderado por radiación'],['Dosis efectiva','E','Sv','Ponderación por tejidos']],
[['1. Por qué una radiación es ionizante','Los átomos tienen protones, neutrones y electrones. Un fotón con energía suficiente puede arrancar un electrón, convirtiendo el átomo en un ion. Los rayos X y gamma son electromagnéticos, mientras que partículas alfa y beta son corpusculares. La clasificación importa porque su penetración y efecto dependen del tipo y energía.','Ionización = expulsar un electrón; excitación = cambiar su estado energético sin arrancarlo.'],['2. Ejemplo de magnitudes','Una fuente con actividad de 500 Bq experimenta, en promedio, 500 desintegraciones por segundo. Una dosis absorbida de 0,002 Gy equivale a 2 mGy. En radiodiagnóstico debes fijarte si la pregunta se refiere a Bq, Gy o Sv: expresan conceptos distintos.','No conviertas directamente Bq en Sv sin información adicional.']],
'Bq → actividad; Gy → energía absorbida; Sv → dosis ponderada. Son unidades distintas.'),
make('pr-t2','TEMA 2 · Interacciones de los fotones y etapas del daño','Cómo interacciona la radiación con electrones y cómo esos procesos originan daños químicos y celulares.',2,4,
[['Ley exponencial de atenuación','I = I₀ · e^(−μx)','Modelo de haz estrecho monoenergético; μ es el coeficiente lineal de atenuación.'],['Capa hemirreductora','CHR = ln(2) / μ','Grosor que reduce a la mitad la intensidad en el modelo exponencial.']],
[['Interacción','Qué ocurre','Fotón tras interacción'],['Fotoeléctrico','Se absorbe totalmente y expulsa electrón','Desaparece'],['Compton','Cede parte de energía y se dispersa','Continúa con menor energía'],['Pares','Genera electrón y positrón','Requiere energía ≥ 1,022 MeV']],
[['1. Tres etapas en orden','La etapa física ocurre cuando la radiación interacciona con el medio y transfiere energía. En la química se generan moléculas reactivas y alteraciones de componentes celulares. En la biológica aparecen respuestas como reparación, mutación o muerte celular. Son etapas distintas de un mismo fenómeno.','Física → Química → Biológica.'],['2. Cómo distinguir fotoeléctrico y Compton','En el efecto fotoeléctrico el fotón incidente se absorbe por completo. En Compton interactúa con un electrón y emerge dispersado con menos energía. Los dos pueden influir en imagen y dosis. La producción de pares es un mecanismo de muy alta energía y no es el mecanismo usual de la radiografía diagnóstica.','Fotoeléctrico = absorción completa; Compton = dispersión.']],
'Física = ionizar; química = radicales; biología = respuesta celular.'),
make('pr-t3','TEMA 3 · Daño celular y efectos biológicos','Diferencia la acción directa de la indirecta, los efectos estocásticos y las reacciones tisulares.',4,6,[],
[['Efecto','Dosis umbral para protección','Qué cambia con dosis','Ejemplo'],['Estocástico','No se supone un umbral demostrado','Aumenta probabilidad','Riesgo de cáncer'],['Reacción tisular','Habitualmente sí','Puede aumentar gravedad','Eritema o catarata por dosis suficiente']],
[['1. Acción directa e indirecta','La acción directa ocurre si se transfiere energía a una biomolécula crítica, como el ADN. En la indirecta, la radiación puede producir radicales por radiólisis del agua que reaccionan con biomoléculas. En ambas se pueden formar lesiones que la célula intenta reparar.','Directa = radiación alcanza la diana. Indirecta = radical libre actúa sobre ella.'],['2. Riesgo y gravedad no son lo mismo','Los efectos estocásticos se abordan por su probabilidad de aparición; aumentar dosis eleva el riesgo. Las reacciones tisulares requieren superar determinados umbrales y su gravedad puede aumentar con la dosis. En exámenes a veces se llaman deterministas, pero el término actual preferido es reacciones tisulares.','Estocástico = probabilidad. Tisular = umbral y gravedad.']],
'Recuerda que no todos los efectos aparecen inmediatamente; algunos tienen latencia.'),
make('pr-t4','TEMA 4 · Radiosensibilidad y detección','De qué depende el daño de los tejidos y cómo se mide una radiación invisible.',6,8,[],
[['Detector','Principio físico','Ejemplo de uso'],['Cámara de ionización','Ionización de gas','Medidas dosimétricas'],['Geiger-Müller','Amplificación gaseosa','Detectar o contar eventos'],['Centelleo','Luz emitida por material excitado','Medición de radiaciones'],['Semiconductor','Pares de carga en sólido','Detectores y sistemas de imagen']],
[['1. Por qué hay células más sensibles','La respuesta depende de la división celular, maduración, reparación, oxigenación y tipo de exposición. Muchos tejidos con alta proliferación muestran mayor radiosensibilidad. La regla orienta, pero no sustituye el conocimiento de respuestas específicas.','Mayor proliferación suele asociarse a más sensibilidad.'],['2. El detector convierte energía en señal','La radiación no puede reconocerse con los sentidos humanos. Los detectores generan señales eléctricas, luz u otras respuestas medibles. Cada tipo tiene rangos y finalidades distintas; elegirlo requiere conocer qué magnitud se pretende medir.','Gas = carga; centelleador = luz; semiconductor = portadores de carga.']],
'El detector mide radiación, no protege por sí mismo frente a ella.'),
make('pr-t5','TEMA 5 · Tipos de exposición y ley del inverso del cuadrado','La protección radiológica operacional aplica justificación, optimización y medidas de tiempo, distancia y blindaje.',8,10,
[['Ley de distancia','I₂ = I₁ × (d₁ / d₂)²','Para una fuente puntual ideal, sin blindaje ni dispersión; si duplicas distancia la intensidad cae a 1/4.'],['Dosis por tiempo','D ≈ tasa de dosis × tiempo','Si una tasa es constante: 2 mSv/h durante 0,5 h corresponde a 1 mSv.']],
[['Distancia relativa','Intensidad relativa','Comentario'],['1 ×','100 %','Situación de referencia'],['2 ×','25 %','1/4 de la inicial'],['3 ×','11,1 %','1/9 de la inicial'],['4 ×','6,25 %','1/16 de la inicial']],
[['1. Paciente, trabajador y población','La exposición ocupacional procede del trabajo; la médica está relacionada con pruebas o tratamientos; la del público corresponde a otras personas. Los límites de dosis no se aplican a la exposición médica del paciente de la misma forma que a trabajadores y público: su protección se centra en justificación y optimización.','No digas que el paciente tiene un límite legal fijo de dosis para cualquier prueba.'],['2. Ejemplo resuelto: aumentar la distancia','A 3 metros la tasa es 10 mSv/h en un modelo puntual ideal. A 8 metros: I₂ = 10 × (3/8)² = 10 × 9/64 = 1,40625 mSv/h. Redondeando: 1,41 mSv/h. Una fuente real puede requerir un análisis distinto por geometría y dispersión.','El resultado cambia por el CUADRADO de la razón de distancias.']],
'Tiempo ↓, distancia ↑ y blindaje adecuado = menos exposición externa.'),
make('pr-t6','TEMA 6 · Dosimetría y clases de instalaciones radiactivas','Conoce el uso de dosímetros, señalización y diferencias entre fuentes selladas y abiertas.',10,12,[],
[['Fuente','Irradiación externa','Contaminación posible'],['Encapsulada','Sí','No se espera dispersión durante uso normal'],['No encapsulada','Sí','Sí, externa o interna']],
[['1. Qué es un dosímetro','Un dosímetro personal registra dosis de exposición del trabajador y permite el seguimiento ocupacional. Debe utilizarse según protocolos y posición prescrita. No reduce la exposición, igual que un termómetro no baja la fiebre. La protección real depende de reducir tiempo, aumentar distancia, poner blindaje y optimizar la tarea.','Dosímetro = registra. Delantal y barreras = atenúan.'],['2. Fuente encapsulada y abierta','Una fuente encapsulada tiene material contenido y sellado, de forma que normalmente no puede dispersarse. La no encapsulada se manipula en condiciones en las que es posible la contaminación. En medicina nuclear cobra importancia prevenir la incorporación y dispersión de radionúclidos.','Irradiación ≠ contaminación: puedes recibir radiación sin que haya material sobre ti.']],
'Identifica primero el tipo de fuente y luego su riesgo dominante.'),
make('pr-t7','TEMA 7 · Salas de radiodiagnóstico y medicina nuclear','Diferencias de diseño, fuentes de exposición y protecciones para instalaciones sanitarias.',12,14,[],
[['Radiación','Origen','Blindaje considerado'],['Primaria','Haz útil del tubo','Barrera primaria'],['Dispersa','Interacción con pacientes y objetos','Barrera secundaria'],['Fuga','Radiación no deseada del alojamiento del tubo','Barrera secundaria']],
[['1. Tres radiaciones en una sala de rayos X','La primaria forma el haz de trabajo. La dispersa aparece cuando la radiación interacciona con el paciente o materiales y cambia de dirección. La de fuga atraviesa el alojamiento del tubo fuera de la dirección útil. Las barreras de sala se calculan según esas componentes, uso del equipo y ocupación de áreas vecinas.','Primaria = directa; dispersa = desviada; fuga = sale del tubo fuera del haz útil.'],['2. Medicina nuclear: control del material radiactivo','Las fuentes usadas en medicina nuclear pueden incluir viales, jeringas, residuos y pacientes que ya han recibido radiofármacos. Se controla tanto la irradiación externa como la posibilidad de contaminación. En diseño de salas se consideran características de radionúclidos, actividad y operaciones previstas.','En medicina nuclear: riesgo externo + posible contaminación.']],
'En radiodiagnóstico habitual se controla sobre todo irradiación externa.'),
make('pr-t8','TEMA 8 · Residuos, semiperiodo y transporte','Reconoce cómo clasificar residuos y qué significa la disminución de actividad con el tiempo.',14,16,
[['Ley del decaimiento','A(t) = A₀ × 2^(−t/T½)','T½ es el periodo físico de semidesintegración.'],['Constante de desintegración','λ = ln(2) / T½','Se expresa en unidades inversas de tiempo.'],['Índice de transporte','IT = 100 × tasa de dosis (mSv/h) a 1 metro','Regla general de cálculo antes de redondeos y condiciones normativas.']],
[['Semiperiodos transcurridos','Actividad restante','Porcentaje'],['0','A₀','100 %'],['1','A₀/2','50 %'],['2','A₀/4','25 %'],['3','A₀/8','12,5 %'],['4','A₀/16','6,25 %']],
[['1. Por qué separar residuos','No todos los residuos tienen las mismas emisiones ni duración de actividad. Separarlos correctamente y etiquetar evita exposiciones o mezclas de riesgo. Los sistemas de almacenamiento por decaimiento requieren el control autorizado de tiempos, actividades y vías de gestión.','Segregar, identificar, almacenar y gestionar de acuerdo con el protocolo.'],['2. Ejemplo de semiperiodo','Un vial tiene 80 MBq y su periodo físico es de 6 horas. Después de 12 horas han pasado dos semiperiodos: 80 → 40 → 20 MBq. El cálculo es ideal para decaimiento físico y no incluye eliminación biológica.','Cada semiperiodo divide la actividad por 2.']],
'Nunca confundir actividad (Bq) con dosis (Gy o Sv).'),
make('pr-t9','TEMA 9 · Emergencias, control y garantía de calidad','Procedimientos ante incidentes, documentación, controles y mejora continua.',16,18,[],
[['Concepto','Qué significa','Ejemplo'],['Garantía de calidad','Sistema global organizado','Programa de controles'],['Control de calidad','Prueba específica de verificación','Medir constancia de equipo'],['Acción correctiva','Respuesta a resultado no conforme','Revisión y reparación'],['Simulacro','Ensayo del plan de emergencia','Practicar evacuación']],
[['1. Qué hacer ante una incidencia','No se debe improvisar la manipulación de una fuente ni exponerse para corregir un problema fuera de las propias competencias. El personal debe comunicar la anomalía y seguir el plan de emergencia y normas internas de actuación; los responsables coordinan atención de afectados, avisos reglamentarios y documentación.','Alerta al responsable → activar plan → atender afectados → registrar y notificar.'],['2. Diferenciar garantía y control','El control es una medición o verificación concreta; la garantía de calidad es el conjunto de procedimientos que asegura que esas mediciones se hagan, registren e interpreten. Los resultados se comparan con criterios aceptables y las desviaciones conducen a medidas correctivas.','Garantía = sistema; control = prueba; registro = evidencia.']],
'El plan de emergencia debe practicarse y estar disponible para el personal.')
];

/* Actividades de clase incorporadas a cada unidad de Protección Radiológica. */
radiationTopics.forEach((topic,i)=>{const qs=radioprotectionClassroom['t'+(i+1)]||[];topic.questions.push(...qs);});
/* Banco común: usado por tests de tema, tests mixtos, Kahoot y Preguntados. */
const detectorTopic=radiationTopics.find(topic=>topic.id==='pr-t4');
if(!detectorTopic)throw new Error('No se encontró el tema 4 de Protección Radiológica');
detectorTopic.questions.push(...detectorEfficiencyProblems);
detectorTopic.formulas.push(
 ['Eficiencia extrínseca geométrica','EE = (rayos que llegan al detector / rayos emitidos) × 100','Se expresa en %. En estos ejercicios mide la proporción de los emitidos que alcanza el detector.'],
 ['Eficiencia intrínseca','EI = (rayos que generan señal / rayos que llegan al detector) × 100','Se expresa en %. Mide la fracción de partículas incidentes que se detecta.']
);
detectorTopic.sections.push(
 ['Ejercicios de eficiencia de detectores','En este apartado hay 30 problemas: 15 de eficiencia extrínseca y 15 de eficiencia intrínseca. Primero identifica qué cantidad va en el numerador y cuál en el denominador. EE = llegan / emitidos × 100; EI = detectados / llegan × 100. Comprueba que el resultado esté entre 0 % y 100 %.','EE: llegan frente a emitidos. EI: detectados frente a llegan.']
);


/* VT4 RA2 (primera parte), páginas 1-31: conceptos, lesiones y repaso visual. */
for(const id of ['pr-t2','pr-t3']){
 const topic=radiationTopics.find(x=>x.id===id);
 if(!topic)throw new Error('Falta el tema de radiobiología '+id);
 topic.questions.push(...vt4Ra2Questions[id]);
}
radiationTopics.find(x=>x.id==='pr-t2').questions.push(...vt4Ra2VisualQuestions);
radiationTopics.find(x=>x.id==='pr-t2').sections.push(
 ['VT4 RA2: etapas física, química y biológica','La etapa física comprende la transferencia de energía, excitación e ionización. Entre las interacciones de los fotones están fotoeléctrico (absorción completa), Compton (fotón dispersado con menor energía) y producción de pares (electrón y positrón; umbral aproximado de 1,022 MeV). Después, la etapa química puede afectar directamente a moléculas críticas o generar radicales por radiólisis del agua, seguidos de respuestas biológicas.','Física → química → biológica. Fotoeléctrico: absorción; Compton: dispersión; pares: electrón + positrón.']
);
radiationTopics.find(x=>x.id==='pr-t3').sections.push(
 ['VT4 RA2: estructura, lesión y reparación del ADN','El ADN es una doble hélice de nucleótidos con azúcar, fosfato y base. La radiación puede modificar bases y originar lesiones de una o dos hebras; estas últimas son especialmente complejas de reparar. Enzimas celulares pueden reparar muchas lesiones, pero otras comprometen la viabilidad o la reproducción de la célula. La presentación distingue muerte celular inmediata y diferida tras intentos de división.','Rotura de una hebra: habitualmente más reparable; rotura doble: lesión compleja.'],
 ['VT4 RA2: dosis efectiva de un solo órgano','En el ejercicio de la presentación, la contribución del hígado a la dosis efectiva se calcula multiplicando la dosis equivalente de 10 Sv por el factor de ponderación tisular del hígado de 0,04: E = 0,4 Sv. Es un ejemplo matemático de protección radiológica.','E = H del órgano × factor tisular; 10 × 0,04 = 0,4 Sv.']
);
