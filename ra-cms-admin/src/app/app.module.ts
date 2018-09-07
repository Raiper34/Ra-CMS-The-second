import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import { SignComponent } from './public/sign/sign.component';
import {PublicModule} from './public/public.module';
import {PrivateModule} from './private/private.module';
import {SharedModule} from './shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {articleReducer} from './shared/reducers/article.reducer';
import {EffectsModule} from '@ngrx/effects';
import {ArticleEffects} from './shared/effects/article.effect';
import {TokenInterceptor} from './shared/services/token.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthService} from './shared/services/auth.service';
import {ApiService} from './shared/services/api.service';
import {UnauthorizedInterceptor} from './shared/services/unauthorized.interceptor';

const appRoutes: Routes = [
  { path: 'public', component: PublicModule },
  { path: 'private', component: PrivateModule },
  { path: '',   redirectTo: 'public/sign', pathMatch: 'full' },
  { path: '**', redirectTo: 'public/sign' },
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    ),
    StoreModule.forRoot({
      article: articleReducer,
    }),
    EffectsModule.forRoot([
      ArticleEffects,
    ]),
    PublicModule,
    PrivateModule,
    SharedModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
