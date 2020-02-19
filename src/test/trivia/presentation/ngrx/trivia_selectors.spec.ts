import {selectTrivia, selectTriviaError, selectTriviaLoading} from '../../../../app/features/trivia/presentation/ngrx/trivia_selectors';
import {initialState} from '../../../../app/features/trivia/presentation/ngrx/trivia_reducers';
import {Trivia} from '../../../../app/features/trivia/domain/entities/trivia';

describe('TriviaSelectors', () => {
  it('should return trivia', () => {
    const tTrivia = new Trivia({text: 'test', num: 1});
    const state = {...initialState, trivia: tTrivia};
    expect(selectTrivia.projector(state)).toBe(tTrivia);
  });

  it('should return loading', () => {
    const state = {...initialState, loading: true};
    expect(selectTriviaLoading.projector(state)).toBe(true);
  });

  it('should return error', () => {
    const state = {...initialState, error: 'algo'};
    expect(selectTriviaError.projector(state)).toBe('algo');
  });
});
