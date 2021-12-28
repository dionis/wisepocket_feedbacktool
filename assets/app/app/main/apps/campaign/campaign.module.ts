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
import { CampaignService } from '../../../services/campaign.service';
import { CampaignFormDialogComponent } from './campaign-form/campaign-form.component';
//import { CampaignListComponent } from '../../../../app/main/apps/campaign/campaign-list/campaign-list.component';
import { CampaignSelectedBarComponent } from '../../../../app/main/apps/campaign/selected-bar/selected-bar.component';
import { CampaignMainSidebarComponent } from '../../../../app/main/apps/campaign/sidebars/main/main.component';
import {ListCampComponent} from '../campaign/list-camp/list-camp.component'
import { TranslateModule } from '@ngx-translate/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
    
    {
        path     : 'myCampaigns',
        canActivate: [AuthGuard],
        component: ListCampComponent,
    },
    {
        path     : '**',
        component: CampaignComponent,
        canActivate: [AuthGuard],
        resolve  : {
            campaigns: CampaignService
        }
        
    },
];

@NgModule({
    declarations   : [
        CampaignComponent,
        CampaignFormDialogComponent,
        CampaignMainSidebarComponent,
        CampaignSelectedBarComponent, 
        ListCampComponent
            
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
        MatPaginatorModule,
        MatSortModule,

        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule,
        TranslateModule,
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