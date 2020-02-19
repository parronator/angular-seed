import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../ngrx/app.reducers';
import {TriviaGet} from './trivia_actions';
import {Observable} from 'rxjs';
import {Trivia} from '../../domain/entities/trivia';
import {selectTrivia} from './trivia_selectors';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {
  trivia$: Observable<Trivia> = this.store.pipe(select(selectTrivia));

  constructor(private store: Store<State>) {
  }

  getRandomTrivia() {
    this.store.dispatch(TriviaGet());
  }
}
