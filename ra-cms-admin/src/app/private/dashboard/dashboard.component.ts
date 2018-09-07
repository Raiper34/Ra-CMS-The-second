import { Component, OnInit } from '@angular/core';
import {AppState} from '../../shared/models/app-state';
import {select, Store} from '@ngrx/store';
import {articleActions} from '../../shared/reducers/article.reducer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private store: Store<AppState>) {
    this.store.pipe(select('article')).subscribe((data) => console.log(data));
    this.store.dispatch({ type: articleActions.GET_REQUEST});
  }

  ngOnInit() {
  }

}
