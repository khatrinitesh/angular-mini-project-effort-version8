import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountdowntimerComponent } from './countdowntimer.component';

describe('CountdowntimerComponent', () => {
  let component: CountdowntimerComponent;
  let fixture: ComponentFixture<CountdowntimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountdowntimerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountdowntimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
