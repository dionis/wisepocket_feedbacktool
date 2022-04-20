/* eslint-disable block-scoped-var */
/* eslint-disable no-undef */
var Request = require('request');
var appRoot = require('app-root-path');
var path = require('path');
const fs = require('fs');
const pathToFile = 'test' + path.sep + 'fixtures' + path.sep;
const utf8 = require('utf8');
const file = 'covid19-cuba.json';
const URL = 'https://cusobu.nat.cu/covid/data/covid19-cuba.json';
module.exports = {


  friendlyName: 'Read stadistic services',


  description: '',


  inputs: {

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },

  //   Successfully generated:
  //  •- api/helpers/read-stadistic-services.js

  // A few reminders:
  //  (1)  To call this helper:

  //           // With default usage:
  //           await sails.helpers.readStadisticServices(…, …);

  //           // With named parameters:
  //           await sails.helpers.readStadisticServices.with({
  //             someInput: …,
  //             someOtherInput: …
  //           });

  //  (2)  You can read more about helpers in the Sails documentation.
  //         [?] https://sailsjs.com/docs/concepts/helpers

  fn: async function (inputs, exits) {
    // TODO
    // fetch("https://cusobu.nat.cu/covid/data/covid19-cuba.json")
    // .then(response => response.json())
    // .then(data => {
    //   data["eventos"].forEach(({ id, identificador, municipio, provincia,dpacode_municipio,dpacode_provincia, lon, lat, abierto }) =>
    //     console.log(`${identificador} active cases: ${municipio - provincia - dpacode_municipio}`)
    //   );
    // });

    // Request({
    //   'url':'https://cusobu.nat.cu/covid/data/covid19-cuba.json',
    //   'method': "GET",
    //   'proxy':'https://dionis:Cibernetico.2017@internet.uo.edu.cu:3128'
    // },function (error, response, body) {
    //   if (!error && response.statusCode == 200) {
    //     console.log(body);
    //     objectStadisticServices = JSON.parse(body)
    //     console.log(objectStadisticServices.eventos);
    //     return exits.success()
    //   }
    //   else
    //      return console.log(error);
    // })

    //...some stuff to get my proxy config (credentials, host and port)
    var proxyUrl = 'https://' + 'dionis' + ':' + 'Cibernetico.2017' + '@' + 'internet.uo.edu.cu' + ':' + '3128';

    listado_provincias = {};

    listado_provincias['23'] ='La Habana';
    listado_provincias['30'] ='Camagüey';
    listado_provincias['26'] ='Villa Clara';
    listado_provincias['21'] ='Holguín';
    listado_provincias['35'] ='Guantánamo';
    listado_provincias['34'] = 'Santiago de Cuba';
    listado_provincias['21'] = 'Pinar del Río';
    listado_provincias['25'] = 'Matanzas';
    listado_provincias['28'] = 'Sancti Spíritus';
    // listado_provincias["32"] ="Holguín");
    listado_provincias['29'] ='Ciego de Ávila';
    listado_provincias['40.01'] ='Isla de la Juventud';
    listado_provincias['24'] ='Mayabeque';
    listado_provincias['27'] ='Cienfuegos';
    listado_provincias['31'] ='Las Tunas';
    listado_provincias['33'] ='Granma';
    listado_provincias['22'] = 'Artemisa';
    //covid19-cuba.json
    // let body = fs.readFileSync( appRoot + path.sep + pathToFile + path.sep + file , 'utf8');
    //let fileContents = fs.readFileSync('./FORMATO_PERIODISTA_YAML.txt', 'utf8');
    // // console.log("------------ Geografical information ----------------------")

    // objectStadisticServices = JSON.parse(fileContents)
    // var RequestVar = Request.defaults({'proxy': proxyUrl}); , {timeout: 2500}
    Request.get(URL, async (error, response, body) => {
      if(error) {
        console.log(error);
        return exits.error(error);
      }


      // console.log(body);

      // fs.writeFile(appRoot + path.sep + pathToFile + path.sep + "ServicesResult.json", body, function (err,data) {
      //   if (err) {
      //     return console.log(err);
      //   }
      //   console.log("Write  Text in " + appRoot + path.sep + pathToFile + path.sep + "ServicesResult.json");
      // });
      objectStadisticServices = JSON.parse(body);

      var total = 0;
      var recuperados = 0;
      var evacuados = 0;
      var muertes = 0;
      var ultima_fecha = '';
      var activos = 0;
      var diagnosticados_stgo = 0;
      var test_total = 0;
      var test_totales = 0;
      var jsonDias = [];
      var jsonData = {};
      var jsonProvinceDataList = {};
      for (var iProvince in listado_provincias){
        jsonProvinceDataList[iProvince] = 0;
      }

      var casos =  objectStadisticServices.casos;
      var dias = casos.dias;
      //console.log(JSON.stringify(dias))

      //var attributename in myobject
      statadisticDay = [];
      var  lastIndex = 0;
      for (const iDias in dias) {
        lastIndex +=1;
        var numeros = dias[iDias];

        //console.log(JSON.stringify(iDias))
        var diagnosticados = numeros.diagnosticados;
        iJsonDia = {};
        if (typeof diagnosticados !== 'undefined'){
          //console.log(JSON.stringify(diagnosticados))
          // (Object.keys(data.shareInfo[i]).length
          // (Object.keys(data.shareInfo[i]).length
          total += diagnosticados.length;
          iJsonDia.diagnosticados =  diagnosticados.length;

          //console.log("Diagnosticasos ===> " +  iJsonDia.diagnosticados)

          for ( const iDiag of diagnosticados){
            var provincia = iDiag.dpacode_provincia_deteccion;
            var provinciaStr = listado_provincias[provincia];
            ///Santiago de Cuba

            jsonProvinceDataList[provincia] +=1;
            if (provincia === '34') {
              if ( typeof iJsonDia.diagnosticados_stgo === 'undefined')
              {iJsonDia.diagnosticados_stgo = 1;}
              else
              {iJsonDia.diagnosticados_stgo += 1;}

              diagnosticados_stgo += 1;
              // console.log("<------ Santiago -------->")
            }
          }



          recuperados += (typeof numeros.recuperados_numero === 'undefined')?0:Number(numeros.recuperados_numero);
          iJsonDia.recuperados = (typeof numeros.recuperados_numero === 'undefined')?0:Number(numeros.recuperados_numero);
          evacuados +=  (typeof numeros.evacuados_numero === 'undefined')?0:Number( numeros.evacuados_numero);
          iJsonDia.evacuados = (typeof numeros.evacuados_numero === 'undefined')?0:Number( numeros.evacuados_numero);

          muertes +=  (typeof numeros.muertes_numero === 'undefined')?0:Number( numeros.muertes_numero);
          iJsonDia.muerte = (typeof numeros.muertes_numero === 'undefined')?0:Number( numeros.muertes_numero);

          ultima_fecha = numeros.fecha;
          iJsonDia.ultima_fecha = ultima_fecha;

          iJsonDia.activos =  iJsonDia.diagnosticados -  iJsonDia.recuperados -  iJsonDia.evacuados - iJsonDia.muerte;


          test_total +=  (typeof numeros.tests_total === 'undefined')?0:Number( numeros.tests_total);
          statadisticDay.push(iJsonDia);
        }
      }


      ///TODAY OR YESTERDAY

      console.log('Last index >===> ' + lastIndex);
      var toDay = dias[lastIndex];

      var diagnosticados = toDay.diagnosticados;
      iJsonDiaToday = {};
      iJsonDiaToday.diagnosticados_stgo = 0;
      iJsonDiaToday.diagnosticados = 0;
      if (typeof diagnosticados !== 'undefined'){
        iJsonDiaToday.diagnosticados = diagnosticados.length;
        for ( const iDiag of diagnosticados){
          var provincia = iDiag.dpacode_provincia_deteccion;

          ///Santiago de Cuba
          if (provincia === '34') {
            if ( typeof iJsonDia.diagnosticados_stgo === 'undefined')
            {iJsonDiaToday.diagnosticados_stgo = 1;}
            else
            {iJsonDiaToday.diagnosticados_stgo += 1;}


            // console.log("<------ Santiago -------->")
          }
        }
      }

      informationStadistc = [];

      var pos = 0;
      iJsonDiaToday.fecha = toDay.fecha;
      iJsonDiaToday.recuperados = (typeof toDay.recuperados_numero === 'undefined')?0:Number(toDay.recuperados_numero);
      iJsonDiaToday.muerte = (typeof toDay.muertes_numero === 'undefined')?0:Number( toDay.muertes_numero);

      // console.log(JSON.stringify(jsonProvinceDataList))
      activos = total - recuperados - evacuados - muertes;
      // console.log("####################################################")
      // console.log("Activos :" +activos)
      // console.log("Recuperados :" +recuperados)
      // console.log("Evacuados :" +evacuados)
      // console.log("Muertes :" +muertes)
      // console.log("Diagnosticados en Santiago de Cuba:" +diagnosticados_stgo)

      objInfo = {};
      objInfo.pos = pos;
      pos += 1;
      objInfo.type = 'text';
      var text = 'Datos Generales: \n';
      text +=  'Activos :' +activos + '\n';
      text +=  'Recuperados :' +recuperados + '\n';
      text +=  'Evacuados :' +evacuados + '\n';
      text +=  'Muertes :' +muertes + '\n';
      text +=  'Diagnosticados en Santiago de Cuba :' +diagnosticados_stgo + '\n';
      objInfo.value = text;



      informationStadistc.push(objInfo);
      // console.log("Value: " + objectInData[prop])
      // console.log( "<=> " + pos );

      // console.log("##################### HOY ###############################")
      // console.log( "Datos recientes : " +     iJsonDiaToday.fecha)
      // console.log("Diagnosticados : " + iJsonDiaToday.diagnosticados)
      // console.log( "Diagnosticados en Santiago de Cuba: " + iJsonDiaToday.diagnosticados_stgo )
      // console.log("Recuperados : " +iJsonDiaToday.recuperados)
      // console.log("Muertes : " + iJsonDiaToday.muerte)


      //Diagnosticados
      //Recuperados
      //Muertes
      //Diagnosticasos en Santiago de Cuba
      objInfo = {};
      objInfo.pos = pos;
      pos += 1;
      objInfo.type = 'text';
      var text = 'Datos recientes : ' +     iJsonDiaToday.fecha + '\n';
      text += 'Diagnosticados : ' + iJsonDiaToday.diagnosticados + '\n';
      text += 'Diagnosticados en Santiago de Cuba: ' + iJsonDiaToday.diagnosticados_stgo + '\n';
      text += 'Recuperados : ' + iJsonDiaToday.recuperados + '\n';
      text += 'Muertes : ' +  iJsonDiaToday.muerte + '\n';

      objInfo.value = text;
      informationStadistc.push(objInfo);
      ///Piechar Info
      dataArray = [
        {'label':'Test positivos', 'value': activos, 'color':'#b01e22'},
        {'label':'Test negativos','value': (test_total - activos), 'color':'#1b123e'}
      ];
      pieChart = {};
      pieChart.type = 'graphic';
      pieChart.graphictype = 'pie';
      pieChart.pos = pos;
      pos += 1;
      pieChart.info = {};
      pieChart.info.label =  'Relación de test (PCR) realizadas' ,
      pieChart.info.data = dataArray;


      ///Barchar info
      dataArray = [];
      jsonProvinceDataList;
      for (var iProvince in listado_provincias){
        info = {};
        info.value =  (typeof  jsonProvinceDataList[iProvince] === 'undefined' ||  jsonProvinceDataList[iProvince] === null)?0:Number( jsonProvinceDataList[iProvince]);
        info.label = listado_provincias[iProvince];
        dataArray.push(info);
      }

      barChart = {};
      barChart.type = 'graphic';
      barChart.graphictype = 'bar';
      barChart.pos = pos;
      pos += 1;
      barChart.info = {};
      barChart.info.label = 'Cantidad de casos por provincia';
      barChart.info.data = dataArray;



      ///Linechar info
      dataArray = [];
      jsonProvinceDataList;

      yvalDia = {};
      yvalDia.color= '#166686';
      yvalDia.label = 'Casos en el día';
      yvalDia.data = [];

      //yValAcumulados (Casos acumulados)
      yValAcumulados = {};
      yValAcumulados.color= '#e2acae';
      yValAcumulados.label = 'Casos acumulados';
      yValAcumulados.data = [];

      // yValsActivos (casos Activos)
      yValActivos = {};
      yValActivos.color= '#ba2d31';
      yValActivos.label = 'Casos activos';
      yValActivos.data = [];

      acumulate = 0;
      counter = 0;
      for (const iDia of statadisticDay){
        acumulate += iDia.diagnosticados;
        //console.log("Diagnosticados " + iDia.diagnosticados )
        yvalDia.data.push({'value':iDia.diagnosticados});
        yValAcumulados.data.push({'value':acumulate});
        yValActivos.data.push({'value':iDia.activos});
        counter += 1;
      }



      dataArray = [];
      dataArray.push(yvalDia);
      dataArray.push(yValAcumulados);
      dataArray.push(yValActivos);

      lineChart = {};
      lineChart.type = 'graphic';
      lineChart.graphictype = 'line';
      lineChart.pos = pos;
      pos += 1;
      lineChart.info = {};

      lineChart.info.label =  'Análisis por día';
      // lineChart.info.xVals = dias.length

      lineChart.info.data = dataArray;

      //

      informationStadistc.push(pieChart);
      informationStadistc.push(barChart);
      informationStadistc.push(lineChart);

      await Information.update({source:'web-services'}).set({data:informationStadistc});
      //console.log("<<------ Update WisePocket Platform  information  ----->>")
      timestamp = Date.now().toString();

      times = await TimeUpdate.find({}).limit(1);
      if (typeof times === 'undefined' || times.length == 0 ){
        await TimeUpdate.create({time:timestamp});
      }
      else {
        lastime = times[0].time;
        console.log('---- Update time --- ' + timestamp );
        await TimeUpdate.update({time:lastime}).set({time:timestamp});
      }


      return exits.success();
    });
  }


};

