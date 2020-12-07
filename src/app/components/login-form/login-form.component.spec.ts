import { AngularFireAuth } from '@angular/fire/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { render, RenderResult } from '@testing-library/angular';
import { AngularFireAuthMock } from 'src/app/testing/mocks';
import { MaterialTestingModule } from '../../testing/material-testing.module';
import { LoginFormComponent } from './login-form.component';

const setup = async () => {
  return await render(LoginFormComponent, {
    imports: [MaterialTestingModule, ReactiveFormsModule],
    providers: [
      {
        provide: AngularFireAuth,
        useValue: AngularFireAuthMock,
      },
    ],
  });
};
describe('LoginFormComponent', () => {
  let comp: RenderResult<LoginFormComponent>;

  beforeEach(async () => {
    comp = await setup();
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });
});
