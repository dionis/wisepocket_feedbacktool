import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FuseSharedModule } from '../../../../@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '../../../../@fuse/components';

import { CampaignComponent } from '../../../../app/main/apps/campaign/campaign.component';
import { CampaignService } from '../../../../app/services/campaing.service';
import { CampaignFormDialogComponent } from './campaign-form/campaign-form.component';
import { CampaignListComponent } from '../../../../app/main/apps/campaign/campaign-list/campaign-list.component';
import { CampaignSelectedBarComponent } from '../../../../app/main/apps/campaign/selected-bar/selected-bar.component';
import { CampaignMainSidebarComponent } from '../../../../app/main/apps/campaign/sidebars/main/main.component';


const routes: Routes = [
    {
        path     : '**',
        component: CampaignComponent,
        resolve  : {
            campaigns: CampaignService
        }
    }
];

@NgModule({
    declarations   : [
        CampaignComponent,
        CampaignFormDialogComponent,
        CampaignListComponent,
        CampaignMainSidebarComponent,
        CampaignSelectedBarComponent,     
    ],
    imports        : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatTableModule,
        MatToolbarModule,

        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule
    ],
    providers      : [
        CampaignService
    ],
    entryComponents: [
        CampaignFormDialogComponent
    ]
})
export class CampaignModule
{
}