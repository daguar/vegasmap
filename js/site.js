var cartoJSON = "http://cfa.cartodb.com/api/v1/viz/17656/viz.json";
//var cartoJSON = "viz.json"; // temporary testing local file

var mapAttrib = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors. Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>';


$(document).ready(function() {

	// UI FLASHINESS AT LOAD
	var a = $('#logo').height();
	$('#logo').animate( {top: '-' + a}, 0, function() {
		$(this).animate( {top: '+' + 0}, a * 2);
	});
	var b = $('#footer').height();
	$('#footer').animate( {bottom: '-' + b}, 0, function() {
		$(this).animate( {bottom: '+' + 0}, b * 20);
	});

	// BASE MAP FROM CARTODB

	var cdb = {};
    $.ajax({
    	url: cartoJSON,
    	async: false,
    	crossDomain: true,
    	dataType: 'json',
    	success: function(data) {
    		cdb = data;
    	}
    });
    var mapTileset = cdb.layers[0].options.urlTemplate;
    var map = L.map('map', { 
    	center: new L.LatLng(36.17, -115.15),
        zoom: 14
    })
    L.tileLayer(mapTileset, {
        attribution: mapAttrib,
        maxZoom: 18
    }).addTo(map);

    cartodb.createLayer(map, cartoJSON)
       .on('done', function(layer) {
        map.addLayer(layer);

        layer.on('featureOver', function(e, pos, latlng, data) {
          cartodb.log.log(e, pos, latlng, data);
        });

        layer.on('error', function(err) {
          cartodb.log.log('error: ' + err);
        });

      }).on('error', function() {
        cartodb.log.log("some error occurred");
      });

/*
    // TEST MARKERS
    var marker = L.marker([36.170, -115.140]).addTo(map);
    var marker = L.marker([36.164, -115.136]).addTo(map);
    var marker = L.marker([36.166, -115.132]).addTo(map);
*/
});

