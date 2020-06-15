import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DHTStatsComponent } from './dht-stats.component';

describe('DHTStatsComponent', () => {
  let component: DHTStatsComponent;
  let fixture: ComponentFixture<DHTStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DHTStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DHTStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
