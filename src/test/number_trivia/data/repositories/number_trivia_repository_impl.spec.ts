import {instance, mock, verify, when} from 'ts-mockito';
import {NumberTriviaRepository} from '../../../../app/features/number_trivia/domain/repositories/number_trivia_repository';
import {NumberTrivia} from '../../../../app/features/number_trivia/domain/entities/number_trivia';
import {NumberTriviaRemoteDataSource} from '../../../../app/features/number_trivia/data/datasources/number_trivia_remote_data_source';
import {NumberTriviaRepositoryImpl} from '../../../../app/features/number_trivia/data/repositories/number_trivia_repository_impl';
import {Left, Right} from 'purify-ts';
import {ServerEmptyException, ServerException} from '../../../../app/core/error/exceptions';
import {ServerEmptyFailure, ServerFailure} from '../../../../app/core/error/failures';

const MockNumberTriviaRemoteDataSource = mock<NumberTriviaRemoteDataSource>();

describe('NumberTriviaRepositoryImpl', () => {
  let mockRemoteDataSource: NumberTriviaRemoteDataSource;
  let repository: NumberTriviaRepository;
  const tNumberTrivia = new NumberTrivia({text: 'Test text', num: 1});

  beforeEach(() => {
    mockRemoteDataSource = instance(MockNumberTriviaRemoteDataSource);
    repository = new NumberTriviaRepositoryImpl(mockRemoteDataSource);
  });

  afterEach(() => {
    mockRemoteDataSource = null;
    repository = null;
  });

  it('should return remote data when the call to remote data source is successful', async () => {
    when(MockNumberTriviaRemoteDataSource.getRandomNumberTrivia()).thenResolve(tNumberTrivia);
    const result = await repository.getRandomNumberTrivia();
    verify(MockNumberTriviaRemoteDataSource.getRandomNumberTrivia()).called();
    expect(result).toEqual(Right(tNumberTrivia));
  });

  it('should return ServerFailure when the call to remote data source is unsuccessful', async () => {
    when(MockNumberTriviaRemoteDataSource.getRandomNumberTrivia()).thenThrow(new ServerException());
    const result = await repository.getRandomNumberTrivia();
    expect(result).toEqual(Left(new ServerFailure()));
  });

  it('should return ServerFailure when the call to remote data source is empty', async () => {
    when(MockNumberTriviaRemoteDataSource.getRandomNumberTrivia()).thenThrow(new ServerEmptyException());
    const result = await repository.getRandomNumberTrivia();
    expect(result).toEqual(Left(new ServerEmptyFailure()));
  });
});
