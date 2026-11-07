# Revisión de temario y láminas · 7 de noviembre de 2026

Este registro describe la organización REAL del código de Radiolab Academy. No sustituye el programa oficial de ILERNA.

## Temario y organización revisados
- **Inglés:** seis unidades VT2–VT7 (pronombres y presentes; perfectos; pasado; past perfect/comparaciones; futuro; modales/intensificadores). Las preguntas de clase de Past Simple que habían quedado en bloques de presente se han reasignado a VT4.
- **Atención al Paciente:** cinco temas (sistema sanitario; citación/acogida; comunicación/apoyo; observación; necesidades/higiene/movilización). Las actividades de clase están asociadas al bloque correspondiente.
- **Ciencias Forenses:** tres capítulos agrupados por VT2–VT7 (toxicología y muestras; genética/microbiología/histoquímica; necroidentificación). Dentro de los capítulos se conservan sus subsecciones originales.
- **Anatomía por la Imagen:** actualmente temas 1, 2, 4, 5, 6 y 7, conforme a los libros disponibles. **No hay un tema 3 independiente en los datos actuales**; no se ha inventado ni renumerado el contenido existente.
- **Protección Radiológica:** nueve temas (átomo/magnitudes; interacciones; efectos biológicos; detección; exposición/distancia; dosimetría; salas; residuos; emergencias/calidad). Ejercicios y tablas conservan sus unidades.
- **IPE1:** tres temas en la ruta principal (sector y perfil; prevención; relaciones y condiciones laborales), construidos con las unidades disponibles.

## Láminas didácticas originales
Se añadieron ficheros SVG a `diagrams/`:
- `planes.svg`, `articulacion.svg`, `oido.svg`
- `atomo.svg`, `dosimetro.svg`
- `elisa.svg`, `pcr.svg`
- `maslow.svg`, `posiciones.svg`, `riesgos-laborales.svg`

`visual-extended.js` genera preguntas de identificación con letras A–C y el módulo `visual-questions.js` integra su representación en los tests y juegos que ya lo importaban. Los SVG son esquemas simplificados, no fotografías diagnósticas ni sustitutos de láminas anatómicas de referencia. Se conservan también las ilustraciones anteriores de hueso largo, pulmón, Glasgow, etc.

## Controles realizados
- Validación de sintaxis JavaScript para los módulos de asignaturas y los de preguntas visuales modificados.
- Comprobación de que el banco de preguntas de cada asignatura enlaza con el tema previsto.
- Prueba de generación de tres preguntas visuales por esquema y HTML con ruta de imagen válida en los temas correspondientes.
- **Pendiente de prueba manual en navegador real y publicación Cloudflare**: tiempos de carga, funcionamiento visual en móvil y cada pregunta individual. La existencia del commit no acredita que el despliegue esté terminado.
