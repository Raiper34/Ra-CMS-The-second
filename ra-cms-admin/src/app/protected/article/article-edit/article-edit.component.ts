import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../core/services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MzToastService} from 'ngx-materialize';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../shared/models/app-state';
import {articleActions} from '../../../core/reducers/article.reducer';
import * as v from 'voca';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss']
})
export class ArticleEditComponent implements OnInit {

  form: FormGroup;
  id: number;

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
      keywords: [],
    });
    this.route.params.subscribe(params => {
      this.id = params.id;
      if (params.id) {
        this.store.dispatch({type: articleActions.GET_REQUEST, payload: params.id});
      }
    });
    if (this.id) { // TODO check it !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      this.store.pipe(
        select('article'),
      ).subscribe(data => {
        this.form.patchValue({
          ...data,
          article_content: data ? data.content : '',
          keywords: data ? data.keywords.split(',').map(item => ({tag: v.trim(item)})) : [],
        });
      });
    }
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
    this.api.put('articles', this.id, data).subscribe(() => {
        this.toastService.show(`Article ${this.form.get('title').value} was edited successful`, 4000, 'green');
        this.router.navigate(['/protected/article']);
      },
      (error) => {
        console.log(error);
        this.toastService.show(error.message, 4000, 'red');
      });
  }

  private create(data: any): void {
    this.api.post('articles', data).subscribe(() => {
        this.toastService.show(`Article ${this.form.get('title').value} was created successful`, 4000, 'green');
        this.router.navigate(['/protected/article']);
      },
      (error) => {
        console.log(error);
        this.toastService.show(error.message, 4000, 'red');
      });
  }

}