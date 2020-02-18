import {NumberTrivia} from '../entities/number_trivia';
import {Either} from 'purify-ts/Either';
import {Failure} from '../../../../core/error/failures';

export abstract class NumberTriviaRepository {
  abstract async getRandomNumberTrivia(): Promise<Either<Failure, NumberTrivia>>;
}
