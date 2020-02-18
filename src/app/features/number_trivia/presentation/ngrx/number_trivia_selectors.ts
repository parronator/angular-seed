import {createSelector} from '@ngrx/store';
import {State} from '../../../../ngrx/app.reducers';
import {NumberTriviaState} from './number_trivia_reducers';

export const selectFeature = (state: State) => state.numberTrivia;

export const selectNumberTrivia = createSelector(
  selectFeature, (state: NumberTriviaState) => state.numberTrivia
);
