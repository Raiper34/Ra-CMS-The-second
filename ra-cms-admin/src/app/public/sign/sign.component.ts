import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../shared/services/api.service';
import {AuthService} from '../../shared/services/auth.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MzToastService} from 'ngx-materialize';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit {

  signInForm: FormGroup;

  constructor(private api: ApiService,
              private auth: AuthService,
              private fb: FormBuilder,
              private toast: MzToastService,
              private router: Router,
  ) {
    this.signInForm = this.fb.group({
      username: '',
      password: '',
    });
  }

  ngOnInit() {
  }

  signInSubmit(): void {
    this.auth.login(this.signInForm.get('username').value, this.signInForm.get('password').value).subscribe(
      () => {
        this.toast.show('Login success!', 3000, 'green');
        this.router.navigate(['/private']);
      },
      () => this.toast.show('Login failure!', 3000, 'red'),
    );
  }

}
