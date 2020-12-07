import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ObservableStore } from '@codewithdan/observable-store';
import * as firebase from 'firebase';
import { User } from 'firebase';
import { CookieService } from 'ngx-cookie-service';
import { from, of, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AppUser } from '../data/models';

export interface AppSessionState {
  user?: AppUser;
  refreshToken: string;
  sessionError?: string;
}

enum AppSessionStateEnum {
  userSet = 'USER_SET',
  refreshTokenSEt = 'TOKEN_SET',
  errorSet = 'ERROR_SET',
  signIn = 'SIGN_IN',
  signOut = 'SIGN_OUT',
}
@Injectable({
  providedIn: 'root',
})
export class SessionService extends ObservableStore<AppSessionState> {
  loggedInSubject: Subject<any>;
  constructor(private auth: AngularFireAuth, private cookies: CookieService) {
    super({ trackStateHistory: true });
    const initState: AppSessionState = {
      user: null,
      refreshToken: this.cookies.get('Authorization') || '',
      sessionError: null,
    };

    this.loggedInSubject = new Subject();
    this.auth.authState.subscribe(async (credential) => {
      console.log(credential);
      if (credential) {
        const state = this.getState();
        state.user = this.getFirebaseUserDetails(credential);
        state.refreshToken = await credential.getIdToken();
        this.cookies.set('Authorization', state.refreshToken);
        this.setState(state);
      }
    });
    this.setState(initState);
  }

  async signIn(email: string, password: string) {
    let res: firebase.auth.UserCredential;
    let token: string;
    try {
      res = await this.auth.signInWithEmailAndPassword(email, password);
      token = await res.user.getIdToken();
    } catch (ex) {
      console.warn(ex);
      token = '';
    } finally {
      const state = this.getState();
      state.refreshToken = token;
      state.user = res?.user ? this.getFirebaseUserDetails(res.user) : null;
      this.setState(state, AppSessionStateEnum.signIn);
    }
  }
  private getFirebaseUserDetails(user: User): AppUser {
    return {
      email: user.email,
      emailVerified: user.emailVerified,
      uid: user.uid,
      displayName: user.displayName || user.email,
    };
  }

  signOut() {
    from(this.auth.signOut())
      .pipe(
        catchError((err) => {
          console.error('Error in Signout', err);
          return of(null);
        }),
        tap(() => {
          this.setState(
            {
              user: null,
              refreshToken: '',
            },
            AppSessionStateEnum.signOut
          );
          this.cookies.delete('Authorization');
        })
      )
      .subscribe();
  }

  setSessionError(error: string) {
    const st = this.getState();
    st.sessionError = error;
    this.setState(st, AppSessionStateEnum.errorSet);
  }
}
