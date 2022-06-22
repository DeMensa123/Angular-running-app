import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStanoviskoFormComponent } from './new-stanovisko-form.component';

describe('NewStanoviskoFormComponent', () => {
  let component: NewStanoviskoFormComponent;
  let fixture: ComponentFixture<NewStanoviskoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewStanoviskoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewStanoviskoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
