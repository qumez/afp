import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder } from '@angular/forms';
import { User } from 'firebase';
import { Subscription } from 'rxjs';
import { SessionService } from '../../services/session.service';

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
  user: User;
  sub = new Subscription();

  constructor(
    private fb: FormBuilder,
    private auth: AngularFireAuth,
    private session: SessionService
  ) {}

  ngOnInit(): void {
    this.sub.add(
      this.loginFormGroup.valueChanges.subscribe((changes) => {
        this.loginDetails = changes;
      })
    );

    this.sub.add(
      this.auth.user.subscribe((user) => {
        this.user = user;
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

  async logOut() {
    this.auth.signOut().then(() => {
      this.session.setAuthToken(null);
    });
  }
}
