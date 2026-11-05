import {buildModule} from './drive-book-engine.js';
const q=(p,r,w,y)=>[p,[r,...w],0,y];
const u=[
['Fundamentos de la resonancia magnética','La RM crea imágenes mediante la interacción de núcleos de hidrógeno con campos magnéticos y pulsos de radiofrecuencia. No utiliza rayos X y ofrece gran contraste de tejidos blandos.',[
['Campo magnético B0','Es el campo estático principal del equipo y orienta parcialmente los momentos magnéticos de los protones. Su intensidad se expresa en teslas.','Una máquina genera un campo estático intenso para ordenar momentos magnéticos antes de aplicar radiofrecuencia: ¿qué campo se usa?'],
['Precesión de Larmor','Los momentos magnéticos giran alrededor del campo a una frecuencia relacionada con su intensidad. Determina la frecuencia de resonancia necesaria.','Un técnico relaciona el campo magnético con la frecuencia de giro de protones: ¿qué fenómeno estudia?'],
['Pulso de radiofrecuencia','Un pulso adecuado altera la magnetización y provoca que pueda detectarse señal durante el retorno al equilibrio. Se combina con gradientes para localizarla.','Se aplica energía electromagnética a frecuencia de resonancia para excitar protones: ¿qué se utiliza?'],
['Relajación T1','Describe la recuperación de magnetización longitudinal tras la excitación. Los tejidos poseen valores distintos y permiten contraste T1.','Una secuencia destaca diferencias de recuperación longitudinal de la magnetización: ¿qué mecanismo predomina?'],
['Relajación T2','Describe la pérdida de coherencia de la magnetización transversal debida a interacciones de espines. Contribuye al contraste de distintas secuencias.','La señal disminuye por pérdida progresiva de coherencia transversal: ¿qué tiempo caracteriza el fenómeno?'],
['Gradientes','Campos que varían espacialmente y permiten seleccionar cortes y codificar posición. Son esenciales para reconstruir la señal anatómica.','Un equipo diferencia de qué lugar procede una señal usando cambios de campo según posición: ¿qué elemento emplea?']
],[
q('¿Utiliza la resonancia magnética radiación ionizante?','No; emplea magnetismo y radiofrecuencia',['Sí, siempre rayos X','Sí, siempre gamma','Solo cuando estudia cerebro'],'La RM no se basa en ionización mediante rayos X.'),
q('¿En qué unidad se expresa el campo principal de una RM?','Tesla',['Becquerel','Gray','Sievert'],'El tesla mide campo magnético.'),
q('¿Qué variable se relaciona con la frecuencia de Larmor?','Intensidad del campo magnético',['Altura del paciente exclusivamente','Temperatura exterior del edificio','Número de correos electrónicos'],'La frecuencia de precesión depende del campo y del tipo de núcleo.'),
q('¿Qué función tienen los gradientes?','Codificación espacial de la señal',['Producir radiofármacos','Convertir radiación en rayos X','Eliminar la necesidad de bobinas'],'Los gradientes permiten localizar señal en la imagen.')
]],
['Equipos, bobinas y secuencias de RM','El equipo incluye imán, gradientes, bobinas transmisoras y receptoras, sistemas de control y dispositivos de seguridad. TR, TE y tipos de secuencia influyen en contraste y duración.',[
['Bobina de recepción','Recoge la señal de radiofrecuencia emitida por los tejidos. Seleccionar una bobina apropiada mejora relación señal-ruido.','Para obtener señal de una rodilla se instala una antena diseñada para esa región: ¿qué componente es?'],
['Bobina phased array','Combina varios elementos de recepción y puede facilitar adquisición paralela o mejor cobertura. La disposición afecta a la señal obtenida.','Un equipo usa múltiples canales de recepción próximos a una región anatómica: ¿qué tipo de bobina emplea?'],
['Tiempo de repetición (TR)','Es el intervalo entre excitaciones sucesivas de una secuencia. Su elección modifica ponderación y duración del estudio.','Un protocolo ajusta el intervalo entre pulsos repetidos para cambiar contraste: ¿qué parámetro modifica?'],
['Tiempo de eco (TE)','Es el intervalo entre excitación y obtención de la señal de eco. Afecta ponderación y pérdida de señal.','Un técnico cambia el tiempo que transcurre hasta medir el eco: ¿qué variable ajusta?'],
['Secuencia T1','Destaca diferencias de relajación longitudinal. Suele ofrecer referencias anatómicas y puede utilizarse antes o después de ciertos contrastes.','Un protocolo busca una imagen de anatomía con ponderación de recuperación longitudinal: ¿qué secuencia interesa?'],
['Secuencia T2','Destaca diferencias en relajación transversal; muchos líquidos aparecen hiperintensos en T2 convencionales, con variaciones según secuencia.','Una secuencia quiere destacar líquido por su comportamiento de relajación transversal: ¿qué ponderación usa?']
],[
q('¿Qué parámetro indica intervalo entre excitaciones?','TR',['TE','Bq','mAs'],'TR significa tiempo de repetición.'),
q('¿Qué parámetro indica tiempo hasta señal de eco?','TE',['TR','kVp','CTDI'],'TE significa tiempo de eco.'),
q('¿Para qué se utiliza una bobina de superficie bien posicionada?','Mejorar captación de señal de la región de interés',['Emitir rayos X','Inyectar contraste automáticamente','Medir glucemia'],'La bobina receptora influye en señal y ruido.'),
q('¿Por qué puede ser útil phased array?','Combina canales para cobertura y técnicas de adquisición paralela',['Elimina el imán','Sustituye todas las secuencias','Hace obligatoria la anestesia'],'Los elementos múltiples de recepción aportan flexibilidad.')
]],
['Seguridad, preparación y posicionamiento','El campo magnético permanece activo en muchos sistemas y puede atraer objetos ferromagnéticos. La seguridad exige cribado, clasificación de implantes, control de zonas y comunicación con el paciente.',[
['Cribado de seguridad','Antes de entrar se identifican implantes, cuerpos extraños, dispositivos, antecedentes y elementos externos. La compatibilidad se verifica para el equipo y condiciones concretas.','Una persona declara un implante y se consulta documentación antes de pasar a sala: ¿qué procedimiento se realiza?'],
['Riesgo de proyectil','Los objetos ferromagnéticos pueden acelerarse violentamente hacia el imán. Deben excluirse cilindros, herramientas y equipos no autorizados.','Un cilindro de oxígeno no compatible se acerca accidentalmente al imán: ¿qué peligro principal aparece?'],
['Clasificación MR Safe','Indica un objeto considerado seguro en todos los entornos RM definidos por la clasificación correspondiente. No equivale a «MR Conditional».','Un accesorio consta como seguro sin condiciones específicas en un entorno de RM: ¿qué designación puede tener?'],
['Clasificación MR Conditional','Significa que un dispositivo puede utilizarse solo cuando se cumplen condiciones concretas, como intensidad de campo y límites establecidos.','Un marcapasos solo puede estudiarse bajo parámetros y supervisión especificados: ¿qué clasificación se comprueba?'],
['Protección auditiva','El cambio rápido de gradientes genera ruido acústico importante durante ciertas secuencias. Se emplean sistemas de protección adecuados.','Una persona recibe tapones u otros protectores antes de adquirir imágenes: ¿qué riesgo se está reduciendo?'],
['SAR y calentamiento','La radiofrecuencia deposita energía en tejidos y puede generar calentamiento. Se controlan condiciones de exposición y dispositivos según protocolo.','Un protocolo limita potencia y secuencia para controlar depósito energético durante RM: ¿qué parámetro de seguridad interesa?']
],[
q('¿Qué debe hacerse con un implante desconocido?','Verificar su compatibilidad y condiciones antes de la exploración',['Suponer que todo metal es seguro','Introducir al paciente sin cribado','Buscar solo su color'],'La seguridad de dispositivos exige comprobación documentada.'),
q('¿Por qué no entra una bombona ferromagnética convencional?','Por riesgo de desplazamiento violento hacia el imán',['Porque impide ver radiografías','Porque produce gammagrafías','Solo por higiene'],'El campo puede atraer objetos ferromagnéticos peligrosamente.'),
q('¿Qué significa MR Conditional?','Compatible únicamente bajo condiciones especificadas',['Compatible con cualquier imán siempre','Prohibido en toda circunstancia','Que funciona sin documentación'],'La clasificación exige respetar condiciones.'),
q('¿Qué fenómeno se relaciona con SAR?','Energía de radiofrecuencia absorbida y calentamiento',['Actividad en becquereles','Contraste radiográfico','Producción de radionúclidos'],'SAR expresa tasa específica de absorción de energía.')
]],
['Protocolos clínicos y aplicaciones de RM','Los protocolos se adaptan a región, sospecha, necesidades del paciente y características del equipo. Las secuencias complementarias pueden estudiar difusión, vasos o supresión de señales.',[
['Planos de exploración','Los cortes pueden prescribirse en planos axial, sagital, coronal u oblicuos siguiendo referencias anatómicas. La correcta planificación favorece cobertura.','Un estudio del raquis necesita cortes paralelos al eje de los discos y perpendiculares cuando proceda: ¿qué se está definiendo?'],
['Difusión (DWI)','Explora características del movimiento microscópico del agua mediante gradientes de difusión. Puede mostrar alteraciones según procesos tisulares y parámetros.','Una secuencia valora restricción aparente del movimiento del agua: ¿qué técnica se emplea?'],
['FLAIR','Secuencia basada en inversión-recuperación que suprime señal de líquido libre en condiciones habituales para mejorar visualización de ciertas lesiones.','Se desea atenuar señal del LCR en un estudio encefálico y resaltar determinadas alteraciones: ¿qué secuencia puede utilizarse?'],
['STIR','Utiliza inversión-recuperación para suprimir señal de grasa de manera robusta bajo condiciones apropiadas. Ayuda en determinadas exploraciones musculoesqueléticas.','Una secuencia quiere anular señal grasa para identificar edema en médula ósea: ¿qué técnica puede ser útil?'],
['Angiografía por RM','Incluye métodos que muestran vasos mediante propiedades de flujo o contraste cuando está indicado. No todos requieren el mismo agente.','Un protocolo busca representar circulación arterial utilizando técnicas de resonancia: ¿qué aplicación selecciona?'],
['Contraste basado en gadolinio','Determinados agentes modifican contraste de RM y requieren revisar indicaciones, función renal y precauciones relevantes según producto.','Antes de administrar contraste se valoran riesgos y protocolo de RM correspondiente: ¿qué tipo de agente puede usarse?']
],[
q('¿Qué secuencia suele utilizarse para suprimir señal de LCR en el encéfalo?','FLAIR',['Radiografía PA','PET','Densitometría'],'FLAIR puede suprimir líquido libre.'),
q('¿Qué secuencia es útil para supresión robusta de grasa?','STIR',['TC sin contraste','Ecografía M','Proyección lateral'],'STIR es una modalidad de inversión-recuperación.'),
q('¿Qué permite estudiar DWI?','Comportamiento de difusión de agua en tejidos',['Solo actividad de radiofármacos','Nivel de rayos X','Concentración de oxígeno respirado'],'DWI incorpora sensibilidad a la difusión.'),
q('¿Qué debe regir un protocolo de RM?','Indicación, anatomía, seguridad y parámetros del equipo',['Un único protocolo para todas las personas','Evitar comprobar implantes','La preferencia por una imagen bonita'],'Los protocolos se adaptan a estudio y situación.')
]]
];
export const rmDriveBook=buildModule('rm','Resumen RM.pdf y UF1–UF2 de Técnicas de Imagen por Resonancia Magnética',u);
