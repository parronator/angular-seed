import {createSelector} from '@ngrx/store';
import {State} from '../../../../ngrx/app.reducers';
import {TriviaState} from './trivia_reducers';

export const selectFeature = (state: State) => state.trivia;

export const selectTrivia = createSelector(
  selectFeature, (state: TriviaState) => state.trivia
);

export const selectTriviaLoading = createSelector(
  selectFeature, (state: TriviaState) => state.loading
);

export const selectTriviaError = createSelector(
  selectFeature, (state: TriviaState) => state.error
);
