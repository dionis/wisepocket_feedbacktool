import { FuseUtils } from "../../@fuse/utils";

export class UserInv {
    id: string;
    nombre: string;
    correo: string;
    telefono: number;
    direccion: string;
    password:string;
    acceso: false;

    constructor(contact)
    {
        {
            this.id = contact.id || FuseUtils.generateGUID();
            this.nombre = contact.nombre || '';
            this.correo = contact.correo || '';
            this.telefono= contact.telefono || '';
            this.direccion = contact.direccion || '';
            this.acceso = contact.acceso || ''
            this.password = contact.password || ''
        }
    }
}