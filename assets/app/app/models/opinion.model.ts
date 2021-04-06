import { FuseUtils } from "../../@fuse/utils";

export class Opinion{
    id: string
    user: string;
    opinionText: string;

   /**
     * Constructor
     *
     * @param opinion
     */
    constructor(opinion)
    {
        {
            this.id = opinion.id ||'';
            this.user = opinion.user ||'';
            this.opinionText = opinion.opinionText || ' ;'
        }
    }
}