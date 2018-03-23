import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MainMenuBarComponent } from './ui/main-menu-bar/main-menu-bar.component';
import { UiModule } from './ui/ui.module';
import { MapboxglModule } from './mapboxgl/mapboxgl.module';
import { MapboxglmapComponent } from './mapboxgl/mapboxglmap/mapboxglmap.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    UiModule,
    MapboxglModule
  ],
  providers: [],
  bootstrap: [AppComponent, MainMenuBarComponent, MapboxglmapComponent]
})
export class AppModule { }
