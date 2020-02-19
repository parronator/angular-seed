import {Trivia} from '../../domain/entities/trivia';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {ServerEmptyException, ServerException} from '../../../../core/error/exceptions';
import {Injectable} from '@angular/core';

export abstract class TriviaRemoteDataSource {
  async abstract getRandom(): Promise<Trivia>;
}

@Injectable()
export class TriviaRemoteDataSourceImpl implements TriviaRemoteDataSource {
  httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  static getUrl(path: string) {
    return `http://numbersapi.com${path}?json`;
  }

  async getRandom(): Promise<Trivia> {
    try {
      return await this.httpClient.get(TriviaRemoteDataSourceImpl.getUrl('/random'))
        .pipe(map((v: any) => new Trivia({text: v.text, num: v.number})))
        .toPromise();
    } catch (e) {
      if (e.status === 404) {
        throw new ServerEmptyException();
      } else {
        throw new ServerException();
      }
    }
  }
}
