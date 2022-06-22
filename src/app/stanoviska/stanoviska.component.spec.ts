import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StanoviskaComponent } from './stanoviska.component';

describe('StanoviskaComponent', () => {
  let component: StanoviskaComponent;
  let fixture: ComponentFixture<StanoviskaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StanoviskaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StanoviskaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
