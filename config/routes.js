/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝
  "GET /": { action: "view-homepage-or-redirect" },
  "GET /welcome/:unused?": { action: "dashboard/view-welcome" },

  "GET /faq": { action: "view-faq" },
  "GET /legal/terms": { action: "legal/view-terms" },
  "GET /legal/privacy": { action: "legal/view-privacy" },
  "GET /contact": { action: "view-contact" },

  "GET /signup": { action: "entrance/view-signup" },
  "GET /email/confirm": { action: "entrance/confirm-email" },
  "GET /email/confirmed": { action: "entrance/view-confirmed-email" },

  "GET /login": { action: "entrance/view-login" },
  "GET /password/forgot": { action: "entrance/view-forgot-password" },
  "GET /password/new": { action: "entrance/view-new-password" },

  "GET /account": { action: "account/view-account-overview" },
  "GET /account/password": { action: "account/view-edit-password" },
  "GET /account/profile": { action: "account/view-edit-profile" },

  //  ╔╦╗╦╔═╗╔═╗  ╦═╗╔═╗╔╦╗╦╦═╗╔═╗╔═╗╔╦╗╔═╗   ┬   ╔╦╗╔═╗╦ ╦╔╗╔╦  ╔═╗╔═╗╔╦╗╔═╗
  //  ║║║║╚═╗║    ╠╦╝║╣  ║║║╠╦╝║╣ ║   ║ ╚═╗  ┌┼─   ║║║ ║║║║║║║║  ║ ║╠═╣ ║║╚═╗
  //  ╩ ╩╩╚═╝╚═╝  ╩╚═╚═╝═╩╝╩╩╚═╚═╝╚═╝ ╩ ╚═╝  └┘   ═╩╝╚═╝╚╩╝╝╚╝╩═╝╚═╝╩ ╩═╩╝╚═╝

  "/terms": "/legal/terms",
  "/logout": "/api/v1/account/logout",

  //User's Requests
  "POST /user/singUp": "UserController.singUp",
  "POST /user/singIn": "UserController.login",
  "POST /user/logout": "UserController.logout",
  "PUT /user/getSession": "UserController.getSessionUser",
  "GET /user/getUserById/_id": "UserController.getUserById",
  "GET /user/getIdUserConnected": "UserController.getIdUserConnected",

  //Image's Requests
  "POST /imagen/addImg": "ImagenController.create",

  //Campaign Requests //DEJAR SOLO MOSTRAR CAMPAÑA POR USUARIO
  //DE MOMENTO SE DEJAN LOS SERVICIOS PARA CREAR BASE DE DATOS TEMPORAL
  "POST /campaign/create": "CampaignController.create",

  //"PATCH /campaign/editCampaign": "CampaignController.editCampaign",
  // "DELETE /campaign/deleteCampaign": "CampaignController.deleteCampaign",
  "GET /campaign/getCampaign": "CampaignController.getCampaign",
  "GET /campaign/getCampaignById": "CampaignController.getCampaignById",
  "GET /campaign/getInvitadoXCamp": "CampaignController.getInvitadoXCamp",
  "GET /campaign/countUserCampaigns": "CampaignController.countUserCampaigns",
  "GET /campaign/getCampaignbyUser": "CampaignController.getCampaignbyUser", //DEJAR ESTE SERVICE

  //Services Requests
  //POST
  "POST /userend/create": "UserEndController.create",
  "POST /opinion/create": "OpinionController.create",
  "POST /pregunta/create": "PreguntaController.create",
  "POST /respuesta/create": "RespuestaController.create",
  "POST /registro/create": "RegistroController.create",
  "POST /aspectoopinion/create": "AspectoOpinionController.create",
  "POST /entidadopinion/create": "EntidadOpinionController.create",
  "POST /userInvitado/create": "UserInvitadoController.create",
  "POST /userInvitado/addCampaigns": "UserInvitadoController.addCampaigns",
  "POST /acceso/darAcceso": "AccesoController.darAcceso",

  //DELETE
  //'DELETE /opinion/deleteOpinion': 'OpinionController.deleteOpinion',
  "DELETE /opinion/deleteAllOpinion": "OpinionController.deleteAllOpinion",
  "DELETE /pregunta/deletePregunta": "PreguntaController.deletePregunta",
  "DELETE /pregunta/deleteAllPregunta": "PreguntaController.deleteAllPregunta",
  "DELETE /respuesta/deleteAllRespuesta":
    "RespuestaController.deleteAllRespuesta",
  "DELETE /registro/deleteAllRegistro": "RegistroController.deleteAllRegistro",
  "DELETE /aspectoopinion/deleteAllAspecto":
    "AspectoOpinionController.deleteAllAspecto",
  "DELETE /entidadopinion/deleteAllEntidad":
    "EntidadOpinionController.deleteAllEntidad",
  "DELETE /userend/deleteAllUserEnd": "UserEndController.deleteAllUserEnd",
  "DELETE /userInvitado/deleteUserInvitado":
    "UserInvitadoController.deleteUserInvitado",

  //GET and for Pages
  "GET /opinion/getOpinion": "OpinionController.getOpinion",
  "GET /opinion/getOpinionbyFilter": "OpinionController.getOpinionbyFilter", 
  "GET /opinion/getOpinionXIdiomaCamp":
    "OpinionController.getOpinionXIdiomaCamp",
  "GET /pregunta/getPregunta": "PreguntaController.getPregunta",
  "GET /respuesta/getRespuesta": "RespuestaController.getRespuesta",
  "GET /registro/getRegistro": "RegistroController.getRegistro",
  "GET /aspectoopinion/getAspecto": "AspectoOpinionController.getAspecto",
  "GET /entidadopinion/getEntidad": "EntidadOpinionController.getEntidad",
  "GET /registro/getAllRegistro": "RegistroController.getAllRegistro",
  "GET /estadisticaByidioma/getCantENXDia":
    "EstadisticaByidiomaController.getCantENXDia",
  "GET /estadisticaByidioma/getCantESXDia":
    "EstadisticaByidiomaController.getCantESXDia",
  "GET /estadisticaByidioma/getCantTotalXDia":
    "EstadisticaByidiomaController.getCantTotalXDia",
  "GET /estadisticaByTipo/getCPostivaXDia":
    "EstadisticaByTipoController.getCPostivaXDia",
  "GET /estadisticaByTipo/getCNegativaXDia":
    "EstadisticaByTipoController.getCNegativaXDia",
  "GET /estadisticaByTipo/getCNeutraXDia":
    "EstadisticaByTipoController.getCNeutraXDia",
  "GET /estadisticaByTipo/getCantTotalXDia":
    "EstadisticaByTipoController.getCantTotalXDia",
  //"GET /estadisticaByidioma/getCantENXDiaEx": "EstadisticaByidiomaController.getCantENXDiaEx",
  "GET /estadisticaByidioma/getIntervalInADay":
    "EstadisticaByidiomaController.getIntervalInAday",

  "GET /userInvitado/getCampXInvitado":
    "UserInvitadoController.getCampXInvitado",
  "GET /userInvitado/getInvitados": "UserInvitadoController.getInvitados",
  "GET /userInvitado/getInvXUserChief":
    "UserInvitadoController.getInvXUserChief",
  "GET /userInvitado/getInvitadoById": "UserInvitadoController.getInvitadoById",
  "GET /acceso/getStatusAcceso": "AccesoController.getStatusAcceso",

  //PATCH
  "PATCH /userInvitado/updateInfo": "UserInvitadoController.updateInfo",
  "PATCH /userInvitado/updatePass": "UserInvitadoController.updatePass",
  "PATCH /userInvitado/updateAcces": "UserInvitadoController.updateAcces",
  "PATCH /acceso/quitarAcceso": "AccesoController.quitarAcceso",
  //"PATCH /userInvitado/updateisAdmin": "UserInvitadoController.updateisAdmin",

  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝
  // …

  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝
  // Note that, in this app, these API endpoints may be accessed using the `Cloud.*()` methods
  // from the Parasails library, or by using those method names as the `action` in <ajax-form>.
  "/api/v1/account/logout": { action: "account/logout" },
  "PUT   /api/v1/account/update-password": {
    action: "account/update-password",
  },
  "PUT   /api/v1/account/update-profile": { action: "account/update-profile" },
  "PUT   /api/v1/account/update-billing-card": {
    action: "account/update-billing-card",
  },
  "PUT   /api/v1/entrance/login": { action: "entrance/login" },
  "POST  /api/v1/entrance/signup": { action: "entrance/signup" },
  "POST  /api/v1/entrance/send-password-recovery-email": {
    action: "entrance/send-password-recovery-email",
  },
  "POST  /api/v1/entrance/update-password-and-login": {
    action: "entrance/update-password-and-login",
  },
  "POST  /api/v1/deliver-contact-form-message": {
    action: "deliver-contact-form-message",
  },
};
