/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */
const bcrypt = require('bcrypt');

module.exports.bootstrap = async function () {
  // Import dependencies
  var path = require('path');

  var fs = require('node-properties-parser');

  // This bootstrap version indicates what version of fake data we're dealing with here.
  var HARD_CODED_DATA_VERSION = 0;

  // This path indicates where to store/look for the JSON file that tracks the "last run bootstrap info"
  // locally on this development computer (if we happen to be on a development computer).
  var bootstrapLastRunInfoPath = path.resolve(
    sails.config.appPath,
    '.tmp/bootstrap-version.json'
  );

  // Whether or not to continue doing the stuff in this file (i.e. wiping and regenerating data)
  // depends on some factors:
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // If the hard-coded data version has been incremented, or we're being forced
  // (i.e. `--drop` or `--environment=test` was set), then run the meat of this
  // bootstrap script to wipe all existing data and rebuild hard-coded data.
  if (
    sails.config.models.migrate !== 'drop' &&
    sails.config.environment !== 'test'
  ) {
    // If this is _actually_ a production environment (real or simulated), or we have
    // `migrate: safe` enabled, then prevent accidentally removing all data!
    if (
      process.env.NODE_ENV === 'production' ||
      sails.config.models.migrate === 'safe'
    ) {
      sails.log(
        'Since we are running with migrate: \'safe\' and/or NODE_ENV=production (in the "' +
          sails.config.environment +
          '" Sails environment, to be precise), skipping the rest of the bootstrap to avoid data loss...'
      );
      return;
    } //•

    // Compare bootstrap version from code base to the version that was last run
    var lastRunBootstrapInfo = await sails.helpers.fs
      .readJson(bootstrapLastRunInfoPath)
      .tolerate('doesNotExist'); // (it's ok if the file doesn't exist yet-- just keep going.)

    if (
      lastRunBootstrapInfo &&
      lastRunBootstrapInfo.lastRunVersion === HARD_CODED_DATA_VERSION
    ) {
      sails.log(
        'Skipping v' +
          HARD_CODED_DATA_VERSION +
          ' bootstrap script...  (because it\'s already been run)'
      );
      sails.log(
        '(last run on this computer: @ ' +
          new Date(lastRunBootstrapInfo.lastRunAt) +
          ')'
      );
      return;
    } //•

    sails.log(
      'Running v' +
        HARD_CODED_DATA_VERSION +
        ' bootstrap script...  (' +
        (lastRunBootstrapInfo
          ? 'before this, the last time the bootstrap ran on this computer was for v' +
            lastRunBootstrapInfo.lastRunVersion +
            ' @ ' +
            new Date(lastRunBootstrapInfo.lastRunAt)
          : 'looks like this is the first time the bootstrap has run on this computer') +
        ')'
    );
  } else {
    sails.log(
      'Running bootstrap script because it was forced...  (either `--drop` or `--environment=test` was used)'
    );
  }

  // Since the hard-coded data version has been incremented, and we're running in
  // a "throwaway data" environment, delete all records from all models.
  for (let identity in sails.models) {
    await sails.models[identity].destroy({});
  } //∞

  // By convention, this is a good place to set up fake data during development.
  const salt = await bcrypt.genSalt(10);

  const hashpass = await bcrypt.hash('12345678', salt);
  await User.createEach([
    {
      email: 'admin@example.com',
      phone: '+53552448',
      name: 'Ryan Dahl',
      fullName: 'Ryan Dahl',
      isSuperAdmin: true,
      password: await sails.helpers.passwords.hashPassword('12345678'),
      isAdmin: true,
    },
  ]);
  console.log('USER Example created para TEST LOGIN ');
  /*await User.createEach([
    { email: 'admin@example.com', phone:'+53552448', name: 'Ryan Dahl', fullName: 'Ryan Dahl', isSuperAdmin: true, password: hashpass },
  ]);*/

  //Create temporaly information for test
  console.log('--- PUEDE REALIZAR UN TEST de Servicios con: npm test');
  console.log('--- Inyectando database ---');
  await sails.helpers.seedUser();
  console.log('CREATED >>>>>>>> user >>>>>>> Campaign >>>>>> userInvitado');
  //await sails.helpers.seedUserend();
  //await sails.helpers.seedUserenden();
  console.log('CREATED >>>>>> userEnd >>>>>> opinion (aspectos y entidades)');
  //await sails.helpers.seedUserresp()
  //console.log("CREATED >>>> respuesta by userSys ")
  console.log(new Date().toUTCString());
  console.log('--- Database Inyectada ---');

  /// FROM OTHER APP  WISEPOCKET OPPINION READ

  //console.log("Read config file")
  var config = fs.readSync('etc/config.properties');
  sails.config.globals.configsystem = config;
  // console.log("---------Read config file-------")
  // console.log(JSON.stringify(sails.config.globals.configsystem))
  //await sails.helpers.startMailReader.with({configuration:config});

  //Create temporaly information for test
  await sails.helpers.seedWisePocket();

  //Create update information for WisePocket apps
  await sails.helpers.readUpdateInformation()

  //await  sails.helpers.readStadisticServices()

  //Start email listener services
  /// <========= IMPORTANT TO READ EMAIL ============>

  await sails.helpers.initializeMailReader();

  console.log("Was call seed WisePocket")

  //https://stackoverflow.com/questions/59508011/how-to-detect-sails-hook-grunt-signaling-its-done-event
  ///Wait for any change in geoinfo directory
  //With the caveat that the watch task never
  //ends during development, so you have to test in
  // production mode or code for both scenarios.

  sails.on('hook:grunt:done', function (){
       Campaing.find({}).limit(1).then(  function (campainInfo){

         var campaingdata = {
           campaingid: campainInfo[0].numcamp
         };

         sails.helpers.readGeographicInformation.with(campaingdata)
                                           .then(function (resultCallback){


                                           })


         });
  })

  // Save new bootstrap version
  await sails.helpers.fs.writeJson
    .with({
      destination: bootstrapLastRunInfoPath,
      json: {
        lastRunVersion: HARD_CODED_DATA_VERSION,
        lastRunAt: Date.now(),
      },
      force: true,
    })
    .tolerate((err) => {
      sails.log.warn(
        'For some reason, could not write bootstrap version .json file.  This could be a result of a problem with your configured paths, or, if you are in production, a limitation of your hosting provider related to `pwd`.  As a workaround, try updating app.js to explicitly pass in `appPath: __dirname` instead of relying on `chdir`.  Current sails.config.appPath: `' +
          sails.config.appPath +
          '`.  Full error details: ' +
          err.stack +
          '\n\n(Proceeding anyway this time...)'
      );
    });
};
