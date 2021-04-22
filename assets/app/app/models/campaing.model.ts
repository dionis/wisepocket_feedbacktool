import { FuseUtils } from "../../@fuse/utils";


export class Campaign{
    id: string;
    nombre: string;
    fecha: string;
    //userChief: any;
    descripcion: string;
    /*contactoTelefono: number;
    colorPrincipal: string;
    colorSecundario: string;
    contactoEmail: string;
    direccionPostal: string;
    contactoTelegram: string;
    contactoWhatsapp: string;
    contactoFacebook: string;*/
    
 //  constructor(){}

   /**
     * Constructor
     *
     * @param campaign
     */
    constructor(campaign)
    {
        {
            this.id = campaign.id || '';
            this.nombre = campaign.nombre|| FuseUtils.generateGUID();
            this.fecha = campaign.fecha || '';
            //this.userChief = campaign.userChief || '';
            this.descripcion = campaign.descripcion || '';
           /* this.colorPrincipal = campaign.colorPrincipal || '';
            this.colorSecundario = campaign.colorSecundario || '';
            this.direccionPostal = campaign.direccionPostal || '';
            this.contactoEmail = campaign.contactoEmail || '';
            this.contactoFacebook = campaign.contactoFacebook || '';
            this.contactoWhatsapp = campaign.contactoWhatsapp || '';
            this.contactoTelegram = campaign.contactoTelegram || '';
            this.contactoTelefono = campaign.contactoTelefono || '';*/
        }
    }
}