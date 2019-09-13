import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../shared/models/app-state";
import {ApiService} from "../../core/services/api.service";
import {MzToastService} from "ngx-materialize";
import {Observable, Subscription} from "rxjs";
import {Article} from "../../shared/models/article";
import {ARTICLE_COLLECTION_PIPE, ArticleCollectionActions} from "../../core/reducers/article-collection.reducer";
import {SITE_PIPE, SiteActions} from "../../core/reducers/site.reducer";

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit, OnDestroy {

  form: FormGroup;
  $selectData: Observable<Article[]>;
  $siteSubscription: Subscription;

  constructor(private fb: FormBuilder,
              private store: Store<AppState>,
              private api: ApiService,
              private toastService: MzToastService,) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      homepage_id: ['', Validators.required],
      not_found_id: ['', Validators.required],
    });

    this.$siteSubscription = this.store.pipe(
      select(SITE_PIPE),
    ).subscribe(data => this.form.patchValue({...data}));
    this.store.dispatch({type: SiteActions.GET_REQUEST});

    this.$selectData = this.store.pipe(
      select(ARTICLE_COLLECTION_PIPE),
    );
    this.store.dispatch({type: ArticleCollectionActions.GET_REQUEST});
  }

  submit(): void {
    this.api.post('site', this.form.value).subscribe(
      () => this.toastService.show('Site was updated successfully', 4000, 'green'),
      (error) => {
        console.log(error);
        this.toastService.show(error.error.message, 4000, 'red');
      });
  }

  ngOnDestroy(): void {
    this.$siteSubscription.unsubscribe();
  }

}
