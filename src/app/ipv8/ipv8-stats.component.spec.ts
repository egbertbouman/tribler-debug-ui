import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IPv8StatsComponent } from './ipv8-stats.component';

describe('IPv8StatsComponent', () => {
  let component: GeneralComponent;
  let fixture: ComponentFixture<IPv8StatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IPv8StatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IPv8StatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
