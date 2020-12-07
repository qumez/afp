import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppUser } from 'src/app/data/models';
import {
  AppSessionState,
  SessionService,
} from '../../services/session.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  loginDetails: {
    username: string;
    password: string;
  } = {
    username: 'comes132@gmail.com',
    password: 'password',
  };
  loginFormGroup = this.fb.group({
    username: 'comes132@gmail.com',
    password: 'password',
  });
  sub = new Subscription();
  user: AppUser;
  constructor(private fb: FormBuilder, private session: SessionService) {}

  ngOnInit(): void {
    this.sub.add(
      this.loginFormGroup.valueChanges.subscribe((changes) => {
        this.loginDetails = changes;
      })
    );

    this.sub.add(
      this.session.stateChanged.subscribe((state: AppSessionState) => {
        this.user = state.user;
      })
    );
  }

  login() {
    this.session.signIn(this.loginDetails.username, this.loginDetails.password);
  }

  logOut() {
    this.session.signOut();
  }
}
