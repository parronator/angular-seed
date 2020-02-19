import {
  TriviaGetErrorReducer,
  TriviaGetReducer,
  TriviaGetSuccessReducer
} from '../../../../app/features/trivia/presentation/ngrx/trivia_reducers';
import {TriviaGet, TriviaGetError, TriviaGetSuccess} from '../../../../app/features/trivia/presentation/ngrx/trivia_actions';
import {Trivia} from '../../../../app/features/trivia/domain/entities/trivia';

describe('TriviaReducers', () => {
  it('should put loading true on GET', () => {
    const initialState = {};
    expect(TriviaGetReducer(initialState, TriviaGet).loading).toBeTrue();
  });
  it('should put loading false and trivia on SUCCESS', () => {
    const initialState = {};
    const tTrivia = new Trivia({text: '', num: 1});
    expect(TriviaGetSuccessReducer(initialState, TriviaGetSuccess({trivia: tTrivia})).trivia).toEqual(tTrivia);
    expect(TriviaGetSuccessReducer(initialState, TriviaGetSuccess({trivia: tTrivia})).loading).toBeFalse();
  });
  it('should put loading false and error on FAIL', () => {
    const initialState = {};
    expect(TriviaGetErrorReducer(initialState, TriviaGetError({error: true})).error).toBeTrue()
    expect(TriviaGetErrorReducer(initialState, TriviaGetError({error: true})).loading).toBeFalse();
  });
})
