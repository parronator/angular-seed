import {TriviaRepository} from '../../domain/repositories/trivia_repository';
import {TriviaRemoteDataSource} from '../datasources/trivia_remote_data_source';
import {Either, Left, Right} from 'purify-ts';
import {Failure, ServerEmptyFailure, ServerFailure} from '../../../../core/error/failures';
import {Trivia} from '../../domain/entities/trivia';
import {ServerEmptyException} from '../../../../core/error/exceptions';
import {Injectable} from '@angular/core';

@Injectable()
export class TriviaRepositoryImpl implements TriviaRepository {
  remote: TriviaRemoteDataSource;

  constructor(remote: TriviaRemoteDataSource) {
    this.remote = remote;
  }

  async getRandom(): Promise<Either<Failure, Trivia>> {
    try {
      const response = await this.remote.getRandom();
      return Right(response);
    } catch (e) {
      if (e instanceof ServerEmptyException) {
        return Left(new ServerEmptyFailure());
      }
      return Left(new ServerFailure());
    }
  }
}
