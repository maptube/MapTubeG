import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapboxglmapComponent } from './mapboxglmap/mapboxglmap.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MapboxglmapComponent],
  exports: [
    MapboxglmapComponent
  ]
})
export class MapboxglModule { }
