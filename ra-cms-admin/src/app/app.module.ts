import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {PublicModule} from './public/public.module';
import {PrivateModule} from './private/private.module';
import {SharedModule} from './shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {articleReducer} from './shared/reducers/article.reducer';
import {EffectsModule} from '@ngrx/effects';
import {ArticleEffects} from './shared/effects/article.effect';
import {TokenInterceptor} from './shared/services/token.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {UnauthorizedInterceptor} from './shared/services/unauthorized.interceptor';
import {articleCollectionReducer} from './shared/reducers/article-collection.reducer';
import {fileReducer} from './shared/reducers/file.reducer';
import {fileCollectionReducer} from './shared/reducers/file-collection.reducer';
import {userReducer} from './shared/reducers/user.reducer';
import {userCollectionReducer} from './shared/reducers/user-collection.reducer';
import {siteReducer} from './shared/reducers/site.reducer';
import {FileEffects} from './shared/effects/file.effect';
import {FileCollectionEffects} from './shared/effects/file-collection.effect';
import {UserEffects} from './shared/effects/user.effect';
import {UserCollectionEffect} from './shared/effects/user-collection.effect';
import {SiteEffects} from './shared/effects/site.effect';
import {ArticleCollectionEffects} from './shared/effects/article-collection.effect';

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
      articleCollection: articleCollectionReducer,
      file: fileReducer,
      fileCollection: fileCollectionReducer,
      user: userReducer,
      userCollection: userCollectionReducer,
      site: siteReducer,
    }),
    EffectsModule.forRoot([
      ArticleEffects,
      ArticleCollectionEffects,
      FileEffects,
      FileCollectionEffects,
      UserEffects,
      UserCollectionEffect,
      SiteEffects
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
