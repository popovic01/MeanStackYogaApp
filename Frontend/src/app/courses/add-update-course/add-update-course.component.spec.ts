import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateCourseComponent } from './add-update-course.component';

describe('AddUpdateCourseComponent', () => {
  let component: AddUpdateCourseComponent;
  let fixture: ComponentFixture<AddUpdateCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
