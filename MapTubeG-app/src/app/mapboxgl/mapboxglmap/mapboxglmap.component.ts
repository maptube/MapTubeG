import { Component, Input, OnInit } from '@angular/core';
//import {LngLat, Map} from './assets/mapboxgl.js';
//import {Map} from 'mapboxgl';
//import * as mapboxgl from "mapboxgl"

declare var mapboxgl: any;


@Component({
  selector: 'app-mapboxglmap',
  templateUrl: './mapboxglmap.component.html',
  styleUrls: ['./mapboxglmap.component.css']
})
export class MapboxglmapComponent implements OnInit {
  @Input() accessToken : string;

  constructor() { }

  ngOnInit() {
    mapboxgl.accessToken = 'pk.eyJ1IjoicndtaWx0b24iLCJhIjoiSmZINmZDWSJ9.u748qYexge5Txkq4iuUV2Q';
    let map = new mapboxgl.Map({
      container: 'map', //container id
      style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
      center: [-74.50, 40], // starting position [lng, lat]
      zoom: 9 // starting zoom
    });
    console.log("mapboxglmap.components ngOnInit");
    console.log("access token: ",this.accessToken);

  }


}
