import {Action, createReducer, on} from '@ngrx/store';
import {NumberTriviaGet, NumberTriviaGetError, NumberTriviaGetSuccess} from './number_trivia_actions';
import {NumberTrivia} from '../../domain/entities/number_trivia';

export interface NumberTriviaState {
  error: any;
  loading: boolean;
  numberTrivia?: NumberTrivia;
}

const initialState: NumberTriviaState = {
  error: null,
  loading: false,
  numberTrivia: null
};

const reducer = createReducer(
  initialState,
  on(NumberTriviaGet, state => ({...state, loading: true})),
  on(NumberTriviaGetSuccess, (state, action) => ({...state, loading: false, numberTrivia: action.numberTrivia})),
  on(NumberTriviaGetError, state => ({...state, loading: false, error: true})),
);

export function numberTriviaReducer(state: NumberTriviaState | undefined, action: Action) {
  return reducer(state, action);
}
