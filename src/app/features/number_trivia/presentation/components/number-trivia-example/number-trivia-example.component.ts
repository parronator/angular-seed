import {Component, Input, OnInit} from '@angular/core';
import {NumberTrivia} from '../../../domain/entities/number_trivia';

@Component({
  selector: 'app-number-trivia-example',
  templateUrl: './number-trivia-example.component.html',
  styleUrls: ['./number-trivia-example.component.scss']
})
export class NumberTriviaExampleComponent implements OnInit {
  @Input() numberTrivia: NumberTrivia;
  @Input() error: any;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.numberTrivia);
  }

}
