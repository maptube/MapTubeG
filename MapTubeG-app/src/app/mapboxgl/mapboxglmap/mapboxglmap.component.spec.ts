import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapboxglmapComponent } from './mapboxglmap.component';

describe('MapboxglmapComponent', () => {
  let component: MapboxglmapComponent;
  let fixture: ComponentFixture<MapboxglmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapboxglmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapboxglmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
