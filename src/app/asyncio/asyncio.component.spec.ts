import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncioComponent } from './asyncio.component';

describe('AsyncioComponent', () => {
  let component: AsyncioComponent;
  let fixture: ComponentFixture<AsyncioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsyncioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsyncioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
