import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosePackageComponent } from './choose-package.component';

describe('ChoosePackageComponent', () => {
  let component: ChoosePackageComponent;
  let fixture: ComponentFixture<ChoosePackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoosePackageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoosePackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
