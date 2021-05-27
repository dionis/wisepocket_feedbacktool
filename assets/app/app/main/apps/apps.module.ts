import { DeprecatedLoadChildren, LoadChildren, LoadChildrenCallback } from '@angular/router/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { FuseSharedModule } from '../../../@fuse/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

const routes = [
    {
        path: 'wizard',
        loadChildren: () => import('../ui/forms/forms.module').then(m => m.UIFormsModule)
    },
    {
        path: 'pages',
        loadChildren: () => import('../pages/pages.module').then(m => m.PagesModule)
    },
    {
        path: 'mail',
        loadChildren: () => import('../apps/mail/mail.module').then(m => m.MailModule)
    },
    {
        path: 'mail-ngrx',
        loadChildren: () => import('../apps/mail-ngrx/mail.module').then(m => m.MailNgrxModule)
    },
    {
        path: 'e-commerce',
        loadChildren: () => import('../apps/e-commerce/e-commerce.module').then(m => m.EcommerceModule)
    },
    {
        path: 'contacts',
        loadChildren: () => import('../apps/contacts/contacts.module').then(m => m.ContactsModule)
    },
    {
        path: 'products',
        LoadChildren: () => import('../apps/e-commerce/products/products.component').then(m => m.EcommerceProductsComponent)
    },
    {
        path: 'analytics',
        loadChildren: () => import('../apps/analytics/analytics.module').then(m => m.AnalyticsDashboardModule)
    },
    {
        path: 'analyticsbyIdioma',
        loadChildren: () => import('./analyticsBy-Idioma/analytics.module').then(m => m.AnalyticsDashboardModule)
    },
    {
        path: 'analyticsbyPolaridad',
        loadChildren: () => import('./analyticsBy-Polaridad/analytics.module').then(m => m.AnalyticsDashboardModule)
    },
    {
        path: 'opinionMailbox',
        loadChildren: () => import('../apps/opinionMailbox/opinionMailbox.module').then(m => m.OpinionModule)
    },
    {
        path: 'analyticsPolarity',
        loadChildren: () => import('../apps/analyticsbyPolarity/analyticsPolarity.module').then(m => m.AnalyticsPolarityDashboardModule)
    },
    {
        path: 'analyticsDate',
        loadChildren: () => import('../apps/analyticsbyDate/analyticsDate.module').then(m => m.AnalyticsDateDashboardModule)
    },
    {
        path: 'campaign',
        loadChildren: () => import('../apps/campaign/campaign.module').then(m => m.CampaignModule)
    },
    {
        path: 'userInvManage',
        loadChildren: () => import('../apps/userInv-Manage/contacts.module').then(m =>m.ContactsModule)
    },

    /*{
        path: 'opinionAnalytics',
        loadChildren: () => import('../apps/opinionAnalytics/opinionAnalytics.module').then(m =>m.OpinionAnalytics)
    },*/
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        FuseSharedModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule
    ]
})
export class AppsModule {
}
