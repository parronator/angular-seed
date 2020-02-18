import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberTriviaExampleComponent } from './number-trivia-example.component';

describe('NumberTriviaExampleComponent', () => {
  let component: NumberTriviaExampleComponent;
  let fixture: ComponentFixture<NumberTriviaExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberTriviaExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberTriviaExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
