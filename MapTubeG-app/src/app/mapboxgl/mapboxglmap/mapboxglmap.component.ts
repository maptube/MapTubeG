import { Component, Input, OnInit } from '@angular/core';
//import {LngLat, Map} from './assets/mapboxgl.js';
//import {Map} from 'mapboxgl';
//import * as mapboxgl from "mapboxgl"

declare var mapboxgl: any;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//GISMap is a wrapper around the MapBox library which provides us with layers and other GIS functionality
class GISMap {
  map:any;
  layers:MapLayer[];
  constructor(containerid:string) {
    console.log('GISMap constructor');
    this.map = new mapboxgl.Map({
      container: containerid, //container id
      style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
      center: [0, 52], // starting position [lng, lat]
      zoom: 6 // starting zoom
    });

    //let gismap = this;
    //this.map.on('load', function() {
    //  let ml = new MapLayer('http://quant.casa.ucl.ac.uk/ws/MapBoxVectorTileService.svc/{z}/{x}/{y}','test');
    //  //map.addSource('prototiles', ml.sourceObj);
    //  let style = new LayerStyle('value','prototiles',[0,0.25,0.5,0.75,1],['#ff0000','#ffff00','#00ff00','#00ffff','#0000ff']);
    //  //let mbstyles = style.getMapboxStyleLayers();
    //  //for (let i=0; i<mbstyles.length; i++)
    //  //  map.addLayer(mbstyles[i]);
    //  gismap.addGISVectorLayer(ml,style);
    //});

    this.map.addControl(new mapboxgl.NavigationControl());

  }

  addGISVectorLayer(mapLayer:MapLayer,style:LayerStyle)
  {
    console.log('addGISVectorLayer',this,mapLayer);
    this.map.addSource(mapLayer.sourceName,mapLayer.sourceObj);
    let mbstyles = style.getMapboxStyleLayers();
    for (let i=0; i<mbstyles.length; i++)
    {
      this.map.addLayer(mbstyles[i]);
    }
    this.layers.push(mapLayer);
  }
  //addGeoJSONLayer: function (variableName, sourceName, sourceObj, layers)
  //removeLayer(variableName,sourceName)
  //setGISStyle: function(sourceName, variableName, gisstyle)
  //http://localhost:56004/ws/MapBoxVectorTileService.svc/{z}/{x}/{y}

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//MapLayer stores the data layer added to the GISMap wrapper for MapBox sourceObj
class MapLayer {
  label:string;
  sourceName:string;
  vectorTilerURI:string;
  private _sourceObj:object;
  get sourceObj():object {
    this._sourceObj = {
      'type' : 'vector',
      'tiles' : [this.vectorTilerURI],
      'minZoom' : 1,
      'maxZoom' : 21
    }
    return this._sourceObj;
  }

  /**
   * Constructor for MapLayer
   * @param vectorTilerURI string of vector tile source e.g. http://localhost/MapBoxVectorTileService/{z}/{x}/{y}
   * @param label Plain text name of label used to identify this MapLayer
   */
  constructor(sourceName:string,vectorTilerURI:string,label:string) {
    this.sourceName=sourceName;
    this.vectorTilerURI = vectorTilerURI;
    this.label=label;
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//wraps all the mapbox filters needed to style a layer
//TODO: if the data is in the tile server, then we're going to need a web service
class LayerStyle {
  dataFieldName: string;
  sourceName : string;
  breaks: number[];
  colours: string[];
  constructor(dataFieldName:string,sourceName:string,breaks:number[],colours:string[]) {
    this.dataFieldName = dataFieldName;
    this.sourceName = sourceName;
    this.breaks = breaks;
    this.colours = colours;
  }
  /**
   * Make a list of mapbox style objects to colour this layer
   * @returns a list of style objects to be added to the map
   */
  getMapboxStyleLayers():object[] {
    let layers = [];
    for (let i =0; i<this.breaks.length-1; i++) {
      var style = {
        'id': this.dataFieldName + '_' + i,
        'source': this.sourceName, //'prototiles',
        'source-layer': 'mytilepoints', //this.sourceLayer, //"mytilepoints",
        'type': 'fill',
        'paint': {
            'fill-color': this.colours[i]
        },
        'filter': null
      };
      if (i == this.breaks.length - 2) style.filter = ['all', ['>=', 'value', this.breaks[i]], ['<=', 'value', this.breaks[i + 1]]]; //last value breaks[i+1]==max value
      else style.filter = ['all', ['>=', 'value', this.breaks[i]], ['<', 'value', this.breaks[i + 1]]];
      layers.push(style);
    }
    return layers;
  }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
@Component({
  selector: 'app-mapboxglmap',
  templateUrl: './mapboxglmap.component.html',
  styleUrls: ['./mapboxglmap.component.css']
})
export class MapboxglmapComponent implements OnInit {
  //MapBox GL Map component that wraps a GISMap class providing the mapbox functionality for GIS
  @Input() accessToken : string;
  gismap: GISMap;

  constructor() {
  }

  testFn() {
    //'#edf8fb', '#b2e2e2', '#66c2a4', '#2ca25f', '#006d2c'
    let ml = new MapLayer('prototiles','http://quant.casa.ucl.ac.uk/ws/MapBoxVectorTileService.svc/{z}/{x}/{y}','test');
    let style = new LayerStyle('value','prototiles',[0,0.25,0.5,0.75,1],['#ff0000','#ffff00','#00ff00','#00ffff','#0000ff']);
    this.gismap.addGISVectorLayer.call(this.gismap,ml,style);
  }

  ngOnInit() {
    mapboxgl.accessToken = 'pk.eyJ1IjoicndtaWx0b24iLCJhIjoiSmZINmZDWSJ9.u748qYexge5Txkq4iuUV2Q';
    //mapboxgl.accessToken = this.accessToken;
    //mapboxgl.accessToken = '{{mapboxglAccessToken}}';
    this.gismap = new GISMap('map');
    this.gismap.map.on('load', this.testFn.bind(this));
    
    console.log("mapboxglmap.components ngOnInit");
    console.log("access token: ",this.accessToken);
    //console.log("global access token: ", mapboxglAccessToken); //how?


  }


}
