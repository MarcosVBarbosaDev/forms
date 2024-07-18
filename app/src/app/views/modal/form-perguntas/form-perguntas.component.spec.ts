import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPerguntasComponent } from './form-perguntas.component';

describe('FormPerguntasComponent', () => {
  let component: FormPerguntasComponent;
  let fixture: ComponentFixture<FormPerguntasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPerguntasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPerguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
