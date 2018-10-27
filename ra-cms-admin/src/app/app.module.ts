import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {PublicModule} from './public/public.module';
import {ProtectedModule} from './protected/protected.module';
import {SharedModule} from './shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {articleReducer} from './core/reducers/article.reducer';
import {EffectsModule} from '@ngrx/effects';
import {ArticleEffects} from './core/effects/article.effect';
import {TokenInterceptor} from './core/interceptors/token.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {UnauthorizedInterceptor} from './core/interceptors/unauthorized.interceptor';
import {articleCollectionReducer} from './core/reducers/article-collection.reducer';
import {fileReducer} from './core/reducers/file.reducer';
import {fileCollectionReducer} from './core/reducers/file-collection.reducer';
import {userReducer} from './core/reducers/user.reducer';
import {userCollectionReducer} from './core/reducers/user-collection.reducer';
import {siteReducer} from './core/reducers/site.reducer';
import {FileEffects} from './core/effects/file.effect';
import {FileCollectionEffects} from './core/effects/file-collection.effect';
import {UserEffects} from './core/effects/user.effect';
import {UserCollectionEffect} from './core/effects/user-collection.effect';
import {SiteEffects} from './core/effects/site.effect';
import {ArticleCollectionEffects} from './core/effects/article-collection.effect';
import {CoreModule} from './core/core.module';

const appRoutes: Routes = [
  { path: 'public', component: PublicModule },
  { path: 'protected', component: ProtectedModule },
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
    ProtectedModule,
    SharedModule,
    CoreModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
