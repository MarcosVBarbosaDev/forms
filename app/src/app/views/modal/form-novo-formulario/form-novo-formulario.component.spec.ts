import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNovoFormularioComponent } from './form-novo-formulario.component';

describe('FormNovoFormularioComponent', () => {
  let component: FormNovoFormularioComponent;
  let fixture: ComponentFixture<FormNovoFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormNovoFormularioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormNovoFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
