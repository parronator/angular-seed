import {Either} from 'purify-ts';
import {Failure} from '../../../../core/error/failures';
import {Trivia} from '../entities/trivia';

export abstract class TriviaRepository {
  async abstract getRandom(): Promise<Either<Failure, Trivia>>;
}
