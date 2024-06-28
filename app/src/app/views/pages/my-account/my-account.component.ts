import { Component } from '@angular/core';
import { NbThemeService, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { LocalDataSource } from 'angular2-smart-table';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
})
export class MyAccountComponent {
  public user: any;

  public table: string;

  public loading: boolean = false;

  public source: LocalDataSource = new LocalDataSource();

  constructor(
    private _formBuilder: FormBuilder,
    private _themeService: NbThemeService,
    private _authService: NbAuthService,
    private _provider: ApiService,
    private _toastrService: NbToastrService
  ) {
    this._themeService.onThemeChange();

    this._authService
      .onTokenChange()
      .subscribe((token: NbAuthJWTToken | any) => {
        if (token.isValid()) {
          console.log();
          this.user = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable
        }
      });

    this.setForm(this.user.user_id);
  }

  public formulario: FormGroup = this._formBuilder.group({
    id_colaborador: [''],
    nome: [null, [Validators.required, Validators.maxLength(100)]],
    sexo: [null, [Validators.required]],
    cpf: [null, [Validators.minLength(11)]],
    contato_1: [null],
    contato_2: [null],
    email: [null, [Validators.required, Validators.email]],
  });

  setForm(id: number) {
    this.loading = true;
    this.source = new LocalDataSource();

    let url = 'rl_users_colaboradores/?id_user=' + id;

    return this._provider.getAPI(url).subscribe(
      (data) => {
        // CARREGAR DADOS NA TABELA
        if (data['status'] === 'success') {
          this.formulario.patchValue({
            id_colaborador: data['rows']['id_colaborador'],
            nome: data['rows']['nome'],
            cpf: data['rows']['cpf'],
            sexo: data['rows']['sexo'].toString(),
            contato_1: data['rows']['contato_1'],
            contato_2: data['rows']['contato_2'],
            email: data['rows']['email'],
          });
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
      () => {}
    );
  }

  onSubmit() {
    let dados = {
      form: this.formulario.value,
    };

    this.table = 'colaboradores/';

    this._provider.putAPI(this.table, dados).subscribe(
      (data: any) => {
        if (data['status'] == 'success') {
          this._provider.showToast('OBA!', data['result'], 'success');
        } else {
          this._provider.showToast('OPS!', data['result'], 'danger');
        }
      },
      (error: any) => {
        this._toastrService.show(error, 'Ops!', {
          status: 'danger',
          duration: 8000,
        });
      },
      () => {}
    );
  }

  query_cpf(cpf: any) {
    let url = 'colaboradores/?cpf=' + cpf;

    return this._provider.getAPI(url).subscribe(
      (data) => {
        if (data['rows']) {
          this._provider.showToast('CPF já existe', 'Falha', 'danger');
          this.setForm(this.user.user_id);
        }
      },
      (error: any) => {
        this._toastrService.show(error, 'Ops!', {
          status: 'danger',
          duration: 8000,
        });
      },
      () => {}
    );
  }
}
