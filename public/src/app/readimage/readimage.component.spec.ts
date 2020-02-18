import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadimageComponent } from './readimage.component';

describe('ReadimageComponent', () => {
  let component: ReadimageComponent;
  let fixture: ComponentFixture<ReadimageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadimageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
