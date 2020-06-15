import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibtorrentComponent } from './libtorrent.component';

describe('LibtorrentComponent', () => {
  let component: LibtorrentComponent;
  let fixture: ComponentFixture<LibtorrentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibtorrentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibtorrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
