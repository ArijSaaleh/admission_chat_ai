import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewContentComponent } from './interview-content.component';

describe('InterviewContentComponent', () => {
  let component: InterviewContentComponent;
  let fixture: ComponentFixture<InterviewContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterviewContentComponent]
    });
    fixture = TestBed.createComponent(InterviewContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
