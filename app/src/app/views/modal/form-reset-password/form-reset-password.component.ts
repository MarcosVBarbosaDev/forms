import { Component, Input } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { ApiService } from 'src/app/services/api.service';

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
  ) { }

  ngOnInit(): void {
    this.getDados(this.id);
  }

  getDados(id: number) {
    this.loading = true;
    let url = 'usuarios/?fk_colaborador=' + id;

    this._provider.getAPI(url).subscribe(
      (data) => {
        if (data['status'] === 'success') {
          this.dados = data['result'][0];
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

  resetPass() {

    this.dados['senha'] = this.user.senha;

    console.log(this.dados);
    return

    let dados = {
      form: {
        nova_senha: this.user.senha,
      }
    };

    this._provider.putAPI(this.table, dados).subscribe(
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

  close() { }

}
