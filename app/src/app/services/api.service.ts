import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NbToastrService } from '@nebular/theme';
import { map, retry, catchError, timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient, private toastr: NbToastrService) { }

  private _backend: string = "https://g1a.com.br/appPMO/_backend/"
  private _httpoptions: any = {
    headers: new HttpHeaders({
      'Authorization': 'ptFoqK9MMxcMrP9MJaWchsDpjGmtCVYRg5RX0xkaemRHEJcWpKejLlXxiaj4E6xl',
      'Content-Type': 'application/json'
    })
  };

  getAPI(path: string) {

    const url = this._backend + path;

    return this.http.get(url, this._httpoptions).pipe(
      map((res: any) => res),
      retry(1),
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

          console.log(err)
        }
      })
    );
  }

  postAPI(path: string, dados: any) {

    const url = this._backend + path;

    return this.http.post(url, JSON.stringify(dados), this._httpoptions).pipe(
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

    const url = this._backend + api;

    return this.http.put(url, JSON.stringify(dados), this._httpoptions).pipe(
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

  deleteAPI(where: any, api: any) {

    const url = this._backend + api + where;

    return this.http.delete(url, this._httpoptions).pipe(
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
