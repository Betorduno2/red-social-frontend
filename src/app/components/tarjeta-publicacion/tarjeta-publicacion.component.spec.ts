import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaPublicacionComponent } from './tarjeta-publicacion.component';

describe('TarjetaPublicacionComponent', () => {
  let component: TarjetaPublicacionComponent;
  let fixture: ComponentFixture<TarjetaPublicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TarjetaPublicacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TarjetaPublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
