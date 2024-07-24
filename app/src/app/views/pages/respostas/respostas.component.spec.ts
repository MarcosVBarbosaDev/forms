import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespostasComponent } from './respostas.component';

describe('RespostasComponent', () => {
  let component: RespostasComponent;
  let fixture: ComponentFixture<RespostasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RespostasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RespostasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
