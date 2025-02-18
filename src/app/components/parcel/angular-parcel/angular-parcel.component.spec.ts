import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularParcelComponent } from './angular-parcel.component';

describe('AngularParcelComponent', () => {
  let component: AngularParcelComponent;
  let fixture: ComponentFixture<AngularParcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularParcelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularParcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
