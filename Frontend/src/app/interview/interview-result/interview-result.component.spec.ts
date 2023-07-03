import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewResultComponent } from './interview-result.component';

describe('InterviewResultComponent', () => {
  let component: InterviewResultComponent;
  let fixture: ComponentFixture<InterviewResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterviewResultComponent]
    });
    fixture = TestBed.createComponent(InterviewResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
