import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { AgmCoreModule } from '@agm/core';
import { ChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { FuseSharedModule } from '../../../../@fuse/shared.module';
import { FuseWidgetModule } from '../../../../@fuse/components/widget/widget.module';

import { AnalyticsDateDashboardComponent } from './analyticsDate.component';
import { AnalyticsDateDashboardService } from './analyticsDate.service';

const routes: Routes = [
    {
        path: '**',
        component: AnalyticsDateDashboardComponent,
        resolve: {
            data: AnalyticsDateDashboardService
        }
    }
];

@NgModule({
    declarations: [
        AnalyticsDateDashboardComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatMenuModule,
        MatSelectModule,
        MatTabsModule,

        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
        }),
        ChartsModule,
        NgxChartsModule,

        FuseSharedModule,
        FuseWidgetModule
    ],
    providers: [
        AnalyticsDateDashboardService
    ]
})
export class AnalyticsDateDashboardModule {
}

