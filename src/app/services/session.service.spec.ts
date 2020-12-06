import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireAuthMock } from '../testing/mocks';
import { SessionService } from './session.service';

describe('SessionService', () => {
  let service: SessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AngularFireAuth, useValue: AngularFireAuthMock }],
    });
    service = TestBed.inject(SessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sign in', async (done) => {
    service.authToken$.subscribe((res) => {
      if (res) {
        done();
      }
    });
    await service.signIn('email', 'password');
  });
});
