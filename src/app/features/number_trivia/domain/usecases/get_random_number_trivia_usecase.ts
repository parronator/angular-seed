import {NoParams, UseCase} from '../../../../core/usecases/usecase';
import {NumberTrivia} from '../entities/number_trivia';
import {NumberTriviaRepository} from '../repositories/number_trivia_repository';
import {Either} from 'purify-ts/Either';
import {Failure} from '../../../../core/error/failures';
import {Inject, Injectable} from '@angular/core';

@Injectable()
export class GetRandomNumberTriviaUsecase implements UseCase<NumberTrivia, NoParams> {
  repository: NumberTriviaRepository;

  constructor(repository: NumberTriviaRepository) {
    this.repository = repository;
  }

  async call(params: NoParams): Promise<Either<Failure, NumberTrivia>> {
    return await this.repository.getRandomNumberTrivia();
  }
}
