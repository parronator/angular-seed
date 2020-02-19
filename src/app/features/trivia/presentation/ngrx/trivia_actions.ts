import {createAction, props} from '@ngrx/store';
import {Trivia} from '../../domain/entities/trivia';

export const TriviaGet = createAction('[Trivia] Get');
export const TriviaGetSuccess = createAction('[Trivia] Get Success', props<{ trivia: Trivia }>());
export const TriviaGetError = createAction('[Trivia] Get Error', props<{ error: any }>());
