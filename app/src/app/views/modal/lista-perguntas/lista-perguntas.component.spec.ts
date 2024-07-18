import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPerguntasComponent } from './lista-perguntas.component';

describe('ListaPerguntasComponent', () => {
  let component: ListaPerguntasComponent;
  let fixture: ComponentFixture<ListaPerguntasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaPerguntasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaPerguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
