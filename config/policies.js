/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,
  UserController: {
    '*': 'isAuthenticated',
    login: true,
    singUp: true,
    logout: true,
    getUserById:true
  },

  /*CampingController: {
    '*': 'isAuthenticated',
    editCamping: true,
    getCampings:true,
    deleteCamping:true,
  },*/

  CampaignController: {
    '*': 'isAuthenticated',
    create:true,
    getCampaignbyUser:true,
    getInvitadoXCamp:true
   // editCampaign: true,
   // getCampaign:true,
   // deleteCampaign:true,
  },

 


  ImagenController: {
    '*': 'isAuthenticated',
    create: true,
  },

};
