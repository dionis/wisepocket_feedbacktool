/**
 * AdminloginController
 *
 * @description :: Server-side logic for managing adminlogins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  create: function (req, res) {
    //Validate parameters.
    if (req.param('username') === undefined) {
      return res.json({status: "error", info: sails.__("USERNAME_REQUIRED")});
    }

    if (req.param('password') === undefined) {
      return res.json({status: "error", info: sails.__("PASSWORD_REQUIRED")});
    }

    var tempAdminLogin = {
      username: req.param('username'),
      password: req.param('password')
    };

    //Verify if the isActivated parameter was provided.
    if (req.param('isActivated')) {
      var tmpAct = req.param('isActivated');
      if (tmpAct !== true && tmpAct !== false) {
        return res.json({status: "error", info: sails.__("INVALID_ISACTIVATED")});
      }
      else {
        tempAdminLogin.isActivated = (tmpAct === true);
      }
    }

    //Before create the adminlogin, check that there isn't other with that username.

    Adminlogin.findOne({username: tempAdminLogin.username})
      .exec(function (err, Adminloginfounded) {
        if (err) {
          return res.json({status: "error", info: sails.__("ERROR_SEARCHING_LOGIN")});
        }

        if (Adminloginfounded) {
          return res.json({status: "error", info: sails.__("USERNAME_IN_USE")});
        }

        Adminlogin.create(tempAdminLogin)
          .exec(function (err, AdminloginCreated) {
            if (err || !AdminloginCreated) {
              return res.json({status: "error", info: sails.__("ERROR_CREATING_CREDENTIAL")});
            }
            return res.json({status: "ok", info: sails.__("LOGIN_CREATED"), data: AdminloginCreated});
          });
      });
  },  //End of create Action.

  login: function (req, res) {
    //Validate parameters.

    console.log("-------  VER ------ Init")


    if (req.param('username') === undefined) {
      return res.json({status: "error", info: sails.__("USERNAME_REQUIRED")});
    }

    if (req.param('password') === undefined) {
      return res.json({status: "error", info: sails.__("PASSWORD_REQUIRED")});
    }

    console.log("-------  VER ------ User and Pasword validation")


    AdminLogin.native(function (err, collection) {
      if (err)
        return res.json({status: "error", info: sails.__("ERROR_SEARCHING_LOGIN")});

      collection.find({
        username: req.param('username'),
        password: req.param('password')
      }).toArray(function (err, AdminloginFounded) {
        if (err) {
          return res.json({status: "error", info: sails.__("ERROR_SEARCHING_LOGIN")});
        }
        console.log("-------  VER ------" + JSON.stringify(AdminloginFounded))
        if (!AdminloginFounded || AdminloginFounded.length === 0) {
          return res.json({status: "error", info: sails.__("INVALID_USERNAME_PASSWORD")});
        }

        console.log("<<< -------  VER ------ >>>" );
        var resulToken = LoginService.generateLoginToken(AdminloginFounded[0]._id);

        console.log("<<< -------  VER ------ => " + JSON.stringify(resulToken));
        if (resulToken.status == 'ok') {
          console.log("<<< -------  VER ------ SEND --- ");
          return res.json({status: "ok", data: resulToken.token});

        } else {
          return res.json({status: "error", info: sails.__("GENERATE_LOGIN_TOKEN_ERROR")});
        }

      });
    });
  }

};
