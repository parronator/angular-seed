import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {exhaustMap, switchMap} from 'rxjs/operators';
import {NoParams} from '../../../../core/usecases/usecase';
import {TriviaGetRandomUsecase} from '../../domain/usecases/trivia_get_random_usecase';
import {TriviaGet, TriviaGetError, TriviaGetSuccess} from './trivia_actions';

@Injectable()
export class TriviaEffects {
  constructor(private actions$: Actions, private getRandom: TriviaGetRandomUsecase) {
  }

  get$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TriviaGet),
      switchMap(async () => {
        const response = await this.getRandom.call(new NoParams());
        let newAction;
        response.ifLeft((e) => newAction = TriviaGetError({error: e}))
          .map((n) => newAction = TriviaGetSuccess({trivia: n}));
        return newAction;
      })
    )
  );
}
