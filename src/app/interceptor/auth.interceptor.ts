import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, Observable, switchMap, tap, throwError} from "rxjs";
import {TokenService} from "../service/token/token.service";
import {UserService} from "../service/user/user.service";

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isRefreshing = false;

  constructor(private tokenService: TokenService, private userService: UserService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
    let authReq = req;
    const token = this.tokenService.getToken();
    if (token != null) {
      authReq = this.addJwtTokenHeader(req, token);
    }

    return next.handle(authReq).pipe(
      tap((response: HttpEvent<any>) => {
        if (response instanceof HttpResponse) {
          if (
            (response.url?.includes("login")
              || response.url?.includes("register")
              || response.url?.includes("refreshtoken"))
            && response.headers.has(TOKEN_HEADER_KEY)) {
            this.tokenService.setToken(response.headers.get(TOKEN_HEADER_KEY)!);
          }
        }
      }),
      catchError(error => {
        if (error instanceof HttpErrorResponse && !authReq.url.includes('login') && error.status === 401) {
          return this.handle401Error(authReq, next);
        }

        return throwError(error);
      }));
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      const token = this.tokenService.getToken();

      if (token)
        return this.userService.refreshToken().pipe(
          switchMap(() => {
            this.isRefreshing = false;

            return next.handle(this.addJwtTokenHeader(request, this.tokenService.getToken()!));
          }),
          catchError((err) => {
            this.isRefreshing = false;

            this.userService.logout();
            return throwError(err);
          })
        );

      this.isRefreshing = false;
    }

    return throwError(() => 'JWT token not present');
  }


  private addJwtTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)});
  }
}

export const authInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
];
