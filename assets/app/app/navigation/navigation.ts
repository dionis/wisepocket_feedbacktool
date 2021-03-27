import { FuseNavigation } from '../../@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Aplicaciones',
        translate: 'Aplicaciones',
        type     : 'group',
        children : [
            {
                id       : 'sample',
                title    : 'Sample',
                translate: 'NAV.SAMPLE.TITLE',
                type     : 'item',
                icon     : 'email',
                url      : '/sample',
                badge    : {
                    title    : '25',
                    translate: 'NAV.SAMPLE.BADGE',
                    bg       : '#F44336',
                    fg       : '#FFFFFF'
                }
            }
        ]
    },
    {
        id       : 'campaing',
        title    : 'Campaing',
        translate: 'CAMPAING',
        type     : 'group',
        children : [
            {
                id       : 'opinion_mailbox',
                title    : 'Opinion Mailbox',
                translate: 'Opinion Mailbox',
                type     : 'item',
                icon     : 'list',
                url      : '/apps/contacts',
                badge    : {
                    title    : '25',
                    translate: '25',
                    bg       : '#F44336',
                    fg       : '#FFFFFF'
                }
            },
            {
                id       : 'opinion_analysis',
                title    : 'Opinion Analysis',
                translate: 'Opinion Analysis',
                type     : 'item',
                icon     : 'shopping_cart',
                url      : '/apps/mail'
            },
        ]
    },
   
    {
        id       : 'statistics',
        title    : 'Statistics',
        translate: 'Statistics',
        type     : 'group',
        children : [
            {
                id       : 'est_date',
                title    : 'Opinion statistics by date',
                translate: 'Statistics by date',
                type     : 'item',
                icon     : 'email',
                url      : '/apps/dashboards/analytics'
            },
            {
                 id      : 'est_idioma',
                title    : 'Opinion statistics by language',
                translate: 'Statistics by language',
                type     : 'item',
                icon     : 'account_box',
                url      : '/apps/dashboards/project'
            },
        ]
    },
    {
        id       : 'record',
        title    : 'Record',
        translate: 'RECORD',
        type     : 'group',
        children : [
        {
            id       : 'reg',
            title    : 'Record',
            translate: 'Record',
            type     : 'item',
            icon     : 'send',
            url      : '/apps/todo'
        },
        ]
    }
];

