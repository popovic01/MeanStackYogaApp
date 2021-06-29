import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateWorkoutComponent } from './add-update-workout.component';

describe('AddUpdateWorkoutComponent', () => {
  let component: AddUpdateWorkoutComponent;
  let fixture: ComponentFixture<AddUpdateWorkoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateWorkoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
