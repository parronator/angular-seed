import {
  TriviaRemoteDataSource,
  TriviaRemoteDataSourceImpl
} from '../../../../app/features/trivia/data/datasources/trivia_remote_data_source';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {anyString, instance, mock, verify, when} from 'ts-mockito';
import {of, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ServerEmptyException, ServerException} from '../../../../app/core/error/exceptions';

const MockHttpClient = mock<HttpClient>();

describe('TriviaRemoteDataSource', () => {
  let dataSource: TriviaRemoteDataSource;
  let httpClient: HttpClient;

  beforeEach(() => {
    httpClient = instance(MockHttpClient);
    dataSource = new TriviaRemoteDataSourceImpl(httpClient);
  });

  afterEach(() => {
    httpClient = null;
    dataSource = null;
  });

  it('should return trivia when call is success', async () => {
    when(MockHttpClient.get(anyString())).thenReturn(of({}));
    const call = dataSource.getRandom();
    await expectAsync(call).toBeResolved();
  });

  it('should call to the proper url', async () => {
    when(MockHttpClient.get(anyString())).thenReturn(of({}));
    const call = dataSource.getRandom();
    await expectAsync(call).toBeResolved();
    verify(MockHttpClient.get(TriviaRemoteDataSourceImpl.getUrl('/random'))).called();
  });

  it('should throw ServerEmptyException on http error 404', async () => {
    when(MockHttpClient.get(anyString())).thenReturn(throwError(new HttpErrorResponse({status: 404})));
    const call = dataSource.getRandom();
    await expectAsync(call).toBeRejectedWith(jasmine.any(ServerEmptyException));
  });

  it('should throw ServerException on http error', async () => {
    when(MockHttpClient.get(anyString())).thenReturn(throwError(new HttpErrorResponse({status: 500})));
    const call = dataSource.getRandom();
    await expectAsync(call).toBeRejectedWith(jasmine.any(ServerException));
  });
});
