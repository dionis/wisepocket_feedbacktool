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
        campaigns: any     //Se crea un objeto any(cualquiera) para guardar lo que devuelve la funcion
    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     * @param {CampaignService} _campaignService
     */
    constructor(
        private _campaignService: CampaignService,  //Se crea un obj del Servicio Campaign
        private _fuseTranslationLoaderService: FuseTranslationLoaderService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, spanish);

    }


}
