import {Component, Input, OnInit} from '@angular/core';
import {Trivia} from '../../../domain/entities/trivia';

@Component({
  selector: 'app-trivia-example',
  templateUrl: './trivia-example.component.html',
  styleUrls: ['./trivia-example.component.scss']
})
export class TriviaExampleComponent {
  @Input() trivia: Trivia;
}
