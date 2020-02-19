import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {State} from './ngrx/app.reducers';
import {Trivia} from './features/trivia/domain/entities/trivia';
import {TriviaGet} from './features/trivia/presentation/ngrx/trivia_actions';
import {selectTrivia} from './features/trivia/presentation/ngrx/trivia_selectors';
import {TriviaService} from './features/trivia/presentation/ngrx/trivia.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  trivia$: Observable<Trivia>;

  constructor(private triviaService: TriviaService) {
  }

  ngOnInit() {
    this.triviaService.getRandomTrivia();
    this.trivia$ = this.triviaService.trivia$;
  }
}
