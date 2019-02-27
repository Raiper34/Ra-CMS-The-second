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
import { SiteComponent } from './site/site.component';
import { MenuComponent } from './menu/menu.component';
import { MenuEditModalComponent } from './menu/menu-edit-modal/menu-edit-modal.component';
import { CategoryComponent } from './category/category.component';
import { CategoryEditModalComponent } from './category/category-edit-modal/category-edit-modal.component';

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
      {path: 'site', component: SiteComponent},
      {path: 'menu', component: MenuComponent},
      {path: 'category', component: CategoryComponent},
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
  declarations: [ProtectedComponent, DashboardComponent, ArticleComponent, FileComponent, ArticleEditComponent, SiteComponent, MenuComponent, MenuEditModalComponent, CategoryComponent, CategoryEditModalComponent],
})
export class ProtectedModule {
}
