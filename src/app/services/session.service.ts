import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  authToken$ = new BehaviorSubject<string>(null);
  constructor(private auth: AngularFireAuth, private cookies: CookieService) {
    this.authToken$.next(this.cookies.get('Authorization'));
  }

  setAuthToken(token: string) {
    this.authToken$.next(token);
  }

  async signIn(email: string, password: string) {
    let res: firebase.auth.UserCredential;
    let token: string;
    try {
      res = await this.auth.signInWithEmailAndPassword(email, password);
      token = await res.user.getIdToken();
    } catch (ex) {
      console.error(ex);
      token = null;
    } finally {
      this.authToken$.next(token);
      this.cookies.set('Authorization', token);
    }
  }

  signOut() {
    this.auth
      .signOut()
      .then((res) => {
        console.log('SignOut successful: ', res);
      })
      .catch((err) => {
        console.error('Error in SignOut: ', err);
      })
      .finally(() => {
        this.authToken$.next(null);
      });
  }
}
