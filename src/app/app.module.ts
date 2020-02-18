import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {GetRandomNumberTriviaUsecase} from './features/number_trivia/domain/usecases/get_random_number_trivia_usecase';
import {NumberTriviaRepository} from './features/number_trivia/domain/repositories/number_trivia_repository';
import {NumberTriviaRepositoryImpl} from './features/number_trivia/data/repositories/number_trivia_repository_impl';
import {
  NumberTriviaRemoteDataSource,
  NumberTriviaRemoteDataSourceImpl
} from './features/number_trivia/data/datasources/number_trivia_remote_data_source';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {effects} from './ngrx/app.effects';
import {StoreModule} from '@ngrx/store';
import {reducers, metaReducers} from './ngrx/app.reducers';
import {NumberTriviaExampleComponent} from './features/number_trivia/presentation/components/number-trivia-example/number-trivia-example.component';

@NgModule({
  declarations: [
    AppComponent,
    NumberTriviaExampleComponent
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
    GetRandomNumberTriviaUsecase,
    {provide: NumberTriviaRepository, useClass: NumberTriviaRepositoryImpl},
    {provide: NumberTriviaRemoteDataSource, useClass: NumberTriviaRemoteDataSourceImpl}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
