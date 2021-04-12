import { interval } from 'rxjs';
import { FuseUtils } from "../../@fuse/utils";

export class Opinion{
    id: string
    aspectList:{                            //lista con las palabras claves del opinionText
        aspectText: string,                //palabras claves 
        position: number[],                //posicion de dichas palabras
        polarity: string,                 //Buena, mala , nuetral

    }[];
    idioma: string;                        //en, es
    opinionPolarity: string;              //Buena, Mala, Neutral
    from:{
        type: string,                  //Numero de telefono, Nombre, Correo
        sourceAdrees: string,           //Whatsapp, Telegram, Messenger, Mensaje por Telefono, Email
        user: string,
    };
    to:{
        user: string
    }[];
    opinionText: string;
    labels: string[];
    folder: string;
    hasAttachments: boolean;
    attachments: {
        type: string,
        fileName: string,
        preview: string,
        url: string,
        size: string
    }[];
    arrivetime: string;
    time: string;
    starred: boolean;
    important: boolean;
    //message: string;
    subject: string;
    
   /**
     * Constructor
     *
     * @param opinion
     */
    constructor(opinion)
    {
        {
            this.id = opinion.id;
            this.aspectList = opinion.aspectList;
            this.idioma = opinion.idioma;
            this.opinionPolarity = opinion.opinionPolarity;
            this.from = opinion.from;
            this.to = opinion.to;
            this.opinionText = opinion.opinionText;
            this.labels = opinion.labels;
            this.folder = opinion.folder;
            this.hasAttachments = opinion.hasAttachments;
            this.attachments = opinion.attachments;
            this.starred = opinion.starred;
            this.important = opinion.important;
            this.time = opinion.time;
            this.arrivetime = opinion.arrivetime;
            this.subject = opinion.subject;
        }
    }
    toggleStar(): void
    {
        this.starred = !this.starred;
    }

    /**
     * Toggle important
     */
    toggleImportant(): void
    {
        this.important = !this.important;
    }
}