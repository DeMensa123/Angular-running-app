import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPrihlaskaComponent } from './new-prihlaska.component';

describe('NewPrihlaskaComponent', () => {
  let component: NewPrihlaskaComponent;
  let fixture: ComponentFixture<NewPrihlaskaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPrihlaskaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPrihlaskaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
