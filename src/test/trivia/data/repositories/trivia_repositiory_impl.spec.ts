import {TriviaRepository} from '../../../../app/features/trivia/domain/repositories/trivia_repository';
import {TriviaRemoteDataSource} from '../../../../app/features/trivia/data/datasources/trivia_remote_data_source';
import {instance, mock, verify, when} from 'ts-mockito';
import {TriviaRepositoryImpl} from '../../../../app/features/trivia/data/repositories/trivia_repository_impl';
import {Trivia} from '../../../../app/features/trivia/domain/entities/trivia';
import {Left, Right} from 'purify-ts';
import {ServerEmptyException, ServerException} from '../../../../app/core/error/exceptions';
import {ServerEmptyFailure, ServerFailure} from '../../../../app/core/error/failures';

const MockTriviaRemoteDataSource = mock<TriviaRemoteDataSource>();

describe('TriviaRepositoryImpl', () => {
  let dataSource: TriviaRemoteDataSource;
  let repository: TriviaRepository;
  const tTrivia = new Trivia({text: 'Test text', num: 1});

  beforeEach(() => {
    dataSource = instance(MockTriviaRemoteDataSource);
    repository = new TriviaRepositoryImpl(dataSource);
  });

  afterEach(() => {
    dataSource = null;
    repository = null;
  });

  it('should return Trivia when dataSource call success', async () => {
    when(MockTriviaRemoteDataSource.getRandom()).thenResolve(tTrivia);
    const response = await repository.getRandom();
    expect(response).toEqual(Right(tTrivia));
    verify(MockTriviaRemoteDataSource.getRandom()).called();
  });

  it('should return ServerFailure when dataSource call unsuccessful', async () => {
    when(MockTriviaRemoteDataSource.getRandom()).thenThrow(new ServerException());
    const response = await repository.getRandom();
    expect(response).toEqual(Left(new ServerFailure()));
  });

  it('should return ServerEmptyFailure when dataSource call unsuccessful', async () => {
    when(MockTriviaRemoteDataSource.getRandom()).thenThrow(new ServerEmptyException());
    const response = await repository.getRandom();
    expect(response).toEqual(Left(new ServerEmptyFailure()));
  });
});
