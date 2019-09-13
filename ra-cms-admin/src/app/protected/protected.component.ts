import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../shared/models/app-state';
import {USER_PIPE, UserActions} from '../core/reducers/user.reducer';
import {Observable} from 'rxjs';
import {User} from '../shared/models/user';
import {AuthService} from '../core/services/auth.service';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-private',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.css']
})
export class ProtectedComponent implements OnInit {

  $user: Observable<User>;

  constructor(private store: Store<AppState>,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.$user = this.store.pipe(
      select(USER_PIPE)
    );
    this.store.dispatch({type: UserActions.GET_REQUEST});
  }

  logout($event: MouseEvent): void {
    $event.preventDefault();
    this.authService.clearToken();
    this.router.navigate(['/public/login']);
  }

  preview(): void {
    window.open(`${environment.publicUrl}`, '_blank');
  }

}
