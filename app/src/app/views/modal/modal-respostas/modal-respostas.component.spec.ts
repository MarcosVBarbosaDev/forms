import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRespostasComponent } from './modal-respostas.component';

describe('ModalRespostasComponent', () => {
  let component: ModalRespostasComponent;
  let fixture: ComponentFixture<ModalRespostasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRespostasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalRespostasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
