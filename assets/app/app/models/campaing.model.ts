<<<<<<< HEAD
import { FuseUtils } from "../../@fuse/utils";

//import { FuseUtils } from '../../../../@fuse/utils';
=======
>>>>>>> 66934c029b1ec91ef0ff8e5cdae856d31738e0cd
export class Campaign{
    nombre: string;
    fecha: string;
    userChief: string;
    descripcion: string;
    contactoTelefono: number;
    colorPrincipal: string;
    colorSecundario: string;
    contactoEmail: string;
    direccionPostal: string;
    contactoTelegram: string;
    contactoWhatsapp: string;
    contactoFacebook: string;
   // constructor(){}

   /**
     * Constructor
     *
     * @param campaign
     */
    constructor(campaign)
    {
        {
            this.nombre = campaign.nombre|| FuseUtils.generateGUID();
            this.fecha = campaign.fecha || '';
            this.user = campaign.user || '';
            this.descripcion = campaign.descripcion || '';
            this.colorPrincipal = campaign.colorPrincipal || '';
            this.colorSecundario = campaign.colorSecundario || '';
            this.direccionPostal = campaign.direccionPostal || '';
            this.contactoEmail = campaign.contactoEmail || '';
            this.contactoFacebook = campaign.contactoFacebook || '';
            this.contactoWhatsapp = campaign.contactoWhatsapp || '';
            this.contactoTelegram = campaign.contactoTelegram || '';
            this.contactoTelefono = campaign.contactoTelefono || '';
        }
    }
}