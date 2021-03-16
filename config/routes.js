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
  'GET /': { action: 'view-homepage-or-redirect' },
  'GET /welcome/:unused?': { action: 'dashboard/view-welcome' },

  'GET /faq': { action: 'view-faq' },
  'GET /legal/terms': { action: 'legal/view-terms' },
  'GET /legal/privacy': { action: 'legal/view-privacy' },
  'GET /contact': { action: 'view-contact' },

  'GET /signup': { action: 'entrance/view-signup' },
  'GET /email/confirm': { action: 'entrance/confirm-email' },
  'GET /email/confirmed': { action: 'entrance/view-confirmed-email' },

  'GET /login': { action: 'entrance/view-login' },
  'GET /password/forgot': { action: 'entrance/view-forgot-password' },
  'GET /password/new': { action: 'entrance/view-new-password' },

  'GET /account': { action: 'account/view-account-overview' },
  'GET /account/password': { action: 'account/view-edit-password' },
  'GET /account/profile': { action: 'account/view-edit-profile' },


  //  ╔╦╗╦╔═╗╔═╗  ╦═╗╔═╗╔╦╗╦╦═╗╔═╗╔═╗╔╦╗╔═╗   ┬   ╔╦╗╔═╗╦ ╦╔╗╔╦  ╔═╗╔═╗╔╦╗╔═╗
  //  ║║║║╚═╗║    ╠╦╝║╣  ║║║╠╦╝║╣ ║   ║ ╚═╗  ┌┼─   ║║║ ║║║║║║║║  ║ ║╠═╣ ║║╚═╗
  //  ╩ ╩╩╚═╝╚═╝  ╩╚═╚═╝═╩╝╩╩╚═╚═╝╚═╝ ╩ ╚═╝  └┘   ═╩╝╚═╝╚╩╝╝╚╝╩═╝╚═╝╩ ╩═╩╝╚═╝

  '/terms': '/legal/terms',
  '/logout': '/api/v1/account/logout',


  //User's Requests
  'POST /user/singUp': 'UserController.singUp',
  'POST /user/singIn': 'UserController.login',
  'POST /user/logout': 'UserController.logout',
  'GET /user/getUserById/_id': 'UserController.getUserById',

  //Image's Requests
  'POST /addImg': 'ImagenController.create',

  //Camping's Requests
  /* 'POST /camping/addCamping': 'CampingController.create',
   'PATCH /camping/editCamping': 'CampingController.editCamping',
   'DELETE /camping/deleteCamping': 'CampingController.deleteCamping',
   'GET /camping/campingslist': 'CampingController.getCampings',
   'GET /camping/campingslistbyUser/:_id': 'CampingController.getCampingsbyUser',*/

  ///////////////////////////
  'POST /campaign/create': 'CampaignController.create',
  'PATCH /campaign/editCampaign': 'CampaignController.editCampaign',
  'DELETE /campaign/deleteCampaign': 'CampaignController.deleteCampaign',
  'GET /campaign/getCampaign': 'CampaignController.getCampaign',
  'GET /campaign/getCampaignbyUser/_id': 'CampaignController.getCampaignbyUser',
  ///////////////////////////

  //Services Requests
  //POST
  'POST /userend/create': 'UserEndController.create',
  'POST /opinion/create': 'OpinionController.create',
  'POST /pregunta/create': 'PreguntaController.create',
  'POST /respuesta/create': 'RespuestaController.create',
  'POST /registro/create': 'RegistroController.create',
  'POST /aspectoopinion/create': 'AspectoOpinionController.create',
  'POST /entidadopinion/create': 'EntidadOpinionController.create',

  //DELETE
  'DELETE /opinion/deleteOpinion': 'OpinionController.deleteOpinion',
  'DELETE /opinion/deleteAllOpinion': 'OpinionController.deleteAllOpinion',
  'DELETE /pregunta/deletePregunta': 'PreguntaController.deletePregunta',
  'DELETE /pregunta/deleteAllPregunta': 'PreguntaController.deleteAllPregunta',
  'DELETE /respuesta/deleteAllRespuesta': 'RespuestaController.deleteAllRespuesta',
  'DELETE /registro/deleteAllRegistro': 'RegistroController.deleteAllRegistro',
  'DELETE /aspectoopinion/deleteAllAspecto': 'AspectoOpinionController.deleteAllAspecto',
  'DELETE /entidadopinion/deleteAllEntidad': 'EntidadOpinionController.deleteAllEntidad',

  //POST for GET and Pages
  'POST /opinion/getOpinion': 'OpinionController.getOpinion',
  'POST /pregunta/getPregunta': 'PreguntaController.getPregunta',
  'POST /respuesta/getRespuesta': 'RespuestaController.getRespuesta',
  'POST /registro/getRegistro': 'RegistroController.getRegistro',
  'POST /aspectoopinion/getAspecto': 'AspectoOpinionController.getAspecto',
  'POST /entidadopinion/getEntidad': 'EntidadOpinionController.getEntidad',
  // 'POST /aspectoopinion/getAllAspectoXOpinion':'AspectoOpinionController.getAllAspectoXOpinion',
  // 'POST /entidadopinion/getAllEntidadesXOpinion':'EntidadOpinionController.getAllEntidadesXOpinion',

  //GET
  'GET /registro/getAllRegistro': 'RegistroController.getAllRegistro',


  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝
  // …


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝
  // Note that, in this app, these API endpoints may be accessed using the `Cloud.*()` methods
  // from the Parasails library, or by using those method names as the `action` in <ajax-form>.
  '/api/v1/account/logout': { action: 'account/logout' },
  'PUT   /api/v1/account/update-password': { action: 'account/update-password' },
  'PUT   /api/v1/account/update-profile': { action: 'account/update-profile' },
  'PUT   /api/v1/account/update-billing-card': { action: 'account/update-billing-card' },
  'PUT   /api/v1/entrance/login': { action: 'entrance/login' },
  'POST  /api/v1/entrance/signup': { action: 'entrance/signup' },
  'POST  /api/v1/entrance/send-password-recovery-email': { action: 'entrance/send-password-recovery-email' },
  'POST  /api/v1/entrance/update-password-and-login': { action: 'entrance/update-password-and-login' },
  'POST  /api/v1/deliver-contact-form-message': { action: 'deliver-contact-form-message' },

};
