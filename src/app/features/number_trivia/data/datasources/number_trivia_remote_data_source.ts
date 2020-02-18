import {NumberTrivia} from '../../domain/entities/number_trivia';
import {HttpClient} from '@angular/common/http';
import {ServerEmptyException, ServerException} from '../../../../core/error/exceptions';
import {map} from 'rxjs/operators';
import {NumberTriviaHttpDTO} from '../models/number_trivia_http_dto';
import {Injectable} from '@angular/core';

export abstract class NumberTriviaRemoteDataSource {
  abstract async getRandomNumberTrivia(): Promise<NumberTrivia>;
}

@Injectable()
export class NumberTriviaRemoteDataSourceImpl implements NumberTriviaRemoteDataSource {
  httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  static getUrl(endpoint: string) {
    return `http://numbersapi.com${endpoint}?json`;
  }

  async getRandomNumberTrivia(): Promise<NumberTrivia> {
    try {
      return await this.httpClient.get(NumberTriviaRemoteDataSourceImpl.getUrl('/random')).pipe(
        map((v: any) => NumberTriviaHttpDTO.fromJson(v).toEntity())
      ).toPromise();
    } catch (e) {
      if (e.status === 404) {
        throw new ServerEmptyException();
      } else {
        throw new ServerException();
      }
    }
  }
}
