import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NbToastrService } from '@nebular/theme';
import { map, retry, catchError, timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  server: string = 'https://g1a.com.br/appPMO/_backend/';
  private token = 'ptFoqK9MMxcMrP9MJaWchsDpjGmtCVYRg5RX0xkaemRHEJcWpKejLlXxiaj4E6xl';

  constructor(private http: HttpClient, private toastr: NbToastrService) { }

  dadosAPI(dados: any, api: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
    };

    const url = this.server + api;

    return this.http.post(url, JSON.stringify(dados), httpOptions).pipe(
      map((res: any) => res),
      retry(3),
      timeout(5000),
      catchError((err: any): any => {
        if (err.name === 'TimeoutError') {
          this.showToast(
            'Ops!',
            'No momento o servidor de dados está com lentidão',
            'danger'
          );
        } else {
          this.showToast(
            'Ops!',
            'Estamos sem comunicação com o servidor de dados',
            'danger'
          );
        }
      })
    );
  }

  getAPI(table: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: this.token,
      }),
    };

    const url = this.server + table;

    return this.http.get(url, httpOptions).pipe(
      map((res: any) => res),
      retry(3),
      timeout(5000),
      catchError((err: any): any => {
        if (err.name === 'TimeoutError') {
          this.showToast(
            'Ops!',
            'No momento o servidor de dados está com lentidão',
            'danger'
          );
        } else {
          this.showToast(
            'Ops!',
            'Estamos sem comunicação com o servidor de dados',
            'danger'
          );
        }
      })
    );
  }

  postAPI(table: string, dados: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: this.token,
      }),
      body: dados,
    };

    const url = this.server + table;

    return this.http.post(url, httpOptions).pipe(
      map((res: any) => res),
      retry(3),
      timeout(5000),
      catchError((err: any): any => {
        if (err.name === 'TimeoutError') {
          this.showToast(
            'Ops!',
            'No momento o servidor de dados está com lentidão',
            'danger'
          );
        } else {
          this.showToast(
            'Ops!',
            'Estamos sem comunicação com o servidor de dados',
            'danger'
          );
        }
      })
    );
  }

  putAPI(api: string, dados: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: this.token,
      }),
      body: dados,
    };

    const url = this.server + api;

    return this.http.put(url, httpOptions).pipe(
      map((res: any) => res),
      retry(3),
      timeout(5000),
      catchError((err: any): any => {
        if (err.name === 'TimeoutError') {
          this.showToast(
            'Ops!',
            'No momento o servidor de dados está com lentidão',
            'danger'
          );
        } else {
          this.showToast(
            'Ops!',
            'Estamos sem comunicação com o servidor de dados',
            'danger'
          );
        }
      })
    );
  }

  deleteAPI(dados: any, api: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: this.token,
      }),
      body: dados,
    };

    const url = this.server + api;

    return this.http.delete(url, httpOptions).pipe(
      map((res: any) => res),
      retry(3),
      timeout(5000),
      catchError((err: any): any => {
        if (err.name === 'TimeoutError') {
          this.showToast(
            'Ops!',
            'No momento o servidor de dados está com lentidão',
            'danger'
          );
        } else {
          this.showToast(
            'Ops!',
            'Estamos sem comunicação com o servidor de dados',
            'danger'
          );
        }
      })
    );
  }

  showToast(title: string, message: string, status: any) {
    this.toastr.show(message, title, {
      status: status,
      duration: 8000,
    });
  }
}
