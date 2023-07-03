import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootlandComponent } from './footland.component';

describe('FootlandComponent', () => {
  let component: FootlandComponent;
  let fixture: ComponentFixture<FootlandComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FootlandComponent]
    });
    fixture = TestBed.createComponent(FootlandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
