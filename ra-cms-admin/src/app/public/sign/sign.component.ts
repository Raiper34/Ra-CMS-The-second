import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../core/services/api.service';
import {AuthService} from '../../core/services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MzToastService} from 'ngx-materialize';
import {Router} from '@angular/router';
import {CustomValidators} from "ngx-custom-validators";

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
      username: ['', [Validators.required, CustomValidators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  signInSubmit(): void {
    this.auth.login(this.signInForm.get('username').value, this.signInForm.get('password').value).subscribe(
      () => {
        this.toast.show('Login success!', 3000, 'green');
        this.router.navigate(['/protected']);
      },
      () => this.toast.show('Login failure!', 3000, 'red'),
    );
  }

}
