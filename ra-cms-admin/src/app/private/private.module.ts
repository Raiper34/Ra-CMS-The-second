import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PrivateComponent} from './private.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RouterModule, Routes} from '@angular/router';
import {PrivateGuard} from './private.guard';
import {SharedModule} from '../shared/shared.module';
import {ArticleComponent} from './article/article.component';

const privateRoutes: Routes = [
  {
    path: 'private',
    component: PrivateComponent,
    canActivate: [PrivateGuard],
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'article', component: ArticleComponent},
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: '**', redirectTo: 'dashboard'},
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(
      privateRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    ),
  ],
  declarations: [PrivateComponent, DashboardComponent, ArticleComponent],
})
export class PrivateModule {
}
