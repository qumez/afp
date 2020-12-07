import { BehaviorSubject } from 'rxjs';

export const AngularFireAuthMock = {
  user: new BehaviorSubject<any>({}),
  signInWithEmailAndPassword(email: string, password: string) {
    return {
      credential: {},
      user: {
        getIdToken: () => {
          return 'I am a token!';
        },
      },
    };
  },
  authState: new BehaviorSubject<any>({
    getIdToken: () => {},
  }),
};
