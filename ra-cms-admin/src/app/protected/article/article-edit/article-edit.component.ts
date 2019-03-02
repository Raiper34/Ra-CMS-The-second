import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiEndpointEnum, ApiService} from '../../../core/services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MzToastService} from 'ngx-materialize';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../shared/models/app-state';
import {ARTICLE_PIPE, ArticleActions} from '../../../core/reducers/article.reducer';
import * as v from 'voca';
import {Observable} from "rxjs";
import {Category} from "../../../shared/models/category";
import {CATEGORY_COLLECTION_PIPE, CategoryCollectionActions} from "../../../core/reducers/category-collection.reducer";

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss']
})
export class ArticleEditComponent implements OnInit {

  form: FormGroup;
  id: number;
  $categories: Observable<Category>;

  constructor(private fb: FormBuilder,
              private api: ApiService,
              private router: Router,
              private toastService: MzToastService,
              private store: Store<AppState>,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      article_content: '',
      url: '',
      description: '',
      keywords: '',
      category_id: null,
    });
    this.route.params.subscribe(params => {
      this.id = params.id;
      if (params.id) {
        this.store.dispatch({type: ArticleActions.GET_REQUEST, payload: params.id});
      }
    });
    if (this.id) { // TODO check it !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      this.store.pipe(
        select(ARTICLE_PIPE),
      ).subscribe(data => {
        this.form.patchValue({
          ...data,
          article_content: data ? data.content : '',
          keywords: data ? data.keywords.split(',').map(item => ({tag: v.trim(item)})) : [],
        });
      });
    }
    this.$categories = this.store.pipe(select(CATEGORY_COLLECTION_PIPE));
    this.store.dispatch({type: CategoryCollectionActions.GET_REQUEST});
  }

  submit(): void {
    const data = {
      ...this.form.value,
      keywords: !this.form.get('keywords').value ?
        [] :
        (this.form.get('keywords').value as Materialize.ChipDataObject[]).reduce((acc, curr) => `${acc} ${curr.tag},`, '')
    };
    if (this.id) {
      this.edit(data);
    } else {
      this.create(data);
    }
  }

  private edit(data: any): void {
    this.api.put(ApiEndpointEnum.articles, this.id, data).subscribe(() => {
        this.toastService.show(`Article ${this.form.get('title').value} was edited successful`, 4000, 'green');
        this.router.navigate(['/protected/article']);
      },
      (error) => {
        console.log(error);
        this.toastService.show(error.error.message, 4000, 'red');
      });
  }

  private create(data: any): void {
    this.api.post(ApiEndpointEnum.articles, data).subscribe(() => {
        this.toastService.show(`Article ${this.form.get('title').value} was created successful`, 4000, 'green');
        this.router.navigate(['/protected/article']);
      },
      (error) => {
        console.log(error);
        this.toastService.show(error.error.message, 4000, 'red');
      });
  }

}
