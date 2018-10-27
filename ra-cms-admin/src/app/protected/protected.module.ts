import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProtectedComponent} from './protected.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RouterModule, Routes} from '@angular/router';
import {ProtectedGuard} from './protected.guard';
import {SharedModule} from '../shared/shared.module';
import {ArticleComponent} from './article/article.component';
import { FileComponent } from './file/file.component';
import { ArticleEditComponent } from './article/article-edit/article-edit.component';

const privateRoutes: Routes = [
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [ProtectedGuard],
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {
        path: 'article',
        children: [
          {path: '', component: ArticleComponent},
          {path: 'create', component: ArticleEditComponent},
          {path: 'edit/:id', component: ArticleEditComponent},
        ]
      },
      {path: 'file', component: FileComponent},
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
  declarations: [ProtectedComponent, DashboardComponent, ArticleComponent, FileComponent, ArticleEditComponent],
})
export class ProtectedModule {
}
