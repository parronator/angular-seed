import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {effects} from './ngrx/app.effects';
import {StoreModule} from '@ngrx/store';
import {reducers, metaReducers} from './ngrx/app.reducers';
import {TriviaExampleComponent} from './features/trivia/presentation/components/trivia-example/trivia-example.component';
import {TriviaGetRandomUsecase} from './features/trivia/domain/usecases/trivia_get_random_usecase';
import {TriviaRepository} from './features/trivia/domain/repositories/trivia_repository';
import {TriviaRepositoryImpl} from './features/trivia/data/repositories/trivia_repository_impl';
import {TriviaRemoteDataSource, TriviaRemoteDataSourceImpl} from './features/trivia/data/datasources/trivia_remote_data_source';

@NgModule({
  declarations: [
    AppComponent,
    TriviaExampleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    EffectsModule.forRoot(effects),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
    TriviaGetRandomUsecase,
    {provide: TriviaRepository, useClass: TriviaRepositoryImpl},
    {provide: TriviaRemoteDataSource, useClass: TriviaRemoteDataSourceImpl},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
