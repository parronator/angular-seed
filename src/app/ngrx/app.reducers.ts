import {
  ActionReducerMap,
  MetaReducer,
} from '@ngrx/store';
import {environment} from '../../environments/environment';
import {numberTriviaReducer} from '../features/number_trivia/presentation/ngrx/number_trivia_reducers';

export interface State {
  numberTrivia;
}

export const reducers: ActionReducerMap<State> = {
  numberTrivia: numberTriviaReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];


