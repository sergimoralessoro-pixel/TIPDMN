/* Capítulos originales de ampliación basados en los PDF compartidos del Drive. */
import {ipe2DriveBook} from './drive-ipe2.js';
import {sustainabilityDriveBook} from './drive-sostenibilidad.js';
import {digitalDriveBook} from './drive-digital.js';
import {radiofarmaciaDriveBook} from './drive-radiofarmacia.js';
import {nuclearDriveBook} from './drive-nuclear.js';
import {rmDriveBook} from './drive-rm.js';
import {tcDriveBook} from './drive-tc.js';
import {fundamentosDriveBook} from './drive-fundamentos.js';
import {rxSimpleDriveBook} from './drive-rxsimple.js';
import {rxEspecialDriveBook} from './drive-rxespecial.js';
import {proyectoDriveBook} from './drive-proyecto.js';
const verifiedSources={
 ipe2:'1UvD0q2zqvvpAMq7jen44_QDHTpJtQd4e',
 sostenibilidad:'1_0PUrVbCPT7qq5efXe9G0IKvC0e3_l4d',
 digital:'1NBoqpUsBMD-GzUtE0vLWKdmdNmP2rJAZ',
 radiofarmacia:'1hTg7EDTXtMoGrEgDqpVR7pryMMxAy_UD',
 nuclear:'1VIIC2CTlfZ56R671qVwJM1yk_u5nRcRB',
 rm:'1-VJ7ZIS7mfHf-Nk6B13KnRkygTlfSSEk',
 tc:'1fG_uYsMCSdv770mHe83ihyFwawniXxJr',
 fundamentos:'1ESMhkQHuWtWDm2AyYJzYqaaMo_6nz9XR',
 rxsimple:'1bPi3xOCmFJyMy-kw-f4F8Ub6EZu2Z3XB',
 rxespecial:'1BQE1C13HS-2dZbKlKe5fnHpfjYzciqY4',
 proyecto:'1_5ci96nktfBtvaz3KcFIMWwTuhnXOooa'
};
export const additionalDriveBooksRaw=[
 ...ipe2DriveBook,...sustainabilityDriveBook,...digitalDriveBook,
 ...radiofarmaciaDriveBook,...nuclearDriveBook,...rmDriveBook,
 ...tcDriveBook,...fundamentosDriveBook,...rxSimpleDriveBook,
 ...rxEspecialDriveBook,...proyectoDriveBook
];
export const additionalDriveBooks=additionalDriveBooksRaw.map(l=>({...l,sourceUrl:'https://drive.google.com/file/d/'+verifiedSources[l.subject]+'/view'}));
