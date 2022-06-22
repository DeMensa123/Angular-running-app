import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrihlaskyComponent } from './prihlasky.component';

describe('PrihlaskyComponent', () => {
  let component: PrihlaskyComponent;
  let fixture: ComponentFixture<PrihlaskyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrihlaskyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrihlaskyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
