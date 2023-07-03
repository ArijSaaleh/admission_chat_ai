import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavlandComponent } from './navland.component';

describe('NavlandComponent', () => {
  let component: NavlandComponent;
  let fixture: ComponentFixture<NavlandComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavlandComponent]
    });
    fixture = TestBed.createComponent(NavlandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
