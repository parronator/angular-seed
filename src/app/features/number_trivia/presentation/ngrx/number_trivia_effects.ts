import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {NumberTriviaGet, NumberTriviaGetError, NumberTriviaGetSuccess} from './number_trivia_actions';
import {exhaustMap, switchMap} from 'rxjs/operators';
import {GetRandomNumberTriviaUsecase} from '../../domain/usecases/get_random_number_trivia_usecase';
import {NoParams} from '../../../../core/usecases/usecase';

@Injectable()
export class NumberTriviaEffects {
  constructor(private actions$: Actions, private getRandom: GetRandomNumberTriviaUsecase) {
  }

  get$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NumberTriviaGet),
      switchMap(async () => {
        const response = await this.getRandom.call(new NoParams());
        let newAction;
        response.ifLeft((e) => newAction = NumberTriviaGetError({error: e}))
          .map((n) => newAction = NumberTriviaGetSuccess({numberTrivia: n}));
        return newAction;
      })
    )
  );
}
