import {buildModule} from './drive-book-engine.js';
const q=(p,r,w,y)=>[p,[r,...w],0,y];
const u=[
['Equipo y adquisición en tomografía computarizada','La TC utiliza rayos X, detectores y reconstrucción informática para obtener cortes. Es preciso reconocer el gantry, la mesa, los parámetros del haz y las unidades Hounsfield.',[
['Gantry','Es la estructura circular que aloja tubo y detectores, entre otros componentes. Permite adquisición rotatoria alrededor del paciente.','Un paciente entra en el aro que contiene tubo de rayos X y detectores: ¿qué estructura del TC está utilizando?'],
['Tubo de rayos X','Genera los fotones mediante electrones acelerados que interaccionan con un ánodo. Parámetros como kVp y mA influyen en penetración y número de fotones.','En una TC se acelera un haz de electrones hacia un ánodo para obtener radiación: ¿qué componente funciona?'],
['Detectores','Transforman la radiación residual recibida en señales útiles para reconstrucción. Su diseño influye en sensibilidad y respuesta.','Una matriz circular registra fotones después de atravesar al paciente: ¿qué elemento recoge la señal?'],
['Unidad Hounsfield','Escala de atenuación de TC referida convencionalmente al agua como 0 UH y aire alrededor de -1000 UH. Ayuda a comparar tejidos en condiciones de adquisición.','En una imagen se consulta una escala donde el agua aparece próxima a cero y el aire a menos mil: ¿qué unidad se emplea?'],
['Píxel y vóxel','El píxel es un elemento de imagen bidimensional; el vóxel representa un pequeño volumen de tejido al considerar el grosor de corte.','Un operador analiza una unidad elemental que representa volumen en un corte tomográfico: ¿qué concepto usa?'],
['Reconstrucción','El procesador combina las mediciones adquiridas para producir cortes y reformateos en diversos planos. El algoritmo elegido afecta ruido y resolución.','A partir de proyecciones recogidas alrededor de un cuerpo se generan imágenes axiales: ¿qué proceso se realiza?']
],[
q('¿Qué referencia corresponde al agua en la escala Hounsfield?','Aproximadamente 0 UH',['-1000 UH','+1000 UH siempre','100 Bq'],'El agua define el cero convencional de la escala.'),
q('¿Qué valor tiene aproximadamente el aire en TC?','-1000 UH',['0 UH','+500 UH','100 Sv'],'El aire muestra atenuación muy baja.'),
q('¿Qué diferencia píxel de vóxel?','El vóxel incorpora una dimensión de volumen',['Son idénticos en todos los aspectos','Píxel mide actividad','Vóxel solo existe en radiografías de película'],'El vóxel representa un volumen en 3D.'),
q('¿Qué modalidad genera cortes usando rayos X?','Tomografía computarizada',['RM convencional','Ecografía Doppler','Electrocardiograma'],'La TC utiliza rotación de tubo y detectores y reconstrucción.')
]],
['Preparación, posicionamiento y protocolo de TC','El técnico prepara al paciente, verifica solicitud, posición y antecedentes. Los parámetros de adquisición y el pitch se ajustan al objetivo diagnóstico y a las medidas de seguridad.',[
['Identificación y consentimiento','Antes de explorar se comprueba identidad y solicitud y se proporciona información adecuada. El consentimiento procede según procedimiento y exigencias aplicables.','Una persona va a recibir contraste y el técnico verifica identidad y documentación requerida: ¿qué fase completa?'],
['Topograma','Imagen de localización utilizada para planificar extensión y cortes de TC. Ayuda a seleccionar los límites anatómicos.','Se realiza una imagen previa que sirve para delimitar el rango de adquisición: ¿qué registro se obtiene?'],
['Pitch','En TC helicoidal relaciona el avance de la mesa por rotación con la colimación total; influye en muestreo y dosis según tecnología y ajuste.','El técnico cambia la velocidad de avance de la mesa respecto al giro y anchura de haz: ¿qué parámetro modifica?'],
['Colimación','Determina anchura o configuración del haz y detectores, condicionando grosor y cobertura de adquisición.','Un protocolo ajusta la anchura del haz y el número de detectores activos: ¿qué control utiliza?'],
['Ventana de imagen','El ancho y nivel de ventana muestran de modo adecuado un intervalo de unidades Hounsfield. Una ventana ósea y otra pulmonar resaltan estructuras distintas.','Sobre la misma adquisición se modifica visualización para resaltar hueso o parénquima pulmonar: ¿qué se cambia?'],
['Protección y dosis de TC','La optimización equilibra calidad diagnóstica con exposición y utiliza indicadores como CTDIvol y DLP, que no son sinónimos directos de dosis efectiva.','Un servicio compara indicadores de adquisición para reducir dosis manteniendo calidad suficiente: ¿qué actuación aplica?']
],[
q('¿Para qué sirve un topograma?','Planificar el rango anatómico de TC',['Medir glucemia','Reemplazar toda reconstrucción','Inyectar contraste'],'La imagen preliminar define cobertura.'),
q('¿Qué describen CTDIvol y DLP?','Indicadores dosimétricos de TC',['Actividad radiactiva en Bq','Presión arterial','Resonancia de protones'],'Sirven para seguimiento y optimización de exploraciones.'),
q('¿Qué modifica el nivel de ventana?','El centro del rango de atenuaciones mostrado',['La actividad del radiofármaco','El peso del paciente','El número de protones'],'Nivel y anchura de ventana afectan visualización.'),
q('¿Por qué ajustar correctamente el rango de TC?','Para cubrir la región necesaria sin irradiar zonas innecesarias',['Para que el estudio dure siempre igual','Para eliminar el control técnico','Para aumentar exploración sin motivo'],'La justificación y optimización exigen cobertura apropiada.')
]],
['Contrastes yodados y fases de adquisición','Los contrastes de TC ayudan a distinguir vasos y tejidos. Debe revisarse vía de administración, antecedentes, preparación y manejo de efectos adversos, siguiendo protocolos clínicos.',[
['Contraste yodado','Los agentes yodados atenúan rayos X y permiten realzar estructuras en determinadas exploraciones. La indicación y riesgo dependen del procedimiento y del producto.','Una angiografía TC utiliza un agente que realza vasos por mayor atenuación de rayos X: ¿qué contraste es?'],
['Inyector automático','Administra contraste siguiendo volumen, flujo y retraso programados bajo protocolo y vigilancia. Requiere comprobar acceso vascular.','Una TC angiográfica precisa introducir contraste a flujo controlado mediante bomba: ¿qué equipo se usa?'],
['Retraso de adquisición','Es el intervalo previsto entre administración y registro de imagen para captar la fase de realce de interés. Depende de órgano y protocolo.','Se espera un tiempo determinado tras iniciar la inyección para adquirir vasos: ¿qué parámetro se ajusta?'],
['Fase arterial','Momento de adquisición elegido para visualizar preferentemente estructuras arteriales realzadas, según circulación y protocolo.','Se programa una adquisición cuando el contraste alcanza adecuadamente arterias: ¿qué fase se estudia?'],
['Fase venosa','Se registra cuando el patrón de distribución favorece la valoración de determinadas venas y órganos. No es equivalente a fase arterial.','Una exploración se realiza después de la llegada inicial del contraste arterial para estudiar distribución venosa: ¿qué fase se utiliza?'],
['Extravasación','Salida no deseada del contraste fuera del vaso al tejido próximo. Requiere interrumpir administración y valorar y comunicar según protocolo.','Durante una inyección aparece dolor e hinchazón en la zona de punción: ¿qué complicación se sospecha?']
],[
q('¿Qué puede alterar la elección del tiempo de retraso?','El objetivo de realce y circulación del paciente',['Solo la marca de la camilla','El nombre del técnico','El color de la sala'],'La sincronización determina la fase vascular.'),
q('¿Qué antecedente debe valorarse antes de administrar contraste?','Reacciones previas y factores de riesgo relevantes',['Número de zapatos','Estatura de familiares','Notas de inglés'],'El cribado identifica precauciones.'),
q('¿Qué hacer si se sospecha extravasación?','Detener la administración y seguir el protocolo',['Aumentar el flujo','Ignorar dolor e hinchazón','Continuar toda la dosis sin comprobar'],'La extravasación exige actuación inmediata según procedimientos.'),
q('¿Qué produce un agente de contraste yodado en TC?','Aumento de atenuación en zonas donde se distribuye',['Disminución universal de dosis a cero','Emisión espontánea de gamma como radiofármaco','Desaparición de todos los artefactos'],'Su contenido en yodo aumenta la absorción de rayos X.')
]],
['Ecografía y Doppler','La ecografía crea imágenes con ultrasonidos emitidos y reflejados en tejidos. Es dinámica y no usa radiación ionizante. El Doppler permite valorar movimiento y flujo.',[
['Transductor','Emite pulsos ultrasónicos y recibe ecos gracias a elementos piezoeléctricos. La selección depende de región y profundidad.','Un profesional coloca una sonda que emite ultrasonidos y recibe ecos: ¿qué componente utiliza?'],
['Efecto piezoeléctrico','Permite convertir señales eléctricas en vibraciones ultrasónicas y viceversa en el transductor. Es la base de la emisión y recepción.','Un cristal produce vibración al recibir voltaje y señal al recibir ecos: ¿qué fenómeno interviene?'],
['Ecogenicidad','Describe intensidad de ecos de un tejido, con términos como hiperecogénico e hipoecogénico. Depende de características e interfaces.','Una estructura refleja muchos ecos y aparece muy brillante en pantalla: ¿qué propiedad presenta?'],
['Sombra acústica','Aparece cuando una estructura atenúa intensamente el ultrasonido y deja poca señal detrás. Se observa en determinadas calcificaciones y otros materiales.','Una estructura muy atenuante produce zona oscura inmediatamente posterior: ¿qué artefacto es?'],
['Doppler','Utiliza cambios de frecuencia de ecos por movimiento para estudiar velocidad y dirección relativa del flujo. Existen modalidades en color y espectrales.','Se quiere evaluar el sentido del flujo en un vaso sanguíneo usando ultrasonidos: ¿qué técnica se añade?'],
['Frecuencia y penetración','Sondas de mayor frecuencia suelen ofrecer más resolución superficial y menor penetración; menor frecuencia permite estudiar mayor profundidad.','Una persona requiere estudiar un órgano profundo y se selecciona sonda de menor frecuencia: ¿qué relación se aplica?']
],[
q('¿Qué técnica no utiliza radiación ionizante?','Ecografía',['TC','Radiografía simple','Fluoroscopia'],'La ecografía utiliza ultrasonidos.'),
q('¿Qué produce sombra acústica?','Atenuación importante de la señal detrás de una estructura',['Mayor transmisión completa','Un campo magnético B0','Una reacción nuclear'],'La poca señal posterior origina sombra.'),
q('¿Qué permite el Doppler?','Estudiar movimiento y flujo',['Reconstruir rayos X','Producir radiofármacos','Medir dosis en Gy'],'El efecto Doppler relaciona frecuencia y movimiento.'),
q('¿Qué relación general existe entre frecuencia y penetración?','Mayor frecuencia suele penetrar menos',['Mayor frecuencia siempre penetra más','No existe ninguna relación','La frecuencia solo cambia el color del monitor'],'Se elige frecuencia equilibrando profundidad y resolución.')
]]
];
export const tcDriveBook=buildModule('tc','Resumen de Tomografía computarizada y ecografía, 45 páginas (PDF)',u);
