/*
 * SpieChartMarker.js 0.1 - Spie chart for the Leaflet mapping library
 * https://en.wikipedia.org/wiki/Pie_chart#Spie_chart
 * Copyright (c) 2012 Mark Stahl (http://www.scienceandmagic.com)
 * 
 * code from g.piechart.js, a part of:
 * g.Raphael 0.5 - Charting library, based on Raphaël
 * Copyright (c) 2009 Dmitry Baranovskiy (http://g.raphaeljs.com)
 * MIT Licensed (http://www.opensource.org/licenses/mit-license.php)
 * 
 * code from CircleMarker.js, a part of:
 * Leaflet 0.3.1 - http://leaflet.cloudmade.com
 * Copyright (c) 2010-2011 Cloudmade, Vladimir Agafonkin
 * BSD Licensed (https://github.com/CloudMade/Leaflet/blob/master/LICENSE)
 */

L.SpieChartMarker = L.FeatureGroup.extend({   
   initialize: function (latlng, radii, values, options) {
       var angles = [], angle = 0, vlen = values.length, slice = {},
           total = values.reduce(function (a, b) {return a + b});
           
       L.FeatureGroup.prototype.initialize.call(this, {});
       
       for (var i = 0; i < vlen; i++) {
           angles = [angle, angle -= 360 * values[i] / total];
           this.addLayer(new L.SpieChartSlice(latlng, radii[i], angles, 
               {color: options.colors[i]}));
       }
   },
   
   projectLatLngs: function () {
       this._point = this._map.latLngToLayerPoint(this._latlng);
   }
});