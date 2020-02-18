import {NumberTriviaRemoteDataSource} from '../datasources/number_trivia_remote_data_source';
import {Either} from 'purify-ts/Either';
import {Failure, ServerEmptyFailure, ServerFailure} from '../../../../core/error/failures';
import {NumberTrivia} from '../../domain/entities/number_trivia';
import {NumberTriviaRepository} from '../../domain/repositories/number_trivia_repository';
import {Right, Left} from 'purify-ts';
import {ServerEmptyException, ServerException} from '../../../../core/error/exceptions';
import {Injectable} from '@angular/core';

@Injectable()
export class NumberTriviaRepositoryImpl implements NumberTriviaRepository {
  remote: NumberTriviaRemoteDataSource;

  constructor(remote: NumberTriviaRemoteDataSource) {
    this.remote = remote;
  }

  async getRandomNumberTrivia(): Promise<Either<Failure, NumberTrivia>> {
    try {
      const result = await this.remote.getRandomNumberTrivia();
      return Right(result);
    } catch (e) {
      if (e instanceof ServerEmptyException) {
        return Left(new ServerEmptyFailure());
      }
      return Left(new ServerFailure());
    }
  }
}
