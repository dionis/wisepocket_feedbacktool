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
        id       : 'campaña',
        title    : 'Campañas',
        translate: 'CAMPAÑA',
        type     : 'group',
        children : [
            {
                id       : 'buzon_opiniones',
                title    : 'Buzon de Opiniones',
                translate: 'Buzon de Opiniones',
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
                id       : 'analisis_opiniones',
                title    : 'Analisis de Opiniones',
                translate: 'Analisis de Opiniones',
                type     : 'item',
                icon     : 'shopping_cart',
                url      : '/apps/mail'
            },
        ]
    },
   
    {
        id       : 'estadisticas',
        title    : 'Estadisticas',
        translate: 'ESTADISTICAS',
        type     : 'group',
        children : [
            {
                id       : 'est_fecha',
                title    : 'Estadisticas de opiniones por Fecha',
                translate: 'Estadisticas por Fecha',
                type     : 'item',
                icon     : 'email',
                url      : '/apps/dashboards/analytics'
            },
            {
                 id      : 'est_idioma',
                title    : 'Estadisticas de opiniones por Idiomas',
                translate: 'Estadisticas por Idioma',
                type     : 'item',
                icon     : 'account_box',
                url      : '/apps/dashboards/project'
            },
        ]
    },
    {
        id       : 'regist',
        title    : 'Registro',
        translate: 'REGISTRO',
        type     : 'group',
        children : [
        {
            id       : 'registro',
            title    : 'Registro',
            translate: 'Registro',
            type     : 'item',
            icon     : 'send',
            url      : '/apps/todo'
        },
        ]
    }
];

