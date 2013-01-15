/*
 * SpieChartSlice.js 0.1 - Spie chart for the Leaflet mapping library
 * https://en.wikipedia.org/wiki/Pie_chart#Spie_chart
 * Copyright (c) 2012 Mark Stahl (http://www.scienceandmagic.com)
 * 
 * code from g.piechart.js, a part of:
 * g.Raphael 0.5 - Charting library, based on Raphaël
 * Copyright (c) 2009 Dmitry Baranovskiy (http://g.raphaeljs.com)
 * MIT Licensed (http://www.opensource.org/licenses/mit-license.php)
 * 
 * code from Circle.js, a part of:
 * Leaflet 0.3.1 - http://leaflet.cloudmade.com
 * Copyright (c) 2010-2011 Cloudmade, Vladimir Agafonkin
 * BSD Licensed (https://github.com/CloudMade/Leaflet/blob/master/LICENSE)
 */

L.SpieChartSlice = L.Path.extend({
    initialize: function (latlng, radius, angles, options) {
        L.Path.prototype.initialize.call(this, options);
        
        this._startAngle = angles[0];
        this._endAngle = angles[1];
        this._latlng = latlng;
        this._radius = radius;
    },
    
    options: {
        fill: true,
        weight: 1,
        fillOpacity: .7,
        strokeColor: '#FFF',
        stoke: true
    },
    
    getBounds: function () {
        var map = this._map,
            delta = this._radius * Math.cos(Math.PI / 4),
            point = map.project(this._latlng),
            swPoint = new L.Point(point.x - delta, point.y - delta),
            nePoint = new L.Point(point.x + delta, point.y + delta),
            zoom = map.getZoom(),
            sw = map.unproject(swPoint, zoom, true),
            ne = map.unproject(nePoint, zoom, true);
            
        return new L.LatLngBounds(sw, ne);
    },
    
    getLatLng: function () {
        return this._latlng;
    },
    
    getPathString: function () {
        this._point = this._map.latLngToLayerPoint(this._latlng);
        
        var p = this._point, r = this._radius, 
            sa = this._startAngle, ea = this._endAngle, 
            rad = L.LatLng.DEG_TO_RAD,
            x1 = p.x + r * Math.cos(-sa * rad),
            x2 = p.x + r * Math.cos(-ea * rad),
            y1 = p.y + r * Math.sin(-sa * rad),
            y2 = p.y + r * Math.sin(-ea * rad),
            arc = (ea-sa < -180) ? 1 : 0;
        
        if (this._checkIfEmpty()) {
            return '';
        }
        
        var p = this._point;
        if (L.Browser.svg) {
            return 'M' + p.x + ',' + p.y + ' ' +
                   'L' + x1  + ',' + y1  + ' ' +
                   'A' + r   + ',' + r   + ' 0 ' + arc + ',1 ' +
                   x2  + "," + y2  + " z";
        } 
        
        return '';
    },
    
    _updateStyle: function () {
    	if (this.options.stroke) {
    		this._path.setAttribute('stroke', this.options.strokeColor || this.options.color);
    		this._path.setAttribute('stroke-opacity', this.options.opacity);
    		this._path.setAttribute('stroke-width', this.options.weight);
    	} else {
    		this._path.setAttribute('stroke', 'none');
    	}
    	if (this.options.fill) {
    		this._path.setAttribute('fill', this.options.fillColor || this.options.color);
    		this._path.setAttribute('fill-opacity', this.options.fillOpacity);
    	} else {
    		this._path.setAttribute('fill', 'none');
    	}
    },
    
    _checkIfEmpty: function () {
        if (!this._map) {
            return false;
        }
        
        var vp = this._map._pathViewport,
            r = this._radius,
            p = this._point;
        
        return p.x - r > vp.max.x || p.y - r > vp.max.y || 
               p.x + r < vp.min.x || p.y + r < vp.min.y;
    }
});