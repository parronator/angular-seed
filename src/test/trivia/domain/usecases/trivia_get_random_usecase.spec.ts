import {instance, mock, verify, when} from 'ts-mockito';
import {TriviaRepository} from '../../../../app/features/trivia/domain/repositories/trivia_repository';
import {TriviaGetRandomUsecase} from '../../../../app/features/trivia/domain/usecases/trivia_get_random_usecase';
import {Left, Right} from 'purify-ts';
import {Trivia} from '../../../../app/features/trivia/domain/entities/trivia';
import {NoParams} from '../../../../app/core/usecases/usecase';
import {ServerFailure} from '../../../../app/core/error/failures';

const MockTriviaRepository = mock<TriviaRepository>();

describe('TriviaGetRandomUsecase', () => {
  let repository: TriviaRepository;
  let usecase: TriviaGetRandomUsecase;
  const tTrivia = new Trivia({text: 'Test text', num: 1});

  beforeEach(() => {
    repository = instance(MockTriviaRepository);
    usecase = new TriviaGetRandomUsecase(repository);
  });

  afterEach(() => {
    usecase = null;
    repository = null;
  });

  it('should get random trivia from repository', async () => {
    when(MockTriviaRepository.getRandom()).thenResolve(Right(tTrivia));
    const response = await usecase.call(new NoParams());
    verify(MockTriviaRepository.getRandom()).called();
    expect(response).toEqual(Right(tTrivia));
  });

  it('should get random trivia from repository should fail with left', async () => {
    when(MockTriviaRepository.getRandom()).thenResolve(Left(new ServerFailure()));
    const response = await usecase.call(new NoParams());
    verify(MockTriviaRepository.getRandom()).called();
    expect(response).toEqual(Left(new ServerFailure()));
  });
});




