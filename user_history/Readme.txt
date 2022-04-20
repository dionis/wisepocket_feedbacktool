Auth Guard

Los Guard son clases cuyas funciones se ejecutan antes de iniciar los componentes, 
se utilizan para proteger las rutas.
Son clases que implementan el método canActivate que retorna o un observable un promise o un boolean.
En el caso de AuthGuard el funcionamiento es muy sencillo se inyecta el use-service y se pregunta a través
metodo isLoggedIn si el user esta logueado de ser asi se retorna true en caso contrario se llama al metodo logout del
user-service y se navega hasta el login.

En el CampaignSelectGuard se hace algo parecido se pregunta por el id de campaña en el localStorage si existe retorna
treu si no navega hacia la lista de campaña y muestra un mensaje diciendo q debe elejir una campaña.

Para que los guard puedan ser utilizados en los modulos donde se encuentran las rutas y añadir la clave canActivate
como se muestra.
{
        path     : 'label/:labelHandle',
        component: OpinionMailboxComponent,
        canActivate:[CampaignSelectGuard],
},