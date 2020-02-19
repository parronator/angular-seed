import {NoParams, UseCase} from '../../../../core/usecases/usecase';
import {Trivia} from '../entities/trivia';
import {Either} from 'purify-ts';
import {Failure} from '../../../../core/error/failures';
import {TriviaRepository} from '../repositories/trivia_repository';
import {Injectable} from '@angular/core';

@Injectable()
export class TriviaGetRandomUsecase implements UseCase<Trivia, NoParams> {
  repository: TriviaRepository;

  constructor(repository: TriviaRepository) {
    this.repository = repository;
  }

  async call(params: NoParams): Promise<Either<Failure, Trivia>> {
    return await this.repository.getRandom();
  }
}
