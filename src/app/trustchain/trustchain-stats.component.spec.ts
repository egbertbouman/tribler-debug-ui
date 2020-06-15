import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustchainStatsComponent } from './trustchain.component';

describe('TrustchainStatsComponent', () => {
  let component: TrustchainStatsComponent;
  let fixture: ComponentFixture<TrustchainStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrustchainStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrustchainStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
