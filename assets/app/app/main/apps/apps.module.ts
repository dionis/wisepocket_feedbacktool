import { DeprecatedLoadChildren, LoadChildren, LoadChildrenCallback } from '@angular/router/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { FuseSharedModule } from '../../../@fuse/shared.module';

//<<<<<<< HEAD
// const routes = [
//     {
//         path        : 'dashboards/analytics',
//         loadChildren: () => import('./dashboards/analytics/analytics.module').then(m => m.AnalyticsDashboardModule)
//     },
//     {
//         path        : 'dashboards/project',
//         loadChildren: () => import('./dashboards/project/project.module').then(m => m.ProjectDashboardModule)
//     },
//     {
//         path        : 'mail',
//         loadChildren: () => import('./mail/mail.module').then(m => m.MailModule)
//     },
//     {
//         path        : 'mail-ngrx',
//         loadChildren: () => import('./mail-ngrx/mail.module').then(m => m.MailNgrxModule)
//     },
//     {
//         path        : 'chat',
//         loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule)
//     },
//     {
//         path        : 'calendar',
//         loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule)
//     },
//     {
//         path        : 'e-commerce',
//         loadChildren: () => import('./e-commerce/e-commerce.module').then(m => m.EcommerceModule)
//     },
//     {
//         path        : 'academy',
//         loadChildren: () => import('./academy/academy.module').then(m => m.AcademyModule)
//     },
//     {
//         path        : 'todo',
//         loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule)
//     },
//     {
//         path        : 'file-manager',
//         loadChildren: () => import('./file-manager/file-manager.module').then(m => m.FileManagerModule)
//     },
//     {
//         path        : 'contacts',
//         loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule)
//     },
//     {
//         path        : 'scrumboard',
//         loadChildren: () => import('./scrumboard/scrumboard.module').then(m => m.ScrumboardModule)
//     }
// ];

//const routes = [
//=======
/*const routes = [
>>>>>>> 66934c029b1ec91ef0ff8e5cdae856d31738e0cd
    {
        path: 'dashboards/analytics',
        loadChildren: () => import('./dashboards/analytics/analytics.module').then(m => m.AnalyticsDashboardModule)
    },
    {
        path: 'dashboards/project',
        loadChildren: () => import('./dashboards/project/project.module').then(m => m.ProjectDashboardModule)
    },
    {
        path: 'mail',
        loadChildren: () => import('./mail/mail.module').then(m => m.MailModule)
    },
    {
        path: 'mail-ngrx',
        loadChildren: () => import('./mail-ngrx/mail.module').then(m => m.MailNgrxModule)
    },
    {
        path: 'chat',
        loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule)
    },
    {
        path: 'calendar',
        loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule)
    },
    {
        path: 'e-commerce',
        loadChildren: () => import('./e-commerce/e-commerce.module').then(m => m.EcommerceModule)
    },
    {
        path: 'academy',
        loadChildren: () => import('./academy/academy.module').then(m => m.AcademyModule)
    },
    {
        path: 'todo',
        loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule)
    },
    {
        path: 'file-manager',
        loadChildren: () => import('./file-manager/file-manager.module').then(m => m.FileManagerModule)
    },
    {
        path: 'contacts',
        loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule)
    },
    {
//<<<<<<< HEAD
        path : 'analyticsbyIdioma',
        loadChildren: () => import('./analyticsbyIdioma/analytics.module').then(m => m.AnalyticsDashboardModule)
    },
    {
        path : 'campaign',
        LoadChildren: () => import('./campaign/campaign.module').then(m => m.CampaignModule)
    },
];
=======
        path: 'scrumboard',
        loadChildren: () => import('./scrumboard/scrumboard.module').then(m => m.ScrumboardModule)
    }
];*/
//>>>>>>> 66934c029b1ec91ef0ff8e5cdae856d31738e0cd

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
        path:  'products',
        LoadChildren: () => import('../apps/e-commerce/products/products.component').then(m => m.EcommerceProductsComponent)
    },
    {
        path        : 'analytics',
        loadChildren: () => import('../apps/analytics/analytics.module').then(m => m.AnalyticsDashboardModule)
    },
    {
        path: 'analyticsbyIdioma',
        loadChildren: () => import('../apps/analyticsbyIdioma/analytics.module').then(m => m.AnalyticsDashboardModule)
    },
    {
        path: 'opinionMailbox',
        loadChildren: () => import('../apps/opinionMailbox/opinionMailbox.module').then(m => m.OpinionModule)
    },
    /*{
        path: 'opinionAnalytics',
        loadChildren: () => import('../apps/opinionAnalytics/opinionAnalytics.module').then(m =>m.OpinionAnalytics)
    },*/
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        FuseSharedModule
    ]
})
export class AppsModule {
}
