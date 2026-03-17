import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FormPlacesSortingComponent} from './form-places-sorting.component';

describe('FormPlacesSortingComponent', () => {
  let component: FormPlacesSortingComponent;
  let fixture: ComponentFixture<FormPlacesSortingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormPlacesSortingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormPlacesSortingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
