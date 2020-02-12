import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckwordComponent } from './checkword.component';

describe('CheckwordComponent', () => {
  let component: CheckwordComponent;
  let fixture: ComponentFixture<CheckwordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckwordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckwordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
