import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSortModule } from '@angular/material/sort';

import { TranslateModule } from '@ngx-translate/core';

import { MatPaginatorModule } from '@angular/material/paginator';
import { FuseSharedModule } from '../../../../@fuse/shared.module';
import { FuseSidebarModule } from '../../../../@fuse/components';

import { OpinionService } from '../../../services/opinion-analizer.service';
import { OpinionMailboxComponent } from '../../../../app/main/apps/opinionMailbox/opinionMailbox.component';
import { MailboxListComponent } from '../../../../app/main/apps/opinionMailbox/mailbox-list/mailbox-list.component';
import { MailboxListItemComponent } from '../../../../app/main/apps/opinionMailbox/mailbox-list/opinion-list-item/opinion-list-item.component';
import { OpinionDetailsComponent } from '../../../../app/main/apps/opinionMailbox/opinion-details/opinion-details.component';
import { MailboxMainSidebarComponent } from '../../../../app/main/apps/opinionMailbox/sidebars/main/mailbox-main-sidebar.componet';

import {OpinionComposeDialogComponent}from '../../../../app/main/apps/opinionMailbox/dialogs/compose/compose.component';

import { EcommerceOrdersService } from '../../../../app/main/apps/e-commerce/orders/orders.service';
import { CampaignSelectGuard } from '../guards/campaign-select.guard';
import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';
import { PolarityBackgroundDirective } from './mailbox-list/opinion-list-item/polarityDirective/polarity-background.directive';
//import { PolarityBackgroundDirective } from './mailbox-list/opinion-list-item/polarityDirective/polarity-background.directive';
import {NgxPrintModule} from 'ngx-print';
const routes: Routes = [
    {
        path     : 'label/:labelHandle',
        component: OpinionMailboxComponent,
        canActivate:[CampaignSelectGuard],
        resolve  : {
            opinion: OpinionService,
            data: EcommerceOrdersService
        }
    },
    {
        path     : 'paginate/:pageIndex/:pageSize',
        component: OpinionMailboxComponent,
        canActivate:[CampaignSelectGuard],
        resolve  : {
            opinion: OpinionService,
            data: EcommerceOrdersService
        }
    },
    {
        path     : 'label/:labelHandle/:opinionId',
        component: OpinionMailboxComponent,
        canActivate:[CampaignSelectGuard],
        resolve  : {
            opinion: OpinionService,
            data: EcommerceOrdersService
        }
    },
    {
        path     : 'filter/:filterHandle',
        component: OpinionMailboxComponent,
        canActivate:[CampaignSelectGuard],
        resolve  : {
            opinion: OpinionService,
            data: EcommerceOrdersService
        }
    },
    {
        path     : 'filter/:filterHandle/:opinionId',
        component: OpinionMailboxComponent,
        canActivate:[CampaignSelectGuard],
        resolve  : {
            opinion: OpinionService,
            data: EcommerceOrdersService
        }
    },
    {
        path     : ':folderHandle',
        component: OpinionMailboxComponent,
        canActivate:[CampaignSelectGuard],
        resolve  : {
            opinion: OpinionService,
            data: EcommerceOrdersService
        }
    },
    {
        path     : ':folderHandle/:opinionId',
        component: OpinionMailboxComponent,
        canActivate:[CampaignSelectGuard],
        resolve  : {
            opinion: OpinionService,
            data: EcommerceOrdersService
        }
    },
    {
        path      : '**',
        canActivate:[CampaignSelectGuard],
        redirectTo: 'inbox'
    }
];

@NgModule({
    declarations   : [
        OpinionMailboxComponent,
        MailboxListComponent,
        MailboxListItemComponent,
        OpinionDetailsComponent,
        MailboxMainSidebarComponent,
        OpinionComposeDialogComponent,
        AdvancedSearchComponent,
        PolarityBackgroundDirective
    ],
    imports        : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatSelectModule,
        MatToolbarModule,
        MatPaginatorModule,
        MatTableModule,
        MatTabsModule,
        MatSortModule,

        TranslateModule,

        FuseSharedModule,
        FuseSidebarModule,
        NgxPrintModule
    ],
    providers      : [
        OpinionService,
        EcommerceOrdersService
    ],
    entryComponents: [
        OpinionComposeDialogComponent
    ],
    exports:[PolarityBackgroundDirective]
})
export class OpinionModule
{
}
