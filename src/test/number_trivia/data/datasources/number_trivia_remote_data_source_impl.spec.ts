import {
  NumberTriviaRemoteDataSource,
  NumberTriviaRemoteDataSourceImpl
} from '../../../../app/features/number_trivia/data/datasources/number_trivia_remote_data_source';
import {anyString, instance, mock, verify, when} from 'ts-mockito';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {of, throwError} from 'rxjs';
import {ServerEmptyException, ServerException} from '../../../../app/core/error/exceptions';
import {NumberTrivia} from '../../../../app/features/number_trivia/domain/entities/number_trivia';

const MockHttpClient = mock<HttpClient>();

describe('NumberTriviaRemoteDataSourceImpl', () => {
  let mockHttpClient: HttpClient;
  let dataSource: NumberTriviaRemoteDataSource;

  beforeEach(() => {
    mockHttpClient = instance(MockHttpClient);
    dataSource = new NumberTriviaRemoteDataSourceImpl(mockHttpClient);
  });

  afterEach(() => {
    mockHttpClient = null;
    dataSource = null;
  });

  it('should perform a GET request on a URL with number \n' +
    '  being the endpoint and with application/json header ', async () => {
    when(MockHttpClient.get(anyString())).thenReturn(of({}));
    const call = dataSource.getRandomNumberTrivia();
    await expectAsync(call).toBeResolved();
    verify(MockHttpClient.get(NumberTriviaRemoteDataSourceImpl.getUrl('/random'))).called();
  });

  it('should return NumberTrivia when response is 200 (success)', async () => {
    when(MockHttpClient.get(anyString())).thenReturn(of({text: '', num: 1}));
    const call = dataSource.getRandomNumberTrivia();
    await expectAsync(call).toBeResolvedTo(jasmine.any(NumberTrivia));
  });

  it('should throw a server exception when response code is 404', async () => {
    when(MockHttpClient.get(anyString())).thenReturn(throwError(new HttpErrorResponse({status: 404})));
    const call = dataSource.getRandomNumberTrivia();
    await expectAsync(call).toBeRejectedWith(jasmine.any(ServerEmptyException));
  });

  it('should throw a server exception when response code is error', async () => {
    when(MockHttpClient.get(anyString())).thenReturn(throwError(new HttpErrorResponse({status: 500})));
    const call = dataSource.getRandomNumberTrivia();
    await expectAsync(call).toBeRejectedWith(jasmine.any(ServerException));
  });
});
