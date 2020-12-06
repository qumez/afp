import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  authToken$ = new BehaviorSubject<string>(null);
  constructor(private auth: AngularFireAuth) {}

  setAuthToken(token: string) {
    this.authToken$.next(token);
  }

  async signIn(email: string, password: string) {
    let res: firebase.auth.UserCredential;
    let token: string;
    try {
      res = await this.auth.signInWithEmailAndPassword(email, password);
      token = await res.user.getIdToken();
      this.authToken$.next(token);
    } catch (ex) {
      console.error(ex);
      this.authToken$.next(null);
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
