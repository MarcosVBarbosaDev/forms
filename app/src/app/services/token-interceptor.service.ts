import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  private readonly token = 'ptFoqK9MMxcMrP9MJaWchsDpjGmtCVYRg5RX0xkaemRHEJcWpKejLlXxiaj4E6xl'; 

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clona a requisição e adiciona o token no cabeçalho Authorization
    const authReq = req.clone({
      setHeaders: {
        Authorization: this.token
      }
    });

    return next.handle(authReq);
  }
}
