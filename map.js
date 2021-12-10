//// Mapas base

var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

var googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

var carto = L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",{
		"attribution": "\u0026copy; \u003ca href=\"http://www.openstreetmap.org/copyright\"\u003eOpenStreetMap\u003c/a\u003e contributors \u0026copy; \u003ca href=\"http://cartodb.com/attributions\"\u003eCartoDB\u003c/a\u003e, CartoDB \u003ca href =\"http://cartodb.com/attributions\"\u003eattributions\u003c/a\u003e", "detectRetina": false, "maxNativeZoom": 18, "maxZoom": 18, "minZoom": 0, "noWrap": false, "opacity": 1, "subdomains": "abc", "tms": false}
);



/////////////   CONTROL DE CAPAS
var cuencas1 = L.layerGroup([]);
var fc1 = L.layerGroup([]);
var psah1 = L.layerGroup([]);
var sc1 = L.layerGroup([]);
var anp1 = L.layerGroup([]);
var veget93 = L.layerGroup([]);
var veget09 = L.layerGroup([]);
var veget19 = L.layerGroup([]);
var veget45t = L.layerGroup([]);
var veget45r = L.layerGroup([]);

var map = L.map('map',{
	center:[19.206970551244304, -99.25794858801221],
	zoom:12,
    layers:[googleSat,googleHybrid,carto]
});

var baseMaps = {
    "Satelite": googleSat,
    "Híbrido": googleHybrid,
	"Tonos blancos": carto
};

var overlayMaps = {
	/////////"<b>Cuencas</b>": cuencas1,
	"<b>Polígonos PSAH</b>": psah1,
	"<b>Poligono Fondos concurrentes</b>": fc1,
	"<b>Suelo de conservación CDMX</b>": sc1,
	"<b>ANP´s</b>": anp1,

	"<b>1993</b>": veget93,
	"<b>2009</b>": veget09,
	"<b>2019</b>": veget19,
	"<b>2045 tendencial</b>": veget45t,
	"<b>2045 restrictivo</b>": veget45r,};
/////*
  ///// CÓMO HACER UN DOBLE GRUPO DE CAPAS - overlayMaps 
///// cambiar nombre de capas
var vegetacion = {
	////////"<b>1993</b>": veget93,
	"<b>2009</b>": veget09,
	"<b>2019</b>": veget19,
	"<b>2045 Tendencial</b>": sc1,
	"<b>2045 Restrictivo</b>": anp1
};

////*/

L.control.layers(baseMaps,overlayMaps, vegetacion).addTo (map);


////////////////// ESTILO DE CAPAS

///// Estados

function edo_style(feature) {
    return {
        fillColor: 'white',
        weight: 1.5,
        opacity: 1,
        color: 'black',
        dashArray: '0',
        fillOpacity: 0
    };
}

///// Cuencas
function cuencas_style(feature) {
    return {
        fillColor: 'white',
        weight: 1.5,
        opacity: 1,
        color: 'red',
        dashArray: '1',
        fillOpacity: 0
    };
}

///// PSAH
function psah_style(feature) {
    return {
        fillColor: '#095AF2 ',
        weight: 1,
        opacity: 1,
        color: '',
        dashArray: '1',
        fillOpacity: 0.5
    };
}

///// FONDOS CONCURRENTES
function fc_style(feature) {
    return {
        fillColor: '#3F0387',
        weight: 1.5,
        opacity: 0.2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.8
    };
}

///// SUELO DE CONSERVACION
function sc_style(feature) {
    return {
        fillColor: '#E2F794',
        weight: 1.5,
        opacity: 1,
        color: '#E2F794 ',
        dashArray: '1',
        fillOpacity: 0.7
    };
}

///// ANP´s
function anp_style(feature) {
    return {
        fillColor: 'green',
        weight: 1.5,
        opacity: 1,
        color: 'green',
        dashArray: '1',
        fillOpacity: 0.3
    };
}

//// capas vegetacion

function color_veg (ca) {
    return ca == "1"   ? '#F28F09 ':
           ca == "2"  ? '#F82406 ':
           ca == "3"   ? '#d1ea46':
		   ca == "4"   ? '#2ccbc6':
		   ca == "5"   ? '#33a02c':
		   ca == "6"   ? '#b27d33':
                            '#f5f5f5';
}

function style_veg (feature) {
    return {
        fillColor: color_veg(feature.properties.id_clase),
        weight: 0.3,
        opacity: 1,
        color: color_veg(feature.properties.id_clase),
        dashArray: '0',
        fillOpacity: 0.7
    };
}

//////  LEYENDA VEGETACION                                              
var veg1legend = L.control({position: "bottomleft"});
	veg1legend.onAdd = function (map) {
		var div = L.DomUtil.create('div', 'info legend');
		  div.innerHTML += "<b> Coberturas y usos de suelo</b></br>";
		  div.innerHTML += '<i style="background: #F28F09"></i><span>Agricultura</span><br>';
		  div.innerHTML += '<i style="background: #F82406"></i><span>Asentamientos humanos</span><br>';
		  div.innerHTML += '<i style="background: #d1ea46"></i><span>Bosque de encino</span><br>';
		  div.innerHTML += '<i style="background: #2ccbc6"></i><span>Bosque de oyamel</span><br>';
		  div.innerHTML += '<i style="background: #33a02c"></i><span>Bosque de pino</span><br>';
		  div.innerHTML += '<i style="background: #b27d33"></i><span>Pastizal de alta montaña</span><br>';
		return div;
};


var veg2legend = L.control({position: "bottomleft"});
	veg2legend.onAdd = function (map) {
		var div = L.DomUtil.create('div', 'info legend');
		  div.innerHTML += "<b> Coberturas y usos de suelo</b></br>";
		  div.innerHTML += '<i style="background: #F28F09"></i><span>Agricultura</span><br>';
		  div.innerHTML += '<i style="background: #F82406"></i><span>Asentamientos humanos</span><br>';
		  div.innerHTML += '<i style="background: #d1ea46"></i><span>Bosque de encino</span><br>';
		  div.innerHTML += '<i style="background: #2ccbc6"></i><span>Bosque de oyamel</span><br>';
		  div.innerHTML += '<i style="background: #33a02c"></i><span>Bosque de pino</span><br>';
		  div.innerHTML += '<i style="background: #b27d33"></i><span>Pastizal de alta montaña</span><br>';
		return div;
};


/////  SE AGREGA CAPA CON LAS CARACTERISTICAS DE POPUP, COLOR, TAMAÑO
/////estados  --> queda fijo 

L.geoJson(estados, {
	style: edo_style
}).addTo(map);



/////psah

L.geoJson(psah, {
	style: psah_style
}).addTo(psah1);


/////fondos concurrentes
L.geoJson(fc, {
	style: fc_style
}).addTo(fc1);

/////suelo de conservación
L.geoJson(suelo_conserv, {
	style: sc_style
}).addTo(sc1);

/////ANP
L.geoJson(anp, {
	style: anp_style
}).addTo(anp1);

///////////////CAPAS VEGETACION

/////  1993
L.geoJson(veg93, {
	style: style_veg
}).addTo(veget93);

/////  2009
L.geoJson(veg09, {
	style: style_veg
}).addTo(veget09);

/////  2019
L.geoJson(veg19, {
	style: style_veg
}).addTo(veget19);

/////  2045 tendencial
L.geoJson(veg45t, {
	style: style_veg
}).addTo(veget45t);

/////  2045 restrictivo
L.geoJson(veg45r, {
	style: style_veg
}).addTo(veget45r);



/////cuencas

L.geoJson(cuencas, {
	style: cuencas_style
}).addTo(map);




////// agregando leyenda

map.on('overlayadd', function (eventLayer) {
	if (eventLayer.name == '<b>1993</b>') {
		veg2legend.addTo(map);
    } else if (eventLayer.name == '<b>2009</b>') { 
		veg2legend.addTo(map);
	} else if (eventLayer.name == '<b>2019</b>') { 
		veg2legend.addTo(map);
	} else if (eventLayer.name == '<b>2045 tendencial</b>') { 
		veg2legend.addTo(map);
	} else if (eventLayer.name == '<b>2045 restrictivo</b>') { 
		veg2legend.addTo(map);
	}
});

map.on('overlayremove', function (eventLayer) {
	if (eventLayer.name == '<b>1993</b>') {
		veg2legend.remove(map);
    } else if (eventLayer.name == '<b>2009</b>') { 
		veg2legend.remove(map);
	} else if (eventLayer.name == '<b>2019</b>') { 
		veg2legend.remove(map);
	} else if (eventLayer.name == '<b>2045 tendencial</b>') { 
		veg2legend.remove(map);
	} else if (eventLayer.name == '<b>2045 restrictivo</b>') { 
		veg2legend.remove(map);
	}
});


/*
map.on('overlayremove', function (eventLayer) {
	if (eventLayer.name =='<b>1993</b>') {
        veg1legend.remove(map);
    } else if (eventLayer.name == '<b>2009</b>') { 
        veg2legend.remove(map);
	}	
});
*/