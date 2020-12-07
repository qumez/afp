import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ObservableStore } from '@codewithdan/observable-store';
import { CookieService } from 'ngx-cookie-service';
import { from, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AppUser } from '../data/models';

export interface AppSessionState {
  user?: AppUser;
  refreshToken: string;
}
@Injectable({
  providedIn: 'root',
})
export class SessionService extends ObservableStore<AppSessionState> {
  constructor(private auth: AngularFireAuth, private cookies: CookieService) {
    super({ trackStateHistory: true });
    const initState: AppSessionState = {
      user: null,
      refreshToken: this.cookies.get('Authorization') || '',
    };
    this.setState(initState);
  }

  async signIn(email: string, password: string) {
    let res: firebase.auth.UserCredential;
    let token: string;

    try {
      res = await this.auth.signInWithEmailAndPassword(email, password);
      token = await res.user.getIdToken();
      console.warn(token);
    } catch (ex) {
      token = '';
    } finally {
      const state = this.getState();
      state.refreshToken = token;
      state.user = {
        email: res.user.email,
        emailVerified: res.user.emailVerified,
        uid: res.user.uid,
        displayName: res.user.displayName || res.user.email,
      };
      this.setState(state);
    }
  }

  signOut() {
    from(this.auth.signOut())
      .pipe(
        catchError((err) => {
          console.error('Error in Signout', err);
          return of(null);
        }),
        tap(() => {
          this.setState({
            user: null,
            refreshToken: '',
          });
          this.cookies.delete('Authorization');
        })
      )
      .subscribe();
  }
}
