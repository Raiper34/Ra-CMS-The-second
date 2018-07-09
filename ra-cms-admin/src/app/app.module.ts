import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import { SignComponent } from './public/sign/sign.component';
import {PublicModule} from './public/public.module';
import {PrivateModule} from './private/private.module';

const appRoutes: Routes = [
  { path: 'public', component: PublicModule },
  { path: 'private', component: PrivateModule },
  { path: '',   redirectTo: 'public/sign', pathMatch: 'full' },
  { path: '**', redirectTo: 'public/sign' },
];

@NgModule({
  declarations: [
    AppComponent,
    SignComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    ),
    PublicModule,
    PrivateModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
