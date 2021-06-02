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
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '../../../../@fuse/shared.module';
import { FuseSidebarModule } from '../../../../@fuse/components';

import { OpinionService } from '../../../services/opinion-analizer.service';
import { OpinionMailboxComponent } from '../../../../app/main/apps/opinionMailbox/opinionMailbox.component';
import { MailboxListComponent } from '../../../../app/main/apps/opinionMailbox/mailbox-list/mailbox-list.component';
import { MailboxListItemComponent } from '../../../../app/main/apps/opinionMailbox/mailbox-list/opinion-list-item/opinion-list-item.component';
import { OpinionDetailsComponent } from '../../../../app/main/apps/opinionMailbox/opinion-details/opinion-details.component';
import { MailboxMainSidebarComponent } from '../../../../app/main/apps/opinionMailbox/sidebars/main/mailbox-main-sidebar.componet';

import {OpinionComposeDialogComponent}from '../../../../app/main/apps/opinionMailbox/dialogs/compose/compose.component';
import { CampaignSelectGuard } from '../guards/campaign-select.guard';
import { OpinionPruebaService } from '../../../services/opinion-prueba.service';

const routes: Routes = [
    {
         path     : 'opiniones',
        component: MailboxListComponent,
        canActivate: [CampaignSelectGuard],
        resolve  : {
            opinion: OpinionPruebaService
        }
    },
    {
        path     : 'label/:labelHandle/:opinionId',
        component: OpinionMailboxComponent,
        canActivate: [CampaignSelectGuard],
        resolve  : {
            opinion: OpinionService
        }
    },
    {
        path     : 'filter/:filterHandle',
        component: OpinionMailboxComponent,
        canActivate: [CampaignSelectGuard],
        resolve  : {
            opinion: OpinionService
        }
    },
    {
        path     : 'filter/:filterHandle/:opinionId',
        component: OpinionMailboxComponent,
        canActivate: [CampaignSelectGuard],
        resolve  : {
            opinion: OpinionService
        }
    },
    {
        path     : ':folderHandle',
        component: OpinionMailboxComponent,
        canActivate: [CampaignSelectGuard],
        resolve  : {
            opinion: OpinionService
        }
    },
    {
        path     : ':folderHandle/:opinionId',
        component: OpinionMailboxComponent,
        canActivate: [CampaignSelectGuard],
        resolve  : {
            opinion: OpinionService
        }
    },
    {
        path      : '**',
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
        OpinionComposeDialogComponent
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

        TranslateModule,

        FuseSharedModule,
        FuseSidebarModule
    ],
    providers      : [
        OpinionService
    ],
    entryComponents: [
        OpinionComposeDialogComponent
    ]
})
export class OpinionModule
{
}
