import { Component } from '@angular/core';

import { FuseTranslationLoaderService } from '../../../@fuse/services/translation-loader.service';
import { CampaignService } from '../../services/campaign.service';

import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';

@Component({
    selector: 'sample',
    templateUrl: './sample.component.html',
    styleUrls: ['./sample.component.scss']
})
export class SampleComponent {
        campaigns: any
    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private campaignService: CampaignService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, spanish);
        //Get Campaigns
        //this.campaigns no coge el arreglo que devuelve la funcion
        this.campaigns = this.campaignService.getCampaignbyUser()

    }


}
