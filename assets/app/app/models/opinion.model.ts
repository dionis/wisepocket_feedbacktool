import { FuseUtils } from "../../@fuse/utils";

export class Opinion{
    id: string
    from:{
        user: string,
        avatar: string,
        email: string
    };
    to:{
        user: string,
        email: string
    }[];
    opinionText?: string;
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
    time: string;
    starred: boolean;
    important: boolean;
    message: string;
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
            this.from = opinion.from;
            this.to = opinion.to;
            this.opinionText = opinion.opinionText;
            this.message = opinion.message;
            this.labels = opinion.labels;
            this.folder = opinion.folder;
            this.hasAttachments = opinion.hasAttachments;
            this.attachments = opinion.attachments;
            this.starred = opinion.starred;
            this.important = opinion.important;
            this.time = opinion.time;
            this.message = opinion.message;
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
