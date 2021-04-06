import { FuseNavigation } from '../../@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'mis campañas',
        title    : 'Mis Campañas',
        translate: '',
        type     : 'group',
        children : [
            {
                id       : 'listCamp',
                title    : 'Lista de Campañas',
                translate: 'NAV.CampaignList.TITLE',
                type     : 'item',
                icon     : '',
                url      : '/apps/campaign',
            }
        ]
    },
    {
        id       : 'opinion',
        title    : 'Opinion',
        translate: 'NAV.Opinion.TITLE',
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
        title    : 'Estadísticas de Opinion',
        translate: 'NAV.STATISTICS.TITLE',
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
                title    : 'Estadísticas por idioma',
                translate: 'NAV.Opinion Statistics by idioma.TITLE',
                type     : 'item',
                icon     : '',
                url      : '/apps/analyticsbyIdioma'
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

