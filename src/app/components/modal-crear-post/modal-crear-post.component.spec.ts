import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCrearPostComponent } from './modal-crear-post.component';

describe('ModalCrearPostComponent', () => {
  let component: ModalCrearPostComponent;
  let fixture: ComponentFixture<ModalCrearPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalCrearPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalCrearPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
