import { BehaviorSubject } from 'rxjs';

export const AuthServiceMock = {
  user: new BehaviorSubject<any>({}),
};
