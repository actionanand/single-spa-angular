import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactParcelComponent } from './react-parcel.component';

describe('ReactParcelComponent', () => {
  let component: ReactParcelComponent;
  let fixture: ComponentFixture<ReactParcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactParcelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactParcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
