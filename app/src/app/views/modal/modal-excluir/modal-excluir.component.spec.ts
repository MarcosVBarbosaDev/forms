import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExcluirComponent } from './modal-excluir.component';

describe('ModalExcluirComponent', () => {
  let component: ModalExcluirComponent;
  let fixture: ComponentFixture<ModalExcluirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalExcluirComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalExcluirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
