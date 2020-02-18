import {Component, OnInit} from '@angular/core';
import {NumberTrivia} from './features/number_trivia/domain/entities/number_trivia';
import {select, Store} from '@ngrx/store';
import {NumberTriviaGet} from './features/number_trivia/presentation/ngrx/number_trivia_actions';
import {Observable} from 'rxjs';
import {selectNumberTrivia} from './features/number_trivia/presentation/ngrx/number_trivia_selectors';
import {State} from './ngrx/app.reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  numberTrivia$: Observable<NumberTrivia>;

  constructor(private store: Store<State>) {
  }

  async ngOnInit() {
    this.store.dispatch(NumberTriviaGet());
    this.numberTrivia$ = this.store.pipe(select(selectNumberTrivia));
  }
}
