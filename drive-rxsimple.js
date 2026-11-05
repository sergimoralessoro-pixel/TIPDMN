import {buildModule} from './drive-book-engine.js';
const q=(p,r,w,y)=>[p,[r,...w],0,y];
const u=[
['Preparación del estudio de radiología simple','Antes de realizar una radiografía se verifica solicitud e identidad, se informa al paciente y se coloca la región correctamente. Es esencial diferenciar postura de proyección.',[
['Recepción e identificación','Se comprueban datos personales, solicitud y región a examinar y se informa de forma comprensible. Debe respetarse la intimidad y atender necesidades.','Una técnica confirma nombre y exploración antes de llevar a una persona a la sala: ¿qué proceso realiza?'],
['Posición anatómica','Es la referencia convencional de una persona erguida, con mirada al frente y palmas hacia delante. Permite usar términos proximal, distal, medial y lateral.','Para describir la relación entre radio y cúbito se emplea la postura estándar con palmas al frente: ¿qué posición es?'],
['Proyección anteroposterior (AP)','El rayo central entra por la cara anterior y sale por la posterior de la región estudiada. No equivale a que el paciente esté necesariamente tumbado.','El haz atraviesa primero la superficie anterior del tórax y sale hacia espalda: ¿qué proyección es?'],
['Proyección posteroanterior (PA)','El haz entra por posterior y sale por anterior. Es habitual en ciertas radiografías de tórax cuando el paciente puede colocarse.','El rayo entra por espalda y sale por el pecho en una radiografía: ¿qué proyección describe?'],
['Rayo central (RC)','Es la línea central del haz utilizada para dirigir y centrar la exposición de una región. El centrado debe seguir la proyección y el protocolo.','El operador dirige el centro del haz al punto anatómico de referencia: ¿qué componente geométrico está ajustando?'],
['Receptor de imagen (RI)','Es el elemento que registra la señal transmitida tras atravesar al paciente. Su posición influye en superposición y magnificación.','Una placa digital capta la radiación residual para producir imagen: ¿qué dispositivo es?']
],[
q('¿Qué diferencia posición de proyección?','Posición es postura; proyección es dirección del haz',['Son siempre sinónimos','Proyección solo describe la camilla','Posición mide dosis'],'Una persona puede estar de pie en una proyección PA.'),
q('¿Qué debe comprobarse antes de cualquier exploración?','Identidad, solicitud y preparación relevante',['Solo el apellido de un familiar','El color del uniforme','El último resultado del equipo de fútbol'],'La identificación correcta evita errores asistenciales.'),
q('Si el haz entra por la espalda, ¿qué proyección se denomina?','PA',['AP','Axial exclusivamente','Oblicua necesariamente'],'PA significa posteroanterior.'),
q('¿Qué consejo ayuda a evitar artefactos de objetos externos?','Retirar metales y prendas cuando corresponda',['Conservar siempre todos los adornos','Moverse durante exposición','Ocultar implantes al personal'],'Preparación y comunicación favorecen calidad.')
]],
['Extremidad superior y cintura escapular','El temario repasa exploraciones básicas y traumáticas de dedos, mano, muñeca, antebrazo, codo, húmero, hombro y clavícula. Se buscan proyecciones que separen estructuras.',[
['Proyección PA de mano','Con la palma apoyada de modo apropiado, se estudian falanges, metacarpianos y articulaciones. La colocación adecuada reduce rotación.','Se explora una mano apoyando la palma sobre el receptor para una imagen frontal: ¿qué proyección habitual se utiliza?'],
['Oblicua de mano','La rotación parcial separa metacarpianos y facilita visualizar determinadas estructuras. Debe seguirse el ángulo del protocolo.','Se gira parcialmente la mano para evitar superposición en una radiografía: ¿qué proyección se practica?'],
['Proyección lateral','Permite valorar el perfil de huesos y articulaciones, complementando la frontal. Su correcta alineación es importante en traumatismos.','Una muñeca se registra de perfil para valorar alineación anteroposterior: ¿qué vista se obtiene?'],
['Escafoides','Es un hueso carpiano del lado radial con importancia en traumatismos de muñeca. Puede requerir proyecciones específicas según solicitud y protocolo.','Tras una caída con dolor en la tabaquera anatómica se desea estudiar un carpiano radial: ¿qué hueso interesa?'],
['Articulación glenohumeral','Une cabeza del húmero y cavidad glenoidea. El posicionamiento debe procurar visualizar la relación articular sin movilizaciones riesgosas ante traumatismo.','Un estudio de hombro busca valorar congruencia entre cabeza humeral y glenoides: ¿qué articulación estudia?'],
['Clavícula','Une el esternón con la escápula a través de articulaciones y sirve de soporte de cintura escapular. Las proyecciones se eligen según lesión sospechada.','Un traumatismo en la cintura escapular requiere valorar el hueso entre esternón y acromion: ¿qué estructura es?']
],[
q('¿Qué hueso carpiano está hacia el lado del pulgar?','Escafoides',['Pisiforme','Ganchoso','Cúbito'],'El escafoides es lateral en el carpo en posición anatómica.'),
q('¿Para qué se suele obtener más de una proyección?','Para valorar estructuras en planos complementarios',['Solo para aumentar la dosis','Porque todas son idénticas','Para no identificar al paciente'],'Las vistas múltiples reducen limitaciones de superposición.'),
q('¿Qué une la articulación glenohumeral?','Cabeza humeral y cavidad glenoidea',['Cúbito y radio distales','Cóndilos femorales y tibia','Esternón y costilla 12'],'Constituye la articulación principal del hombro.'),
q('Ante sospecha de fractura, ¿qué se debe evitar?','Movilización forzada de la región dolorosa',['Seguir protocolos de seguridad','Explicar colocación','Coordinar la ayuda necesaria'],'El posicionamiento debe minimizar dolor y nuevos daños.')
]],
['Extremidad inferior y cintura pélvica','Incluye pelvis, cadera, fémur, rodilla, tibia, peroné, tobillo y pie. La técnica depende de la sospecha y movilidad permitida.',[
['Pelvis AP','Permite visualizar relación de huesos coxales, sacro y articulaciones de cadera, según posicionamiento y campo adecuados.','Se estudian ambas caderas y anillo pélvico en una proyección frontal: ¿qué examen es?'],
['Cadera axial o lateral','Complementa la AP para valorar la relación entre cabeza femoral y acetábulo. En traumatismos se evitan maniobras dolorosas no autorizadas.','Se necesita una segunda vista de cadera que muestre relación articular desde otra dirección: ¿qué proyección puede emplearse?'],
['Fémur','Hueso largo del muslo que se articula con pelvis y tibia. En lesiones se busca incluir región de interés y articulaciones necesarias según indicación.','Un estudio de traumatismo del muslo debe visualizar el hueso entre cadera y rodilla: ¿cuál es?'],
['Rodilla AP','Permite evaluar componentes femorotibiales en proyección frontal. La alineación y centrado siguen protocolo y situación del paciente.','Se registra la rodilla con haz anteroposterior para valorar compartimentos femorotibiales: ¿qué proyección es?'],
['Tobillo y mortaja','La articulación del tobillo comprende tibia, peroné y astrágalo. Una proyección de mortaja minimiza superposición para mostrar el espacio articular.','El equipo busca ver el espacio tibiotalar abierto mediante rotación controlada: ¿qué vista realiza?'],
['Pie dorsoplantar','Proyección frecuente para estudio del pie, complementada por oblicua o lateral cuando corresponde. Debe incluir región de interés y huesos metatarsianos.','Se radiografía el pie desde dorso hacia planta como vista principal: ¿qué proyección se utiliza?']
],[
q('¿Qué hueso es lateral en la pierna?','Peroné o fíbula',['Tibia','Fémur','Sacro'],'El peroné es lateral a la tibia.'),
q('¿Qué cavidad ósea recibe la cabeza femoral?','Acetábulo',['Cavidad glenoidea','Agujero magno','Conducto vertebral'],'La cabeza femoral se articula con el coxal.'),
q('¿Qué hueso del tarso forma parte de la articulación del tobillo?','Astrágalo',['Escafoides carpiano','Húmero','Clavícula'],'El astrágalo participa en la mortaja tibioperonea.'),
q('¿Qué debe priorizarse si hay fractura sospechada de cadera?','Evitar rotaciones dolorosas y seguir protocolo traumático',['Forzar rotación completa','Pedir marcha prolongada','Ignorar dolor'],'La técnica debe adaptarse a seguridad y movilidad.')
]],
['Exploraciones de cabeza y cuello','El estudio de cráneo, cara, órbitas y senos paranasales requiere conocer líneas de referencia y orientación de la cabeza. Las proyecciones se ajustan a indicación.',[
['Cráneo PA o AP','Las vistas frontal y complementarias muestran diferentes estructuras óseas. El centrado y la inclinación dependen de la proyección concreta.','Una exploración busca estudiar el cráneo desde frente con una dirección definida del rayo central: ¿qué modalidad de proyección utiliza?'],
['Proyección lateral de cráneo','Muestra estructuras en perfil y permite valorar relaciones de bóveda, base y silla turca según objetivos.','Para visualizar en perfil la bóveda craneal se coloca cabeza lateral al receptor: ¿qué proyección se adquiere?'],
['Senos paranasales','Son cavidades aéreas en huesos de la cara. Su exploración se adapta a localización e indicación, con pruebas tomográficas cuando proceden.','Se estudian cavidades neumáticas alrededor de la nariz ante sospecha sinusal: ¿qué estructuras son?'],
['Órbitas','Cavidades óseas que contienen los globos oculares y estructuras asociadas. La selección técnica debe considerar radioprotección y sospecha.','Un estudio necesita delimitar paredes óseas que alojan el ojo: ¿qué región explora?'],
['Línea orbitomeatal','Referencia anatómica entre órbita y meato auditivo utilizada para orientar proyecciones de cabeza.','Se coloca la cabeza utilizando una referencia que relaciona canto ocular y oído: ¿qué línea orienta?'],
['Protección y colimación','Limitar el campo al área necesaria y justificar cada imagen es importante por órganos sensibles próximos, como cristalino y tiroides.','Una exploración restringe el haz a la región indicada para reducir irradiación innecesaria: ¿qué medida aplica?']
],[
q('¿Qué órgano radiosensible se encuentra en la órbita?','Cristalino',['Hígado','Bazo','Páncreas'],'El cristalino está relacionado con efectos tisulares por exposición.'),
q('¿Qué representa una proyección lateral de cráneo?','Perfil de estructuras óseas',['Únicamente una sección de RM','Solo vasos sanguíneos','Un cultivo microbiológico'],'La vista de perfil complementa otras proyecciones.'),
q('¿Qué ayuda a orientar una proyección craneal?','Líneas de referencia anatómica',['Color de la camilla','Altura de un armario','Número de visitantes'],'Las referencias reproducen la posición.'),
q('¿Debe utilizarse siempre radiografía simple en traumatismo craneal?','No; la modalidad depende de indicación y protocolo clínico',['Sí, siempre','No se utiliza ninguna imagen','Siempre es necesaria PET'],'En muchos contextos se prefiere TC, según valoración clínica.')
]],
['Columna vertebral, sacro y cóccix','La columna se explora por regiones cervical, torácica, lumbar, sacra y coccígea. Es necesario identificar número y forma de vértebras y la alineación.',[
['Columna cervical','Tiene siete vértebras y sostiene el cuello. Las proyecciones deben adaptarse al riesgo traumático y movilidad permitida.','Se estudian siete vértebras de la región del cuello: ¿qué segmento corresponde?'],
['Atlas C1','Es la primera vértebra cervical, con rasgos anatómicos especiales y articulación con occipital y axis.','Se busca la vértebra cervical que sostiene el cráneo directamente: ¿cuál es?'],
['Axis C2','Es la segunda vértebra cervical, con apófisis odontoides que participa en la rotación de la cabeza.','Una vista de boca abierta busca valorar la odontoides: ¿qué vértebra se examina?'],
['Columna torácica','Se relaciona con las doce vértebras que articulan con costillas. Debe identificarse su alineación y superposiciones en vistas apropiadas.','Se exploran las vértebras que se articulan con costillas: ¿qué región vertebral es?'],
['Columna lumbar','Habitualmente tiene cinco vértebras grandes que soportan carga. Las proyecciones valoran cuerpos, espacios y alineación.','Una radiografía estudia cinco vértebras de región inferior de espalda: ¿qué segmento es?'],
['Sacro y cóccix','El sacro deriva de vértebras fusionadas y se articula con pelvis; el cóccix se sitúa inferiormente. Requieren centrado adecuado.','Una exploración estudia hueso triangular posterior de pelvis y extremo caudal vertebral: ¿qué zona es?']
],[
q('¿Cuántas vértebras cervicales hay habitualmente?','7',['5','12','9'],'La columna cervical comprende siete vértebras.'),
q('¿Qué vértebra posee odontoides?','Axis C2',['Atlas C1','L5','T12'],'La odontoides pertenece al axis.'),
q('¿Cuántas vértebras lumbares se reconocen habitualmente?','5',['7','12','3'],'La región lumbar suele tener cinco.'),
q('¿Qué debe evitarse ante posible lesión cervical inestable?','Movilización no autorizada del cuello',['Seguir inmovilización y protocolo','Comunicar a equipo médico','Comprobar indicación'],'La movilización imprudente puede agravar daño.')
]],
['Tórax visceral, tórax óseo y abdomen','Las proyecciones dependen del objetivo: pulmón y corazón, costillas o contenido abdominal. La inspiración, posición y correcta exposición influyen en la imagen.',[
['Tórax PA','La proyección posteroanterior de tórax suele obtenerse en bipedestación cuando es posible, permitiendo valoración de pulmones y mediastino.','Una persona de pie se coloca de frente al detector y el haz entra por espalda: ¿qué proyección se utiliza?'],
['Tórax lateral','Complementa la PA para localizar estructuras en profundidad y valorar zonas ocultas por superposición.','Se obtiene una segunda imagen torácica de perfil para completar estudio frontal: ¿qué vista es?'],
['Inspiración adecuada','Un estudio de tórax se realiza habitualmente con inspiración suficiente y breve apnea según protocolo. La insuficiente inspiración modifica siluetas y densidades.','Un paciente realiza una inspiración profunda y mantiene aire durante exposición de tórax: ¿qué criterio técnico se busca?'],
['Tórax óseo','Las proyecciones de costillas y esternón requieren técnicas distintas de las destinadas a parénquima pulmonar.','Un paciente presenta dolor costal y se buscan detalles de estructura ósea: ¿qué orientación de estudio es?'],
['Abdomen en decúbito','Una radiografía abdominal en supino puede mostrar distribución de gas y ciertas estructuras. La posición debe seguir indicación y estabilidad.','Un estudio de abdomen se realiza con persona tumbada boca arriba: ¿qué posición presenta?'],
['Abdomen en bipedestación','Cuando está indicado y es posible, la posición erecta puede aportar información sobre niveles aire-líquido o aire libre, según técnica y protocolo.','Una persona se estudia de pie para valorar niveles hidroaéreos: ¿qué posición se utiliza?']
],[
q('¿Qué proyección suele preferirse en tórax ambulatorio cuando es posible?','PA',['AP obligatoria en todos','Tangencial exclusivamente','Axial de talón'],'La PA en bipedestación es habitual.'),
q('¿Para qué sirve la lateral de tórax?','Complementar información y reducir algunas superposiciones',['Sustituir todas las vistas siempre','Medir glucemia','Ver únicamente el corazón sin pulmones'],'La visión en dos planos mejora localización.'),
q('¿Qué puede causar una inspiración insuficiente?','Cambios aparentes en densidad y tamaño de siluetas',['Mayor expansión pulmonar','Siempre una imagen perfecta','Eliminación de superposiciones'],'La calidad inspiratoria condiciona interpretación.'),
q('¿Cuándo debe obtenerse una imagen erecta abdominal?','Cuando esté indicada y sea segura para el paciente',['Siempre aunque no pueda mantenerse de pie','Nunca en ningún contexto','Solo para estudios de manos'],'El protocolo y estado clínico determinan posición.')
]],
['Radiología pediátrica','En pediatría se priorizan justificación, adaptación del equipo al tamaño, comunicación con acompañantes y reducción de repeticiones. La edad y el desarrollo modifican las necesidades.',[
['Adaptación de parámetros','La técnica pediátrica ajusta exposición y campo según tamaño e indicación. No debe aplicarse indiscriminadamente una técnica de adulto.','Un bebé requiere una radiografía con parámetros adaptados a su tamaño: ¿qué principio se aplica?'],
['Inmovilización apropiada','Evitar movimientos puede mejorar calidad y reducir repetición, utilizando técnicas seguras y respetuosas según protocolo.','Se utiliza un dispositivo apropiado para mantener quieta una extremidad sin causar daño: ¿qué objetivo tiene?'],
['Comunicación por edad','Las explicaciones deben adaptarse al desarrollo del menor y orientar a familiares sobre cómo ayudar cuando corresponda.','Una técnica explica con palabras sencillas y apoyo visual a un niño qué ocurrirá: ¿qué estrategia utiliza?'],
['Radioprotección pediátrica','Los menores pueden ser más sensibles a efectos tardíos y tienen mayor expectativa de vida. Justificar y optimizar cada adquisición es esencial.','Un servicio limita exploraciones innecesarias y adapta exposición al tamaño del niño: ¿qué enfoque sigue?'],
['Identificación del menor','Se verifica identidad con procedimientos adecuados incluso si el paciente no puede expresarse. Debe coordinarse con cuidadores y documentación.','Un recién nacido no puede decir su nombre y se contrastan identificadores de pulsera y solicitud: ¿qué medida se efectúa?'],
['Control de calidad','Revisar colocación, colimación y resultado antes de finalizar disminuye estudios repetidos por problemas técnicos.','Una técnica verifica cobertura y movimiento en la imagen pediátrica antes de retirar paciente: ¿qué proceso realiza?']
],[
q('¿Qué se debe evitar en radiología pediátrica?','Aplicar parámetros de adulto sin adaptación',['Comprobar identidad','Ajustar colimación','Reducir repeticiones'],'La técnica debe adecuarse al tamaño y exploración.'),
q('¿Por qué es importante la inmovilización segura?','Reduce artefactos y repeticiones',['Elimina toda dosis de radiación','Sustituye información al paciente','Permite ignorar posicionamiento'],'La estabilidad favorece calidad.'),
q('¿Qué debe guiar la comunicación con niños?','Etapa de desarrollo y necesidades individuales',['Únicamente tecnicismos','Gritar siempre','Ignorar acompañantes en todos los casos'],'La explicación adaptada ayuda a colaborar.'),
q('¿Cuál es el principio más importante ante una exploración innecesaria?','No realizarla sin justificación',['Aumentar kVp de todos modos','Obtener más vistas por rutina','No registrar la exploración'],'La justificación precede a la optimización.')
]]
];
export const rxSimpleDriveBook=buildModule('rxsimple','RESUMEN R. SIMPLE + VT.pdf — temas 1 a 7',u);
