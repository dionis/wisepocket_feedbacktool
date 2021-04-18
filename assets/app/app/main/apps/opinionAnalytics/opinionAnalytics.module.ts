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

import { OpinionAnalyticsComponent } from '../opinionAnalytics/opinionAnalytics.component';
import { OpinionService } from '../../../services/opinion-analizer.service';
import { OpinionAnalyticsListComponent } from '../opinionAnalytics/opinionAnalytics-list/opinionAnalytics-list';
import { OpinionAnalyticsSelectedBarComponent } from '../opinionAnalytics/selected-bar/selected-bar.component';
import { OpinionAnalyticsMainSidebarComponent } from '../opinionAnalytics/sidebars/main/main.component';
import { OpinionAnalyticsFormDialogComponent } from '../opinionAnalytics/opinionAnalytics-form/opinionAnalytics-form.component';


const routes: Routes = [
    {
        path     : '**',
        component: OpinionAnalyticsComponent,
        resolve  : {
            opinions: OpinionService
        }
    }
];

@NgModule({
    declarations   : [
        OpinionAnalyticsComponent,
        OpinionAnalyticsListComponent,
        OpinionAnalyticsSelectedBarComponent,
        OpinionAnalyticsMainSidebarComponent,
        OpinionAnalyticsFormDialogComponent
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
        OpinionService
    ],
    entryComponents: [
        OpinionAnalyticsFormDialogComponent
    ]
})
export class OpinionAnalyticsModule
{
}
