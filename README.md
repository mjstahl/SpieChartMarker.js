SpieChartMarker.js
==================

Spie chart for the Leaflet library (http://leafletjs.com/).

SpieChartMarker is inspired by the CircleMarker.js.

For more information about Spie charts refer to the following URLs:
https://en.wikipedia.org/wiki/Pie_chart#Spie_chart
http://addictedtor.free.fr/graphiques/RGraphGallery.php?graph=106

Usage
=====
```javascript
var mapURL = 'http://a.tiles.mapbox.com/v3/mapbox.world-light/{z}/{x}/{y}.png'

var map = new L.Map('map', {
	center: 	new L.LatLng(36.368, -95.493),
	zoom:   	5,
	minZoom: 	3,
	maxZoom: 	9,
	layers: 	new L.TileLayer(mapURL, {})
});

var latlng = new L.LatLng(43.57, -116.22),
    radii  = [80, 30, 40],
    values = [34, 33, 33];

marker = new L.SpieChartMarker(latlng, radii, values, {
	colors: ['#55B550', '#DFC962', '#DD6164'],
});

map.addLayer(marker)
```