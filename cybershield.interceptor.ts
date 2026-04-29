import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CyberShieldInterceptor implements HttpInterceptor {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Only run redirection logic if we are running in the browser
        if (isPlatformBrowser(this.platformId)) {
          if (error.status === 403 || error.status === 429) {
            const data = error.error;
            if (data && data.blocked && data.redirect) {
              // Create a trap state in history to prevent the user from navigating back
              window.history.replaceState({ cybershield_trap: true, redirect_url: data.redirect }, "");
              // Redirect to the CyberShield block page
              window.location.assign(data.redirect);
            }
          }
        }
        return throwError(() => error);
      })
    );
  }
}
