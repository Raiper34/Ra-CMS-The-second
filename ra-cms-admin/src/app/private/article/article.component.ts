import { Component, OnInit } from '@angular/core';
import {AppState} from "../../shared/models/app-state";
import {select, Store} from "@ngrx/store";
import {articleCollectionActions} from "../../shared/reducers/article-collection.reducer";
import {Observable} from "rxjs/internal/Observable";
import {Article} from "../../shared/models/article";
import {ApiService} from "../../shared/services/api.service";
import {MzToastService} from "ngx-materialize";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  articleCollection$: Observable<Article[]>;

  constructor(private store: Store<AppState>,
              private api: ApiService,
              private toastService: MzToastService,) { }

  ngOnInit(): void {
    this.articleCollection$ = this.store.pipe(select('articleCollection'));
    this.store.dispatch({ type: articleCollectionActions.GET_REQUEST});
  }

  preview(id: number): void {
    console.log('TODO');
  }

  delete(id: number): void {
    this.api.delete('articles', id).subscribe(() => {
      this.store.dispatch({ type: articleCollectionActions.GET_REQUEST});
      this.toastService.show('Deletion successful', 4000, 'green');
    }, (error) => {
      console.log(error);
      this.toastService.show(error.message, 4000, 'red');
    });
  }

}
