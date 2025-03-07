import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosePlanCardComponent } from './choose-plan-card.component';

describe('ChoosePlanCardComponent', () => {
  let component: ChoosePlanCardComponent;
  let fixture: ComponentFixture<ChoosePlanCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoosePlanCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoosePlanCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
