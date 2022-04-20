package wisepocket.example.com.wisepocket.util;

import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.graphics.Typeface;
import android.net.Uri;
import android.os.AsyncTask;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.github.mikephil.charting.charts.BarChart;
import com.github.mikephil.charting.charts.LineChart;
import com.github.mikephil.charting.charts.PieChart;
import com.github.mikephil.charting.components.MarkerView;
import com.github.mikephil.charting.data.BarData;
import com.github.mikephil.charting.data.BarDataSet;
import com.github.mikephil.charting.data.BarEntry;
import com.github.mikephil.charting.data.Entry;
import com.github.mikephil.charting.data.LineData;
import com.github.mikephil.charting.data.LineDataSet;
import com.github.mikephil.charting.data.PieData;
import com.github.mikephil.charting.data.PieDataSet;
import com.github.mikephil.charting.highlight.Highlight;
import com.github.mikephil.charting.interfaces.datasets.IBarDataSet;
import com.github.mikephil.charting.interfaces.datasets.ILineDataSet;
import com.github.mikephil.charting.utils.ColorTemplate;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import wisepocket.example.com.wisepocket.GaleriaActivity;
import wisepocket.example.com.wisepocket.R;
import wisepocket.example.com.wisepocket.ReproductorVideoActivity;
import wisepocket.example.com.wisepocket.db.GraficosOnlineTema;
import wisepocket.example.com.wisepocket.db.ImagenTema;
import wisepocket.example.com.wisepocket.db.json.JsonData;
import wisepocket.example.com.wisepocket.db.PaginaWebTema;
import wisepocket.example.com.wisepocket.db.TextoTema;
import wisepocket.example.com.wisepocket.db.VideoTema;
import wisepocket.example.com.wisepocket.db.json.JsonDia;
import wisepocket.example.com.wisepocket.db.json.JsonProvincia;
import wisepocket.example.com.wisepocket.xmlReader.ManejarZip;

/**
 * Created by Lizzy on 11-Jun-19.
 */
public class ComplexRecyclerViewAdapter extends RecyclerView.Adapter<RecyclerView.ViewHolder> {

    // The items to display in your RecyclerView
    private List<Object> items;
    private Typeface typeface;
    AppCompatActivity listener;
    String txtJson;
    ProgressDialog pd;
    ViewHolderGrafico vh5;
    GraficosOnlineTema graficosOnlineTema;
    private AlertDialog alertDialog;
    HashMap<String, String> listado_provincias;

    private final int TEXT = 0, IMAGE = 1, VIDEO = 2, PAGINA_WEB = 3, GRAFICO_ONLINE = 4;
    public ComplexRecyclerViewAdapter(List<Object> items, Typeface typeface, AppCompatActivity listener) {
        this.items = items;
        this.typeface = typeface;
        this.listener = listener;
        this.txtJson = "";

        listado_provincias = new HashMap<>();

        listado_provincias.put("23","La Habana");
        listado_provincias.put("30","Camagüey");
        listado_provincias.put("26","Villa Clara");
        listado_provincias.put("21","Holguín");
        listado_provincias.put("35","Guantánamo");
        listado_provincias.put("34","Santiago de Cuba");
        listado_provincias.put("21","Pinar del Río");
        listado_provincias.put("25","Matanzas");
        listado_provincias.put("28","Sancti Spíritus");
        listado_provincias.put("32","Holguín");
        listado_provincias.put("29","Ciego de Ávila");
        listado_provincias.put("40.01","Isla de la Juventud");
        listado_provincias.put("24","Mayabeque");
        listado_provincias.put("27","Cienfuegos");
        listado_provincias.put("31","Las Tunas");
        listado_provincias.put("33","Granma");
        listado_provincias.put("22","Artemisa");

    }


    @Override
    public void onBindViewHolder(RecyclerView.ViewHolder holder, int position) {
        Log.i("Adaptador",String.valueOf(holder.getItemViewType()));
        switch (holder.getItemViewType()) {
            case TEXT:
                ViewHolderExpandableText vh1 = (ViewHolderExpandableText) holder;
                configureViewHolder1(vh1, position);
                break;
            case IMAGE:
                ViewHolderImage vh2 = (ViewHolderImage) holder;
                configureViewHolder2(vh2, position);
                break;
            case VIDEO:
                ViewHolderVideo vh3 = (ViewHolderVideo) holder;
                configureViewHolder3(vh3, position);
                break;
            case PAGINA_WEB:
                ViewHolderPaginaWeb vh4 = (ViewHolderPaginaWeb) holder;
                configureViewHolder4(vh4, position);
                break;
            case GRAFICO_ONLINE:
                ViewHolderGrafico vh5 = (ViewHolderGrafico) holder;
                configureViewHolder5(vh5, position);
                break;
        }
    }

    @Override
    public int getItemCount() {
        return this.items.size();
    }

    @Override
    public int getItemViewType(int position) {

        if (items.get(position) instanceof TextoTema) {
            return TEXT;
        } else if (items.get(position) instanceof ImagenTema) {
            return IMAGE;
        }else if(items.get(position) instanceof VideoTema){
            return VIDEO;
        }else if(items.get(position) instanceof PaginaWebTema){
            return PAGINA_WEB;
        }else if(items.get(position) instanceof GraficosOnlineTema){
            return GRAFICO_ONLINE;
        }

        return -1;
    }


    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {

        RecyclerView.ViewHolder viewHolder = null;
        LayoutInflater inflater = LayoutInflater.from(parent.getContext());

        switch (viewType) {
            case TEXT:
                View v1 = inflater.inflate(R.layout.info_campana_spandable_text_item_layout, parent, false);
                viewHolder = new ViewHolderExpandableText(v1, typeface);
                break;
            case IMAGE:
                View v2 = inflater.inflate(R.layout.info_campana_imagen_item_layout, parent, false);
                viewHolder = new ViewHolderImage(v2);
                break;
            case VIDEO:
                View v3 = inflater.inflate(R.layout.info_campana_video_item_layout, parent, false);
                viewHolder = new ViewHolderVideo(v3);
                break;
            case PAGINA_WEB:
                View v4 = inflater.inflate(R.layout.info_campana_pagina_web_item_layout, parent, false);
                viewHolder = new ViewHolderPaginaWeb(v4);
                break;
            case GRAFICO_ONLINE:
                View v5 = inflater.inflate(R.layout.info_campana_grafico_item_layout, parent, false);
                viewHolder = new ViewHolderGrafico(v5);


            break;
        }
        return viewHolder;
    }

    private void configureViewHolder1(ViewHolderExpandableText vh1, int position) {
        TextoTema text = (TextoTema) items.get(position);
        vh1.getExpandableTextView().setText(text.getTexto());
    }

    private void configureViewHolder2(ViewHolderImage vh2, int position) {
        final ImagenTema imagenTema = (ImagenTema) items.get(position);

        Glide.with(listener).load(ManejarZip.getImagesTemaDir()+imagenTema.getPath()).into(vh2.getImageView());
        vh2.getImageView().setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(listener, GaleriaActivity.class);
                i.putExtra("imagen_path", imagenTema.getPath());
                listener.startActivity(i);
            }
        });
    }

    private void configureViewHolder3(ViewHolderVideo vh3, int position) {
        final VideoTema videoTema = (VideoTema) items.get(position);
        Glide
            .with(listener)
            .load(Uri.fromFile(new File(ManejarZip.getVideosTemaDir()+videoTema.getPath())))
            .into(vh3.getVideoView());

        vh3.getButtonplay().setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(listener, ReproductorVideoActivity.class);
                i.putExtra("video_path", ManejarZip.getVideosTemaDir()+videoTema.getPath());
                listener.startActivity(i);
            }
        });
    }
    private ProgressDialog progDailog;
    private void configureViewHolder4(ViewHolderPaginaWeb vh4, int position) {
        final PaginaWebTema paginaWebTema = (PaginaWebTema) items.get(position);
        Log.i("Adaptador",String.valueOf(paginaWebTema.getPath()));
        progDailog = ProgressDialog.show(listener, "Cargando","Por favor espere...", true);
        progDailog.setCancelable(false);
        vh4.getWebView().getSettings().setJavaScriptEnabled(true);
        vh4.getWebView().getSettings().setCacheMode(WebSettings.LOAD_CACHE_ELSE_NETWORK);
        vh4.getWebView().setWebViewClient(new WebViewClient(){

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                view.loadUrl(url);

                return true;
            }
            public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
                Log.i("Error",listener.getCacheDir().getAbsolutePath());
                vh4.getWebView().getSettings().setCacheMode( WebSettings.LOAD_CACHE_ELSE_NETWORK );

            }
        });
        vh4.getWebView().setWebChromeClient(new WebChromeClient(){
            @Override
            public void onProgressChanged(WebView view, int newProgress) {
                if(newProgress < 100)
                    progDailog.show();
                if(newProgress == 100)
                    progDailog.dismiss();
            }
        });

        vh4.getWebView().loadUrl(paginaWebTema.getPath());



    }

    private void configureViewHolder5(ViewHolderGrafico vh5, int position) {
        GraficosOnlineTema graficosOnlineTema = (GraficosOnlineTema) items.get(position);
        Log.i("Adaptador",String.valueOf(graficosOnlineTema.getPath()));

        this.vh5 = vh5;
        this.graficosOnlineTema = graficosOnlineTema;

        List<JsonData> jsonDataList = JsonData.listAll(JsonData.class);
        if(jsonDataList.isEmpty()) {
            SharedPreferences prefs = listener.getSharedPreferences("WisePocketPreferences", Context.MODE_PRIVATE);
            SharedPreferences.Editor editor = prefs.edit();
            editor.putBoolean("actualizar_contenido", false);
            editor.commit();
            new JsonTask().execute(graficosOnlineTema.getPath());

        }else{
            SharedPreferences prefs = listener.getSharedPreferences("WisePocketPreferences", Context.MODE_PRIVATE);
            if(prefs.getBoolean("actualizar_contenido", true) == true){
                /**
                 * Chequear si la fecha del json esta desactualizada comparando con la del tlf
                 */
                Date currentTime = Calendar.getInstance().getTime();
                SimpleDateFormat df = new SimpleDateFormat("yyyy-MMM-dd");
                String formattedDate = df.format(currentTime);
                if(!jsonDataList.get(0).getUltima_fecha().equals(formattedDate)){
                    /**
                     * Mostrar cartel de si quiere actualizar los datos
                     */
                    showAlertDialog(R.string.mensaje_informacion, R.string.chart_actualizar);
                }
            }else{
                llenarInfromacionGraficos();
            }

        }

    }



    private class JsonTask extends AsyncTask<String, String, String> {

        protected void onPreExecute() {
            super.onPreExecute();

            pd = new ProgressDialog(listener);
            pd.setMessage("Por favor espere.....");
            pd.setCancelable(false);
            pd.show();
        }

        protected String doInBackground(String... params) {

            HttpURLConnection connection = null;
            BufferedReader reader = null;

            try {
                URL url = new URL(params[0]);
                connection = (HttpURLConnection) url.openConnection();
                connection.connect();


                InputStream stream = connection.getInputStream();

                reader = new BufferedReader(new InputStreamReader(stream));

                StringBuffer buffer = new StringBuffer();
                String line = "";

                while ((line = reader.readLine()) != null) {
                    buffer.append(line+"\n");
                    //Log.d("Response: ", "> " + line);   //here u ll get whole response...... :-)

                }

                return buffer.toString();


            } catch (MalformedURLException e) {
                if (pd.isShowing()){
                    pd.dismiss();
                }
                e.printStackTrace();
            } catch (IOException e) {
                if (pd.isShowing()){
                    pd.dismiss();
                }
                e.printStackTrace();
            } finally {
                if (connection != null) {
                    connection.disconnect();
                }
                try {
                    if (reader != null) {
                        reader.close();
                    }
                } catch (IOException e) {
                    if (pd.isShowing()){
                        pd.dismiss();
                    }
                    e.printStackTrace();
                }
            }
            return null;
        }

        @Override
        protected void onPostExecute(String result) {
            super.onPostExecute(result);
            if (pd.isShowing()){
                pd.dismiss();
            }
            if(result !=  null){
                txtJson = result;
                if(!txtJson.isEmpty()) {
                    leerJsonData();
                }else{
                    showAlertDialogSoloInfo(R.string.mensaje_informacion, R.string.chart_actualizar_no_info);
                }
            }else{
                showAlertDialogSoloInfo(R.string.mensaje_informacion, R.string.chart_actualizar_no_info);
            }


        }
    }


    private void leerJsonData(){
        int total = 0;
        int recuperados = 0;
        int evacuados = 0;
        int muertes = 0;
        String ultima_fecha = "";
        int activos = 0;
        int test_totales = 0;
        List<JsonDia> jsonDias = new ArrayList<>();
        JsonData jsonData = new JsonData();
        List<JsonData> jsonDataList = JsonData.listAll(JsonData.class);
        if(jsonDataList.isEmpty()){
            jsonData.save();
        }else{
            jsonData = jsonDataList.get(0);
        }
        JsonDia.deleteAll(JsonDia.class);
        JsonProvincia.deleteAll(JsonProvincia.class);
        try {
            JSONObject jsonObject = new JSONObject(txtJson);
            JSONObject casos = jsonObject.getJSONObject("casos");
            JSONObject dias = casos.getJSONObject("dias");
            Iterator<String> keys = dias.keys();
            while (keys.hasNext())
            {
                // Get the key
                String key = keys.next();


                // Get the value
                JSONObject numeros = dias.getJSONObject(key);

                
                // Do something...
                Iterator<String> dias_keys = numeros.keys();
                JsonDia jsonDia = new JsonDia();
                while (dias_keys.hasNext()){
                    String item = dias_keys.next();


                    if(item.equals( "diagnosticados")){
                        JSONArray diagnosticados = numeros.getJSONArray("diagnosticados");
                        total = total + diagnosticados.length();
                        jsonDia.setDiagnosticados(diagnosticados.length());
                        for(int i = 0; i < diagnosticados.length(); i++){
                            JSONObject object = diagnosticados.getJSONObject(i);
                            String provincia = object.getString("dpacode_provincia_deteccion");
                            List<JsonProvincia> jsonProvincias = JsonProvincia.find(JsonProvincia.class, "code = ?", provincia);
                            if(jsonProvincias.isEmpty()){
                                JsonProvincia jsonProvincia = new JsonProvincia(provincia, 1);
                                jsonProvincia.save();
                            }else{
                                int provincia_total = jsonProvincias.get(0).getTotal();
                                provincia_total = provincia_total+1;
                                jsonProvincias.get(0).setTotal(provincia_total);
                                jsonProvincias.get(0).save();
                            }
                        }
                    }else if(item .equals("recuperados_numero")){
                        recuperados = recuperados+ numeros.getInt("recuperados_numero");

                    }else if(item.equals( "evacuados_numero")){
                        evacuados = evacuados+ numeros.getInt("evacuados_numero");
                        jsonDia.setEvacuados_numero(numeros.getInt("evacuados_numero"));
                    }else if(item .equals( "muertes_numero")){
                        muertes = muertes + numeros.getInt("muertes_numero");
                        jsonDia.setMuertes_numero(numeros.getInt("muertes_numero"));
                    }else if(item .equals( "fecha")) {
                        ultima_fecha = numeros.getString("fecha");
                        jsonDia.setFecha(ultima_fecha);

                    }else if(item .equals( "tests_total")) {
                        int tests = numeros.getInt("tests_total");
                        if(test_totales <= tests){
                            test_totales = tests;
                        }

                    }

                }
                activos = total - recuperados - evacuados - muertes;
                jsonDia.setActivos(activos);
                jsonDia.setJsonData(jsonData);
                jsonDia.save();
                jsonDias.add(jsonDia);
            }
            activos = total - recuperados - evacuados - muertes;

            jsonData.setActivos(activos);
            jsonData.setEvacuados(evacuados);
            jsonData.setMuertes(muertes);
            jsonData.setRecuperados(recuperados);
            jsonData.setTotal(total);
            jsonData.setTest_totales(test_totales);
            jsonData.setUltima_fecha(ultima_fecha);
            jsonData.setJsonDiaList(jsonDias);
            jsonData.save();

            llenarInfromacionGraficos();
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }
    private void setInfoData(ViewHolderGrafico vh5, String url){
        TextView recuperados = vh5.getRecuperados();
        TextView activos = vh5.getActivos();
        TextView fallecidos = vh5.getFallecidos();
        TextView diagnosticados = vh5.getDiagnosticados();
        List<JsonData> jsonDataList = JsonData.listAll(JsonData.class);
        recuperados.setText(String.valueOf(jsonDataList.get(0).getRecuperados()));
        activos.setText(String.valueOf(jsonDataList.get(0).getActivos()));
        fallecidos.setText(String.valueOf(jsonDataList.get(0).getMuertes()));
        diagnosticados.setText(String.valueOf(jsonDataList.get(0).getTotal()));

    }

    private void setLineChartData(ViewHolderGrafico vh5, String url){

        List<JsonDia> jsonDias =  JsonDia.listAll(JsonDia.class);

        ArrayList<Entry> yValsDia = new ArrayList<Entry>();
        ArrayList<Entry> yValsAcumulados = new ArrayList<Entry>();
        ArrayList<Entry> yValsActivos = new ArrayList<Entry>();
        ArrayList<String> xVals = new ArrayList<String>();
        int acumulados = 0;

        for(int i = 0; i < jsonDias.size(); i++){
            int diagnosticados = jsonDias.get(i).getDiagnosticados();
            int activos = jsonDias.get(i).getActivos();
            acumulados += diagnosticados;
            yValsDia.add(new Entry(diagnosticados, i));
            yValsAcumulados.add(new Entry(acumulados, i));
            yValsActivos.add(new Entry(activos, i));
            xVals.add(String.valueOf(i+1));
        }

        LineChart mChart = vh5.getLineChart();
        mChart.setTouchEnabled(true);
        mChart.setPinchZoom(true);

        LineDataSet set1;
        set1 = new LineDataSet(yValsDia, "Casos en el día");
        set1.setFillAlpha(110);
        set1.setColor(Color.parseColor("#166686"));
        set1.setCircleColor(Color.parseColor("#00577b"));
        set1.setLineWidth(1f);
        set1.setCircleRadius(3f);
        set1.setDrawCircleHole(false);
        set1.setValueTextSize(9f);

        LineDataSet set2;
        set2 = new LineDataSet(yValsAcumulados, "Casos acumulados");
        set2.setFillAlpha(110);
        set2.setColor(Color.parseColor("#e2acae"));
        set2.setCircleColor(Color.parseColor("#d0797c"));
        set2.setLineWidth(1f);
        set2.setCircleRadius(3f);
        set2.setDrawCircleHole(false);
        set2.setValueTextSize(9f);

        LineDataSet set3;
        set3 = new LineDataSet(yValsActivos, "Casos activos");
        set3.setFillAlpha(110);
        set3.setColor(Color.parseColor("#ba2d31"));
        set3.setCircleColor(Color.parseColor("#b11116"));
        set3.setLineWidth(1f);
        set3.setCircleRadius(3f);
        set3.setDrawCircleHole(false);
        set3.setValueTextSize(9f);

        ArrayList<ILineDataSet> dataSets = new ArrayList<ILineDataSet>();
        dataSets.add(set1); // add the datasets
        dataSets.add(set2);
        dataSets.add(set3);
        // create a data object with the datasets
        LineData data2 = new LineData(xVals, dataSets);
        // set data
        mChart.setData(data2);
    }

    private void setPieChartData(ViewHolderGrafico vh5){
        PieChart pieChart = vh5.getPieChart();
        pieChart.setTouchEnabled(true);

        List<JsonData> jsonDataList = JsonData.listAll(JsonData.class);

        ArrayList NoOfEmp1 = new ArrayList();
        int tests_negativos = jsonDataList.get(0).getTest_totales() - jsonDataList.get(0).getTotal();
        int tests_positivos = jsonDataList.get(0).getTotal();
        NoOfEmp1.add(new Entry(tests_positivos, 0));
        NoOfEmp1.add(new Entry(tests_negativos, 1));
        pieChart.setCenterText(String.valueOf(jsonDataList.get(0).getTest_totales()));
        pieChart.setCenterTextColor(Color.BLACK);

        PieDataSet dataSet = new PieDataSet(NoOfEmp1, "Relación de tests (PCR) realizados");
        dataSet.setValueTextColor(Color.WHITE);

        ArrayList year1 = new ArrayList();

        year1.add("Tests Positivos");
        year1.add("Tests Negativos");

        PieData data1 = new PieData(year1, dataSet);
        pieChart.setData(data1);
        int colores []= {Color.parseColor("#b01e22"), Color.parseColor("#1b123e")};
        dataSet.setColors(colores);
        pieChart.animateXY(3000, 3000);
    }
    private void setBarChartData(ViewHolderGrafico vh5){
        BarChart chart = vh5.getBarchart();

        ArrayList NoOfEmp = new ArrayList();
        ArrayList year = new ArrayList();


        

        List<JsonProvincia> jsonProvincias = JsonProvincia.listAll(JsonProvincia.class);
        for (int i = 0; i < jsonProvincias.size(); i++){
            NoOfEmp.add(new BarEntry(jsonProvincias.get(i).getTotal(), i,listado_provincias.get(jsonProvincias.get(i).getCode())));
            year.add(i);
        }




        BarDataSet bardataset = new BarDataSet(NoOfEmp, "Cantidad de casos por provincias");
        chart.animateY(3000);
        BarData data = new BarData(year, bardataset);
        bardataset.setColors(ColorTemplate.COLORFUL_COLORS);


        chart.setData(data);
        chart.setMarkerView(new MarkerView(listener,R.layout.marker_bar_chart ) {
            @Override
            public void refreshContent(Entry e, Highlight highlight) {
                TextView textView = findViewById(R.id.textView84);
                textView.setText(e.getData().toString());
            }

            @Override
            public int getXOffset(float xpos) {
                return 0;
            }

            @Override
            public int getYOffset(float ypos) {
                return 0;
            }
        });

    }

    private void showAlertDialog(int tipo_mensaje, int texto_mensaje){
        AlertDialog.Builder builder = new AlertDialog.Builder(listener);

        LayoutInflater inflater = listener.getLayoutInflater();

        View view = inflater.inflate(R.layout.dialog_layout, null);

        builder.setView(view);

        Button aceptar = (Button) view.findViewById(R.id.button);
        Button cancelar = (Button) view.findViewById(R.id.button2);

        TextView titulo = (TextView) view.findViewById(R.id.textView3);
        Typeface face= Typeface.createFromAsset(listener.getAssets(),"fonts/ProductSans-Medium.ttf");

        titulo.setText(tipo_mensaje);
        titulo.setTypeface(face);

        TextView mensaje = (TextView) view.findViewById(R.id.textView4);
        Typeface face2= Typeface.createFromAsset(listener.getAssets(),"fonts/ProductSans-Light.ttf");
        mensaje.setText(texto_mensaje);
        titulo.setTypeface(face2);

        Typeface facebotton= Typeface.createFromAsset(listener.getAssets(),"fonts/ProductSans-Regular.ttf");

        aceptar.setText(R.string.boton_aceptar);

        aceptar.setTypeface(facebotton);

        aceptar.setOnClickListener(
                new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {//otro juego
                        SharedPreferences prefs = listener.getSharedPreferences("WisePocketPreferences", Context.MODE_PRIVATE);
                        SharedPreferences.Editor editor = prefs.edit();
                        editor.putBoolean("actualizar_contenido", false);
                        editor.commit();
                        new JsonTask().execute(graficosOnlineTema.getPath());
                        alertDialog.dismiss();


                    }
                }
        );

        cancelar.setText(R.string.boton_cancelar);
        cancelar.setTypeface(facebotton);

        cancelar.setOnClickListener(
                new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        // Entonces cargar el gestor de archivos
                        llenarInfromacionGraficos();

                        SharedPreferences prefs = listener.getSharedPreferences("WisePocketPreferences", Context.MODE_PRIVATE);
                        SharedPreferences.Editor editor = prefs.edit();
                        editor.putBoolean("actualizar_contenido", false);
                        editor.commit();
                        alertDialog.dismiss();
                    }
                }

        );

        alertDialog = builder.create();
        alertDialog.setCancelable(false);
        alertDialog.show();
    }

    private void llenarInfromacionGraficos(){
        switch (graficosOnlineTema.getTipo()){
            case "info":
                vh5.getChart_info().setVisibility(View.VISIBLE);
                vh5.getBarchart().setVisibility(View.GONE);
                vh5.getPieChart().setVisibility(View.GONE);
                vh5.getLineChart().setVisibility(View.GONE);
                setInfoData(vh5,graficosOnlineTema.getPath());
                break;
            case "line":
                vh5.getChart_info().setVisibility(View.GONE);
                vh5.getBarchart().setVisibility(View.GONE);
                vh5.getPieChart().setVisibility(View.GONE);
                vh5.getLineChart().setVisibility(View.VISIBLE);
                setLineChartData(vh5, graficosOnlineTema.getPath());
                break;
            case "bar":
                vh5.getChart_info().setVisibility(View.GONE);
                vh5.getBarchart().setVisibility(View.VISIBLE);
                vh5.getPieChart().setVisibility(View.GONE);
                vh5.getLineChart().setVisibility(View.GONE);
                setBarChartData(vh5);
                break;
            case "pie":
                vh5.getChart_info().setVisibility(View.GONE);
                vh5.getBarchart().setVisibility(View.GONE);
                vh5.getPieChart().setVisibility(View.VISIBLE);
                vh5.getLineChart().setVisibility(View.GONE);
                setPieChartData(vh5);
                break;

        }
    }

    private void showAlertDialogSoloInfo(int tipo_mensaje, int texto_mensaje){
        AlertDialog.Builder builder = new AlertDialog.Builder(listener);

        LayoutInflater inflater = listener.getLayoutInflater();

        View view = inflater.inflate(R.layout.dialog_layout, null);

        builder.setView(view);

        Button aceptar = (Button) view.findViewById(R.id.button);
        Button cancelar = (Button) view.findViewById(R.id.button2);

        TextView titulo = (TextView) view.findViewById(R.id.textView3);
        Typeface face= Typeface.createFromAsset(listener.getAssets(),"fonts/ProductSans-Medium.ttf");

        titulo.setText(tipo_mensaje);
        titulo.setTypeface(face);

        TextView mensaje = (TextView) view.findViewById(R.id.textView4);
        Typeface face2= Typeface.createFromAsset(listener.getAssets(),"fonts/ProductSans-Light.ttf");
        mensaje.setText(texto_mensaje);
        titulo.setTypeface(face2);

        Typeface facebotton= Typeface.createFromAsset(listener.getAssets(),"fonts/ProductSans-Regular.ttf");

        aceptar.setText(R.string.boton_aceptar);

        aceptar.setTypeface(facebotton);

        aceptar.setOnClickListener(
                new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {//otro juego

                        alertDialog.dismiss();


                    }
                }
        );

        cancelar.setText(R.string.boton_cancelar);
        cancelar.setTypeface(facebotton);

        cancelar.setOnClickListener(
                new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        // Entonces cargar el gestor de archivos

                        alertDialog.dismiss();
                    }
                }

        );

        alertDialog = builder.create();
        alertDialog.setCancelable(false);
        alertDialog.show();
    }
}


