import {Either, Left, Right} from 'purify-ts/Either';
import {Failure} from '../error/failures';

export abstract class UseCase<Type, Params> {
  abstract async call(params: Params): Promise<Either<Failure, Type>>;
}

export class NoParams {
}
