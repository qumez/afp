import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, take, tap } from 'rxjs/operators';
import { SessionService } from '../services/session.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private session: SessionService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.session.stateChanged.pipe(
      take(1),
      switchMap((state) => {
        const token = state.refreshToken;
        if (token) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
        }
        return next.handle(request).pipe(
          catchError((err) => {
            return of(err);
          }),
          tap((err: any) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                return;
              }
              this.session.signOut();
            }
          })
        );
      })
    );
  }
}
