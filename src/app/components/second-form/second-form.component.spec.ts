import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondFormComponent } from './second-form.component';

describe('SecondFormComponent', () => {
  let component: SecondFormComponent;
  let fixture: ComponentFixture<SecondFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecondFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
