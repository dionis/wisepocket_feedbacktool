import { url } from 'inspector';
import { FuseNavigation } from '../../@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'mis campañas',
        title: 'Mis Campañas',
        translate: '',
        type: 'group',
        children: [
            {
                id: 'listCamp',
                title: 'Lista de Campañas',
                translate: 'NAV.CampaignList.TITLE',
                type: 'item',
                icon: '',
                url: '/apps/campaign/myCampaigns',
            }
        ]
    },
    {
        id: 'opinion',
        title: 'Opinion',
        translate: 'NAV.Opinion.TITLE',
        type: 'group',
        children: [
            {
                id: 'opinion_mailbox',
                title: 'Opinion Mailbox',
                translate: 'Opinion Mailbox',
                type: 'item',
                icon: 'email',
                url: '/apps/mail',
                badge: {
                    title: '25',
                    translate: '25',
                    bg: '#F44336',
                    fg: '#FFFFFF'
                }
            },
            {
                id: 'opinion_analysis',
                title: 'Opinion Analysis',
                translate: 'Opinion Analysis',
                type: 'item',
                icon: 'email',
                url: '/apps/contacts'
            },
        ]
    },

    {
        id: 'statistics',
        title: 'Estadísticas de Opinion',
        translate: 'NAV.STATISTICS.TITLE',
        type: 'group',
        children: [
            {
                id: 'est_date',
                title: 'Opinion statistics by date',
                translate: 'Statistics by date',
                type: 'item',
                icon: 'list',
                url: '/apps/analytics'
            },
            {
                id: 'est_idioma',
                title: 'Estadísticas por idioma',
                translate: 'NAV.Opinion Statistics by idioma.TITLE',
                type: 'item',
                icon: 'list',
                url: '/apps/analyticsbyIdioma'
            },
            {
                id: 'est_polaridad',
                title: 'Estadísticas por polaridad',
                translate: 'NAV.Opinion Statistics by polaridad.TITLE',
                type: 'item',
                icon: 'list',
                url: '/apps/analyticsbyPolaridad'
            },
        ]
    },

    {
        id: 'record',
        title: 'Record',
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
        {
            id    :'test',
            title : 'Prueba del OpinionMailbox',
            translate : 'Prueba del OpinionMailbox',
            type : 'item',
            url : '/apps/opinionMailbox'
        },
        // {
        //     id:'test2',
        //     title:'Prueba del OpinionAnalytics',
        //     translate:'Prueba del OpinionAnalytics',
        //     type: 'item',
        //     url: '/apps/opinionAnalytics'
        // },
        // {
        //     id:'test3',
        //     title:'Prueba del AnalyticsPolarity',
        //     translate:'Prueba del AnalyticsPolarity',
        //     type: 'item',
        //     url: '/apps/analyticsPolarity'
        // },
        // {
        //     id:'test4',
        //     title:'Prueba del AnalyticsDate',
        //     translate:'Prueba del AnalyticsDate',
        //     type: 'item',
        //     url: '/apps/analyticsDate'
        // },
        // {
        //     id:'test5',
        //     title:'Prueba del Campaign',
        //     translate:'Prueba del Campaign',
        //     type: 'item',
        //     url: '/apps/campaign'
        // },
        {
          id:'test6',
          title:'Prueba de Contactos',
          translate:'Prueba de Contactos',
          type: 'item',
          url: '/apps/contacts'
      },

        

        ]
    }
];

