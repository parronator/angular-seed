import {createAction, props} from '@ngrx/store';
import {NumberTrivia} from '../../domain/entities/number_trivia';

export const NumberTriviaGet = createAction('[NumberTrivia] Get');
export const NumberTriviaGetSuccess = createAction('[NumberTrivia] Get Success', props<{ numberTrivia: NumberTrivia }>());
export const NumberTriviaGetError = createAction('[NumberTrivia] Get Error', props<{ error: any }>());
