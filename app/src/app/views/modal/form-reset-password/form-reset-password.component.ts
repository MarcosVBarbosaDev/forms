import { Component, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { ApiService } from 'src/app/services/api.service';

import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-form-reset-password',
  templateUrl: './form-reset-password.component.html',
})
export class FormResetPasswordComponent {

  showMessages: any = {};
  errors: any[] = [];
  submitted = false;
  redirectDelay: number;
  strategy: string;
  messages: string[];
  user: any = {};
  public table: string = 'usuarios/';
  public loading: boolean = false;
  public dados: any;

  @Input() id: any;
  constructor(
    private _toastrService: NbToastrService,
    private _provider: ApiService,
    protected _dialogRef: NbDialogRef<''>
  ) { }

  ngOnInit(): void {
    this.getDados(this.id);
  }

  getDados(id: number) {
    this.loading = true;
    let url = 'usuarios/?id=' + id;

    this._provider.getAPI(url).subscribe(
      (data) => {
        if (data['status'] === 'success') {
          this.dados = data['result'];
        } else {
          this._toastrService.show(data, 'Ops!', {
            status: 'danger',
            duration: 8000,
          });
        }
      },
      (error: any) => {
        this._toastrService.show(error, 'Ops!', {
          status: 'danger',
          duration: 8000,
        });
      },
      () => { this.loading = false; }
    );
  }

  calcularHashSHA256(senha: string): string {
    const hash = CryptoJS.SHA256(senha).toString(CryptoJS.enc.Hex);
    return hash;
  }

  resetPass() {

    this.dados['senha'] = this.calcularHashSHA256(this.user.senha);


    this._provider.putAPI(this.table, this.dados).subscribe(
      (data: any) => {
        if (data['status'] === 'success') {
          this._provider.showToast('Sucesso!', data['result'], 'success');
          // Redirecionar ou exibir mensagem de sucesso
        } else {
          this._provider.showToast('Ops!', data['result'], 'danger');
        }
      },
      (error: any) => {
        this._provider.showToast('Erro!', 'Erro ao processar a requisição.', 'danger');
      }
    );
  }


  getConfigValue(key: string) {
    return {
      required: true,
      minLength: 4,
      maxLength: 50
    };
  }

  isPasswordConfirmed(): boolean {

    return this.user.senha === this.user.confirmaSenha;
  }

  close() {
    this._dialogRef.close();
  }

}
