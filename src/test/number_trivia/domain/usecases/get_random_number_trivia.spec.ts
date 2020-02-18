import {NumberTriviaRepository} from '../../../../app/features/number_trivia/domain/repositories/number_trivia_repository';
import {GetRandomNumberTriviaUsecase} from '../../../../app/features/number_trivia/domain/usecases/get_random_number_trivia_usecase';
import {mock, instance, when, verify} from 'ts-mockito';
import {Left, Right} from 'purify-ts';
import {NumberTrivia} from '../../../../app/features/number_trivia/domain/entities/number_trivia';
import {NoParams} from '../../../../app/core/usecases/usecase';
import {Failure, ServerFailure} from '../../../../app/core/error/failures';

const MockNumberTriviaRepository = mock<NumberTriviaRepository>();

describe('GetRandomNumberTriviaUsecase', () => {
  let mockRepository: NumberTriviaRepository;
  let usecase: GetRandomNumberTriviaUsecase;
  const tNumber = 1;
  const tNumberTrivia = new NumberTrivia({text: 'Test text', num: tNumber});

  beforeEach(() => {
    mockRepository = instance(MockNumberTriviaRepository);
    usecase = new GetRandomNumberTriviaUsecase(mockRepository);
  });

  afterEach(() => {
    mockRepository = null;
    usecase = null;
  });

  it('should get trivia from the repository', async () => {
    when(MockNumberTriviaRepository.getRandomNumberTrivia()).thenResolve(Right(tNumberTrivia));
    const result = await usecase.call(new NoParams());
    expect(result).toEqual(Right(tNumberTrivia));
    verify(MockNumberTriviaRepository.getRandomNumberTrivia()).called();
  });

  it('should get failure from the repository when error', async () => {
    when(MockNumberTriviaRepository.getRandomNumberTrivia()).thenResolve(Left(new ServerFailure()));
    const result = await usecase.call(new NoParams());
    expect(result).toEqual(Left(new ServerFailure()));
  });
});
