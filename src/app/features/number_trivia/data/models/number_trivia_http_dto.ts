import {NumberTrivia} from '../../domain/entities/number_trivia';

export class NumberTriviaHttpDTO extends NumberTrivia {
  text: string;
  num: number;

  constructor({text, num}) {
    super({text, num});
  }

  static fromJson(json: any) {
    return new NumberTriviaHttpDTO({text: json.text, num: json.number});
  }

  toEntity(): NumberTrivia {
    return new NumberTrivia({text: this.text, num: this.num});
  }
}
