import {Action, createReducer, on} from '@ngrx/store';
import {TriviaGet, TriviaGetError, TriviaGetSuccess} from './trivia_actions';
import {Trivia} from '../../domain/entities/trivia';

export interface TriviaState {
  error: any;
  loading: boolean;
  trivia?: Trivia;
}

export const initialState: TriviaState = {
  error: null,
  loading: false,
  trivia: null
};

const reducer = createReducer(
  initialState,
  on(TriviaGet, TriviaGetReducer),
  on(TriviaGetSuccess, TriviaGetSuccessReducer),
  on(TriviaGetError, TriviaGetErrorReducer),
);

export function triviaReducer(state: TriviaState | undefined, action: Action) {
  return reducer(state, action);
}

export function TriviaGetReducer(state, action) {
  return ({...state, loading: true});
}

export function TriviaGetSuccessReducer(state, action) {
  return ({...state, loading: false, trivia: action.trivia});
}

export function TriviaGetErrorReducer(state, action) {
  return ({...state, loading: false, error: true});
}
