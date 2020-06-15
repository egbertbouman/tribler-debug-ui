import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ipv8Component } from './ipv8.component';

describe('Ipv8Component', () => {
  let component: Ipv8Component;
  let fixture: ComponentFixture<Ipv8Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ipv8Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ipv8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
