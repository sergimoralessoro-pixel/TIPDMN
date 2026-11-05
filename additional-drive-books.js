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
export const additionalDriveBooks=[
 ...ipe2DriveBook,...sustainabilityDriveBook,...digitalDriveBook,
 ...radiofarmaciaDriveBook,...nuclearDriveBook,...rmDriveBook,
 ...tcDriveBook,...fundamentosDriveBook,...rxSimpleDriveBook,
 ...rxEspecialDriveBook,...proyectoDriveBook
];