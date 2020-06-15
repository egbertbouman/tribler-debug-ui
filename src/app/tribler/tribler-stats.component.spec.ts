import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TriblerStatsComponent } from './tribler-stats.component';

describe('TriblerStatsComponent', () => {
  let component: TriblerStatsComponent;
  let fixture: ComponentFixture<TriblerStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TriblerStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TriblerStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
