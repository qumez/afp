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
    password: 'socom2owns',
  };
  loginFormGroup = this.fb.group({
    username: 'comes132@gmail.com',
    password: 'socom2owns',
  });
  user: AppUser;
  sub = new Subscription();

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

  async login() {
    const loginResponse = await this.session.signIn(
      this.loginDetails.username,
      this.loginDetails.password
    );
    console.log(loginResponse);
  }

  logOut() {
    this.session.signOut();
  }
}
