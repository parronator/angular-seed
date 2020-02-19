import {
  ActionReducerMap,
  MetaReducer,
} from '@ngrx/store';
import {environment} from '../../environments/environment';
import {triviaReducer} from '../features/trivia/presentation/ngrx/trivia_reducers';

export interface State {
  trivia;
}

export const reducers: ActionReducerMap<State> = {
  trivia: triviaReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
