/* Capítulos agrupados a partir de los materiales de estudio ya introducidos.
 * Cada VT/tema es una unidad de lectura única y sus preguntas proceden exclusivamente
 * de los apartados de esa unidad. Los capítulos son resúmenes originales, no copias de PDFs. */
import {englishBook} from './english-book.js';
import {patientPart1} from './patient-part1.js';
import {patientPart2} from './patient-part2.js';
import {patientPart3} from './patient-part3.js';
import {patientPart4} from './patient-part4.js';
import {patientPart5} from './patient-part5.js';
import {patientClassroomExtra} from './patient-classroom-extra.js';
import {forensicBook} from './forensic-book.js';
import {forensicExamSets} from './forensic-exams.js';
import {classroomQuestions} from './classroom-questions-2026.js';
import {ipe1Book} from './ipe1-book.js';
import {protectionBookA} from './protection-book-a.js';
import {protectionBookB} from './protection-book-b.js';

function toSections(units){
 return units.map((l,i)=>{
  const label=l.title.replace(/^VT\d+ · /,'').replace(/^Tema \d+ · /,'').replace(/^UF\d+ · /,'');
  const parts=(l.points||[]).map(([term,definition])=>term+': '+definition.replace(/\.$/,'')+'.').join(' ');
  const intro=l.intro||'';
  const formulas=l.formula?' Estructura o fórmula clave: '+l.formula+'.':'';
  const practical=l.example?' Ejemplo aplicado: '+l.example:'';
  return [(i+1)+'. '+label,intro+' '+parts+formulas+practical,(l.tip||l.summary||'')];
 });
}
function chapter(id,subject,title,description,units,source){
 const qs=units.flatMap(l=>l.questions||[]);
 return {id,subject,title,intro:description,sections:toSections(units),questions:qs,
   tip:units.map(l=>l.tip||l.summary).filter(Boolean).join(' · '),
   sourceLabel:source,verified:true};
}
const englishDescriptions={
2:'Pronombres personales, posesivos y tiempos presentes. Aprende a formar correctamente frases de atención al paciente y a distinguir quién realiza y quién recibe una acción.',
3:'Tiempos presentes y perfectos: hábitos frente a acciones actuales, experiencias, resultados y duración. Comprende los auxiliares, participios y expresiones for y since.',
4:'Narración en pasado: past simple, past continuous y unión de acciones mediante when y while. Compara lo que pasó con lo que estaba pasando.',
5:'Pasado anterior, duración anterior, comparativos y superlativos. Relaciona los hechos de una narración y aprende a comparar características.',
6:'Formas verbales de futuro: will, going to, future continuous y future perfect. Escoge la estructura según decisión, plan, acción en curso o resultado futuro.',
7:'Verbos modales para capacidad, permiso, necesidad y consejo; intensificadores para expresar exceso, suficiencia y grado.'};
const englishTitles={
2:'VT2 · Pronouns, Present Simple y Present Continuous',
3:'VT3 · Present Simple/Continuous y Present Perfect',
4:'VT4 · Past Simple, Past Continuous, When y While',
5:'VT5 · Past Perfect y comparatives/superlatives',
6:'VT6 · Future tenses: will, going to, continuous y perfect',
7:'VT7 · Modal verbs e intensifiers'};
const engl=[2,3,4,5,6,7].map(v=>chapter('eng-vt'+v+'-full','ingles',englishTitles[v],englishDescriptions[v],
 englishBook.filter(l=>l.title.startsWith('VT'+v+' · ')),'Videotutoría '+v+' de Inglés aportada por el alumno'));
engl.forEach((book,i)=>{book.questions.push(...(classroomQuestions.english[i+2]||[]));});
const patientParts=[patientPart1,patientPart2,patientPart3,patientPart4,patientPart5];
const patientTitles=['TEMA 1 · El sistema de salud','TEMA 2 · Acogida del paciente','TEMA 3 · Comunicación y apoyo psicológico','TEMA 4 · Observación del paciente','TEMA 5 · Preparación, higiene y movilización del paciente'];
const patientIntros=[
 'Conoce los niveles del sistema sanitario, las diferencias entre prevención y promoción, la organización del servicio de imagen, el almacén y la calidad asistencial.',
 'Todo el proceso de acogida, desde cita e identificación hasta la documentación clínica, facturación, consentimiento y preparación de pruebas.',
 'Comunícate de forma efectiva con pacientes de diferentes edades, reconoce barreras, comprende emociones y utiliza escucha activa y apoyo psicológico adecuado.',
 'Aprende a observar estado general, registrar constantes vitales, reconocer la escala de Glasgow y atender a pacientes con diferentes necesidades.',
 'Revisa las necesidades humanas y determinantes de salud, los procedimientos de higiene y confort y las técnicas de movilización con seguridad.' ];
const patient=patientParts.map((p,i)=>chapter('patient-'+(i+1)+'-full','atencion',patientTitles[i],patientIntros[i],p,'Videotutorías y ampliaciones del Tema '+(i+1)+' de Atención al Paciente'));
patient.forEach((book,i)=>book.questions.push(...patientClassroomExtra['t'+(i+1)]));
const f1=forensicBook.filter(l=>/VT2 |VT3 /.test(l.title));
const f2=forensicBook.filter(l=>/VT4 |VT5 |VT6 /.test(l.title));
const f3=forensicBook.filter(l=>/VT7 /.test(l.title));
const forensic=[
chapter('forense-vt-1-full','forense','TEMA 1 · Tóxicos y muestras de interés forense','Definición de ciencia forense, cadena de custodia, toxicología, intoxicación, tipos de muestra y técnicas para identificar y confirmar compuestos.',f1,'VT2 y VT3 de Laboratorio de Ciencias Forenses'),
chapter('forense-vt-2-full','forense','TEMA 2 · Técnicas genéticas, microbiológicas, bioquímicas e histoquímicas','ADN y PCR, filiación, cultivos y detección de microorganismos, cambios post mortem, tanatoquimia, histopatología y tinciones.',f2,'VT4, VT5 y VT6 de Laboratorio de Ciencias Forenses'),
chapter('forense-vt-3-full','forense','TEMA 3 · Necroidentificación y sucesos con múltiples víctimas','Procedimientos forenses de identificación en catástrofes, comparación de datos ante mortem y post mortem, odontología, antropología y genética.',f3,'VT7 de Laboratorio de Ciencias Forenses')
];
/* Replace the basic dictionary-only tests with varied exams that ask about methods,
 * sample handling, real decision-making, interpretation and identification. */
forensic.forEach((book,index)=>{book.questions=forensicExamSets[index];});
forensic[0].questions.push(...classroomQuestions.forensic[0]);
forensic[1].questions.push(...classroomQuestions.forensic[1]);
const disasterQuestions=[
['¿Cuál es la finalidad central de la necroidentificación?',['Establecer identidad de una persona fallecida','Averiguar únicamente la fecha de nacimiento','Detectar exclusivamente intoxicaciones','Determinar siempre una causa penal'],0,'La identidad se establece mediante métodos científicos y comparaciones verificables.'],
['En una investigación de víctimas de catástrofe, ¿qué significa DVI?',['Document Visual Inspection','Disaster Victim Identification','Data Verification Initiative','Disease Vector Imaging'],1,'DVI describe procedimientos de identificación de víctimas de desastres.'],
['¿Qué registros se consideran ante mortem?',['Los tomados durante la autopsia exclusivamente','Los obtenidos del cadáver','Los obtenidos cuando la persona estaba viva','Los de una muestra anónima'],2,'Ante mortem son datos conocidos anteriores al fallecimiento.'],
['¿Cuál es un método primario de identificación utilizado en DVI?',['Coincidencia visual de la ropa exclusivamente','Valoración de peinado','Perfil dental comparado con registros previos','Estimación subjetiva de estatura exclusivamente'],2,'El cotejo odontológico puede aportar identificación científica sólida.'],
['¿Qué aportan habitualmente los restos dentales?',['Información comparativa resistente a ciertas condiciones adversas','Solo el grupo sanguíneo','El momento exacto de muerte','La identificación sin datos de referencia'],0,'Las características dentales pueden compararse con datos dentales ante mortem.'],
['¿Para qué sirve la comparación AM/PM?',['Para evitar realizar registros','Para contrastar información de una persona conocida con hallazgos del fallecido','Para mezclar muestras de cuerpos diferentes','Solo para estudiar tóxicos'],1,'El contraste de datos ante mortem y post mortem es central en DVI.'],
['¿Qué debe preservarse al trasladar restos o muestras en una catástrofe?',['La apariencia de la bolsa exclusivamente','La cadena de custodia y trazabilidad','El anonimato de todo operador incluso en registros','Solo la temperatura ambiente'],1,'Los registros permiten asegurar correspondencia entre muestra, resultado y persona.'],
['¿Qué especialidad es útil para estudiar restos esqueléticos?',['Antropología forense','Optometría clínica','Cardiología','Audiología'],0,'La antropología forense estudia restos óseos en el contexto legal.']
];
/* Legacy definition-based questions intentionally excluded from chapter exams. */
const ipe1=[
chapter('ipe1-book-1','ipe1','TEMA 1 · Características del sector productivo y perfil profesional','Conoce dónde puede trabajar un técnico de Imagen para el Diagnóstico, qué perfiles se exigen y las diferencias entre oferta pública y privada.',ipe1Book.filter(l=>l.title.startsWith('Tema 1')),'Material de IPE1: Tema 1 · sector productivo'),
chapter('ipe1-book-2','ipe1','TEMA 2 · Prevención de riesgos laborales','Identifica peligros, riesgos, consecuencias y medidas de prevención. Estudia riesgos físicos, químicos, biológicos, psicosociales, protección y emergencias.',ipe1Book.filter(l=>l.title.startsWith('Tema 2')),'VT3–VT5 de IPE1: Prevención de riesgos laborales'),
chapter('ipe1-book-3','ipe1','TEMA 3 · Análisis de las condiciones laborales','Repasa contrato de trabajo, salario, nómina, derechos y deberes, convenio colectivo y protección de Seguridad Social.',ipe1Book.filter(l=>l.title.startsWith('Tema 3')),'VT del Tema 3 y material de IPE1: Condiciones laborales')
];
const allPR=[...protectionBookA,...protectionBookB];
const protection=[
chapter('pr-slides-uf-1','proteccion','BLOQUE 1 · Radiobiología, dosimetría y protección operacional','La radiación ionizante, sus unidades, la interacción con la materia viva, efectos celulares, detectores y medidas de protección del trabajador y del paciente.',allPR.slice(0,11),'Diapositivas VT2 a VT6 de Protección Radiológica'),
chapter('pr-slides-uf-2','proteccion','BLOQUE 2 · Instalaciones, materiales y residuos radiactivos','Identifica tipos de fuentes, riesgos de contaminación, salas de radiodiagnóstico y medicina nuclear y gestión y transporte de residuos radiactivos.',allPR.slice(11,16),'Diapositivas VT7 a VT9 de Protección Radiológica'),
chapter('pr-slides-uf-3','proteccion','BLOQUE 3 · Emergencias y garantía de calidad','Organización y activación de planes de emergencia radiológica, notificación, control de calidad y documentación técnica.',allPR.slice(16,18),'Diapositivas VT10 y UF3 de Protección Radiológica')];

/* Additional original explanatory sections on short chapters, grounded in available course material. */
forensic[2].sections.push(
 ['2. ¿Por qué es tan importante identificar a las víctimas?','En una gran catástrofe puede haber restos fragmentados, dañados por el fuego o alterados por el tiempo. El reconocimiento visual puede no ser suficiente ni fiable. La identificación científica aporta certeza a las familias, permite realizar trámites legales y ayuda a investigaciones judiciales. Se busca una correspondencia demostrable entre restos y persona, no una hipótesis basada en aspecto o ropa.','No confundas reconocer visualmente con identificar mediante criterios científicos.'],
 ['3. Fases del trabajo: documentación ante mortem','Los especialistas recopilan información conocida antes del fallecimiento: registros dentales, huellas dactilares, historiales de intervenciones o perfiles genéticos de referencia cuando procede. Cada dato debe tener un origen documentado y tratarse con confidencialidad. La calidad de la identificación depende de disponer de referencias fiables.','AM = before, antes de morir. PM = after, datos obtenidos tras la muerte.'],
 ['4. Examen post mortem de restos','Durante el estudio de restos se registran condiciones de recuperación, detalles anatómicos y muestras disponibles. Odontología forense, dactiloscopia, antropología y genética pueden aportar datos complementarios; la elección depende del estado del material. La trazabilidad es esencial para evitar mezclar muestras, atribuir indebidamente restos o perder información del contexto.','Etiquetado, conservación y cadena de custodia no son trámites secundarios: protegen la validez del resultado.'],
 ['5. Cotejo y validación de una identidad','Se comparan características observadas post mortem con información ante mortem de una persona. El análisis debe considerar concordancias, discordancias y calidad de cada prueba. Una coincidencia importante se valida según los procedimientos de identificación; una similitud superficial no garantiza identidad. Los resultados deben quedar registrados en informes verificables.','Una identidad forense se confirma con pruebas suficientemente sólidas y validadas, no por intuición.'],
 ['6. Valor legal, judicial y humanitario','La necroidentificación permite gestionar la inscripción de defunciones, contribuye a investigaciones y facilita devolver los restos a sus familias. El tratamiento respetuoso de las víctimas y de los datos personales forma parte de la actuación técnica. La comunicación oficial de identidad corresponde a los responsables autorizados.','Tres valores: LEGAL, JUDICIAL y HUMANITARIO.']
);
ipe1[0].sections.push(
 ['3. Sectores y salidas profesionales de Imagen para el Diagnóstico','El sector sanitario pertenece principalmente a las actividades de servicios. Un titulado en Imagen para el Diagnóstico y Medicina Nuclear puede desarrollar funciones en entornos hospitalarios, centros especializados y unidades dedicadas a técnicas de imagen, según habilitaciones y requisitos. Es útil estudiar la demanda real de perfiles, la formación requerida y las especializaciones que ofrece cada puesto.','No confundas el nombre del título con la descripción concreta del puesto ofertado. Hay que revisar requisitos.'],
 ['4. Competencias técnicas frente a transversales','Las competencias técnicas incluyen manejar equipos y aplicar protocolos de forma segura; las transversales incluyen comunicación, trabajo en equipo, organización y adaptación a cambios. Una persona puede conocer la teoría pero necesitar mejorar cómo se comunica con pacientes o colabora en una unidad. El perfil profesional combina formación, experiencia, competencias y actitud.','Técnicas = saber hacer una tarea especializada. Transversales = cómo trabajas en diferentes situaciones.'],
 ['5. Empleo público y privado','La oferta pública suele seguir procedimientos regulados de selección, como oposición o concurso-oposición, según plazas y convocatoria. En el sector privado son habituales la selección curricular, pruebas y entrevistas. Las condiciones de jornada, salario y funciones dependen de contratos, normas y convenios aplicables. Comparar ofertas exige mirar todos los requisitos, no solo el sueldo anunciado.','Concurso = valoración de méritos. Oposición = pruebas. Concurso-oposición = combinación de ambos.'],
 ['6. Cómo analizar una oferta de trabajo','Primero identifica el puesto y las funciones reales. Después comprueba titulación, experiencia, idiomas y formación complementaria exigidos. Por último revisa jornada, contrato, turnos, centro de trabajo, remuneración y condiciones de desarrollo profesional. Esta comparación permite saber qué competencias te faltan y convertirlas en un plan de mejora.','Puesto → requisitos → condiciones → mis competencias → plan para cubrir carencias.']
);
ipe1[2].sections.push(
 ['3. El contrato y la relación laboral','El contrato recoge compromisos de una persona trabajadora y una empresa. Existen modalidades contractuales con requisitos concretos; no todas las relaciones de prestación de servicios son idénticas. Al valorar un contrato hay que revisar jornada, grupo profesional, funciones, período de prueba y convenio aplicable. La legislación actual prevalece sobre versiones antiguas del temario en materia de derechos.','Antes de firmar, comprueba el convenio y las condiciones por escrito.'],
 ['4. Conceptos de una nómina','La nómina separa percepciones salariales y extrasalariales, bases utilizadas para cotización y deducciones. El bruto no es lo mismo que el neto que llega a la cuenta: la diferencia corresponde a conceptos como cotizaciones de la persona trabajadora y retenciones. Para entender un recibo salarial hay que revisar todas las partidas, no multiplicar solo la tarifa por las horas.','Bruto − deducciones = neto. La base de cotización no tiene por qué coincidir exactamente con el neto.'],
 ['5. Convenio colectivo y representación','Los convenios colectivos pactados para un determinado ámbito regulan condiciones como tablas salariales, categorías, descansos o complementos, respetando el marco legal. Los sindicatos y representantes del personal canalizan intereses colectivos. Hay que identificar qué convenio aplica a un centro o actividad: no basta con escoger uno parecido.','Un convenio es una norma pactada para un ámbito concreto.'],
 ['6. Seguridad Social y prestaciones','La afiliación identifica a la persona en el sistema, el alta comunica el inicio de una situación incluida y la cotización permite financiar prestaciones. Estas pueden referirse a incapacidad temporal, desempleo o jubilación si se cumplen los requisitos específicos. No todas las ayudas exigen el mismo tiempo de cotización ni se calculan igual.','Afiliación = pertenencia; alta = situación laboral; cotización = aportación; prestación = protección.']
);
protection[2].sections.push(
 ['3. Qué debe contener un plan de emergencia','Un plan de emergencia identifica situaciones posibles, responsables, comunicaciones y procedimientos. La actuación suele comenzar al reconocer y comunicar la incidencia; después se aplica el plan de la instalación, se atiende al personal afectado y se realizan notificaciones y registros según requisitos vigentes. No se deben improvisar manipulaciones de fuentes o entrar en zonas restringidas sin capacitación.','El papel del técnico es seguir procedimientos y activar los canales de aviso establecidos.'],
 ['4. Cómo se comprueba la calidad de los equipos','Los controles periódicos evalúan que determinados parámetros se mantengan dentro de tolerancias. Puede medirse constancia de salida, calidad de imagen u otros aspectos definidos por los protocolos de una instalación. La garantía de calidad incluye responsabilidades, calendarios, documentación y respuesta ante anomalías. Un resultado fuera de tolerancia necesita revisión y acción correctiva.','Control = medición concreta; garantía = sistema organizado que asegura la calidad.'],
 ['5. Registros y mejora continua','Documentar los controles permite comprobar tendencias, detectar deterioros y justificar la toma de decisiones. El registro debe indicar fecha, responsable, equipo, procedimiento y resultado, junto con la corrección realizada cuando corresponda. La formación del personal y los simulacros ayudan a poner a prueba la preparación real frente a emergencias.','Registrar no es burocracia sin valor: permite identificar fallos antes de que generen problemas.']
);
ipe1.forEach(x=>x.sourceLabel='Síntesis original basada en el índice y el material del libro IPE1 disponible en Drive; contraste de cada diapositiva de clase pendiente.');
engl.forEach(x=>x.sourceLabel='Guía de práctica organizada según videotutorías de Inglés 2–7 facilitadas por el alumno; ejemplos originales pendientes de contraste pormenorizado con los PDF.');
patient.forEach(x=>x.sourceLabel='Guía de práctica organizada según los temas 1–5 de las videotutorías de Atención al Paciente; pendiente de cotejo pormenorizado de diapositivas.');
export const classStudyBooks=[...engl,...patient,...forensic,...ipe1,...protection];
