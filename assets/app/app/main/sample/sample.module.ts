import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '../../../@fuse/shared.module';
import { CampaignService } from '../../services/campaign.service';

import { SampleComponent } from './sample.component';

const routes = [
    {
        path     : 'sample',
        component: SampleComponent
    }
];

@NgModule({
    declarations: [
        SampleComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        TranslateModule,

        FuseSharedModule
    ],
    exports     : [
        SampleComponent
    ],
    providers: [
        CampaignService
    ]
})

export class SampleModule
{
}
