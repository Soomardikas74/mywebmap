// Using Leaflet for creating the map and adding controls for interacting with the map

//
//--- Part 1: adding base maps ---
//

//creating the map; defining the location in the center of the map (geographic coords) and the zoom level. These are properties of the leaflet map object
//the map window has been given the id 'map' in the .html file

var map = L.map('map', {
	center: [58.034520, 26.418965],
	zoom: 12
});

//adding three base maps 
var landscape = L.tileLayer('https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=7b0c8abef9504d40935988350f81d7ab', {
	attribution: 'Tiles from Thunderforest'});
	landscape.addTo(map);

var toner = L.tileLayer('http://tile.stamen.com/toner/{z}/{x}/{y}.png', {attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>' });
	//toner.addTo(map);

var esri = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
	maxZoom: 16
});
//esri.addTo(map);

// for using the base maps in the layer control, I defined a baseMaps variable
// the text on the left is the label shown in the layer control; the text right is the variable name
var baseMaps = {
	"Thunderforest landscape": landscape,
	"Toner": toner,
	"ESRI":esri
	}

//---- Part 2: Adding a scale bar
//

L.control.scale({metric: true, imperial: false, position: 'bottomright'}).addTo(map);

//--- Part 3: adding a GeoJSON polygon feature set, Otepää Nature Park boundary
var myStyle = {
    "color": "#00cc66",
    "weight": 3,
    "opacity": 0.6
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

var naturepark = L.geoJson(naturePark, {
    style: myStyle,
    /* onEachFeature: function (feature, layer) {
       layer.on({click: zoomToFeature}); } */
}).addTo(map);


//---- Part 4: Adding symbols ---- 
var vaatetorn = L.icon({
iconUrl: 'css/images/tower3.png',
iconSize: [25, 25]
});
var vaatetorn1 = L.marker([57.983310, 26.357569], {icon: vaatetorn, title:'Harimäe vaatetorn'}).addTo(map);
var vaatetorn2 = L.marker([58.048908, 26.515612], {icon: vaatetorn, title:'Tehvandi suusahüppetorn'}).addTo(map);

var suusakeskus = L.icon({
iconUrl: 'css/images/unnamed.png',
iconSize: [42, 42]
});
var Kuutsemäe = L.marker([58.028873, 26.324215], {icon: suusakeskus, title:'Kuutsemägi'}).addTo(map);
var VäikeMunamägi = L.marker([58.037812, 26.509940], {icon: suusakeskus, title:'Väike-Munamägi'}).addTo(map);

var järv = L.icon({
iconUrl: 'css/images/pyhaj2rv2.jpg',
iconSize: [60, 60]
});

L.marker([58.033155, 26.458908], {icon: järv, title:'Pühajärv'}).addTo(map);


//--- Part 5: Tartu ski marathon 63km route and yet other routes
var trackStyle2 = {
    color: "#663300",
    weight: 3
	}
var tartu_marathon = L.geoJson(tartumarathon, 
	{style: trackStyle2, 
	onEachFeature: function (feature, layer){
	layer.bindPopup(feature.properties.name)}
	});
tartu_marathon.addTo(map);

//defining a style for other XC hiking tracks
var trackStyle = {
    color: "#CC9900",
    weight: 2
	}

var hikingtracks = L.geoJson(XCtracks, {style: trackStyle});


var hikingtracks = L.geoJson(XCtracks, 
	{style: trackStyle, 
	onEachFeature: function (feature, layer){
	layer.bindPopup(feature.properties.name)}
	});

hikingtracks.addTo(map);

//
//---- Part 6: Adding GeoJSON Otepää Hotels Point Features
//

var hotelIcon = L.icon({
iconUrl: 'css/images/hotel.png',
iconSize: [20, 20],
});

var hotels = L.geoJson(hotelsOtepaa, {
	pointToLayer: function(feature, latlng) {
    return  L.marker(latlng, {icon: hotelIcon});
	},
	onEachFeature: function (feature, layer){
	layer.bindPopup(feature.properties.name)}
	});
	/* onEachFeature: function(feature, marker) {
			marker.bindPopup("<center><br><b>"+ "my text about: " +feature.properties.name + " at location: " + marker.getLatLng() + 
			"</b></center>" );
	} */

hotels.addTo(map);

//
//---- Part 7: Adding GeoJSON Otepää Camp Sites Point Features
//
var campsiteIcon = L.icon({
iconUrl: 'css/images/campsite.png',
iconSize: [18, 18],
});
var campsites = L.geoJson(campsitesOtepaa, {
	pointToLayer: function(feature, latlng) {
    return  L.marker(latlng, {icon: campsiteIcon});
	},
	onEachFeature: function (feature, layer){
	layer.bindPopup(feature.properties.name)}
	});
campsites.addTo(map);

//
//---- Part 8: Adding GeoJSON Otepää Ski Rental Point Features
//

var skirentalIcon = L.icon({
iconUrl: 'css/images/rental.png',
iconSize: [25, 25],
});
var skirentals = L.geoJson(skirentalsOtepaa, {
	pointToLayer: function(feature, latlng) {
    return  L.marker(latlng, {icon: skirentalIcon});
	},
	onEachFeature: function (feature, layer){
	layer.bindPopup(feature.properties.name)}
	});
skirentals.addTo(map);


//
//---- Part 9: Adding GeoJSON Otepää Motel/Guesthouse Point Features
//

var guesthouseIcon = L.icon({
iconUrl: 'css/images/motels.png',
iconSize: [19, 19],
});
var guesthouses = L.geoJson(guesthousesOtepaa, {
	pointToLayer: function(feature, latlng) {
    return  L.marker(latlng, {icon: guesthouseIcon});
	},
	onEachFeature: function (feature, layer){
	layer.bindPopup(feature.properties.name)}
	});
guesthouses.addTo(map);


//
//---- Part 10: Adding combined interactive features to my other XC skiing tracks
//

function highlightFeature(e) {
    var hikingtracks = e.target;  //access to activefeature that was hovered over through e.target
	
    hikingtracks.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
	
    if (!L.Browser.ie && !L.Browser.opera) {
        hikingtracks.bringToFront();
    }
}

//function for resetting the highlight
function resetHighlight(e) {
	hikingtracks.resetStyle(e.target);
}

/* function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
} */

//to call these methods we need to add listeners to our features
//the word on is a short version of addEventListener

function interactiveFunction(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
   } );
}

var trackStyle3 = {
    "color": "#ff7800",
    "weight": 5,
    "opacity": 0.65
}

var hikingtracks = L.geoJson(XCtracks, {
    style: trackStyle3,
    onEachFeature: function (feature, layer){ 
	layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
   } ),
	layer.bindPopup(feature.properties.name)}
}).addTo(map);

//
//---- Part 11: Adding a layer control for base maps and feature layers
//

//the variable features lists layers that I want to control with the layer control
var features = {
	"Otepää National Park": naturepark,
	"Kuutsemäe Skiing Resort": Kuutsemäe,
	"Väike-Munamäe Skiing Resort": VäikeMunamägi,
	"Tartu marathon 63km": tartu_marathon,
	"Other XC skiing tracks": hikingtracks,
	"Ski rentals": skirentals,
	"Hotels": hotels,
	"Guest houses": guesthouses,
	"Camping sites": campsites,
	"Harimäe viewpoint": vaatetorn1,
	"Tehvandi viewpoint": vaatetorn2
}
var legend = L.control.layers(baseMaps,features, {position:'bottomleft', collapsed:true}).addTo(map);