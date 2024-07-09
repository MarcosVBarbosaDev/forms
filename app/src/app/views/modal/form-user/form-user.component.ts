import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss'],
})
export class FormUserComponent {
  public loading: boolean = false;
  public table: string = 'users/';
  metodo: string = 'POST';
  @Input() id: number = 0;

  public formulario: FormGroup = this._formBuilder.group({
    id_usuario: [this.id, [Validators.required]],
    email: [null, [Validators.required]],
    acesso: [null, [Validators.required]],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _provider: ApiService,
    protected _dialogRef: NbDialogRef<''>
  ) {

  }

  ngOnInit(): void {
    // CARREGA CADASTRO
    if (this.id > 0) {
      this.setForm(this.id);
    }
  }

  onSubmit() {
    // Temporariamente habilitar o campo desativado
    this.formulario.get('password')?.enable();

    let dados = {
      form: this.formulario.value,
    };

    // Reverter o campo para seu estado desativado
    this.formulario.get('password')?.disable();

    this.loading = true;

    if (this.metodo == 'POST') {
      this._provider.postAPI(this.table, dados).subscribe(
        (data: any) => {
          if (data['status'] == 'success') {
            this._provider.showToast('OBA!', data['result'], 'success');
          } else {
            this._provider.showToast('OPS!', data['result'], 'danger');
          }
        },
        (error: any) => {
          this.loading = false;
        },
        () => {
          this.loading = false;
          this._dialogRef.close('update');
        }
      );
    } else {
      this._provider.putAPI(this.table, dados).subscribe(
        (data: any) => {
          if (data['status'] == 'success') {
            this._provider.showToast('OBA!', data['result'], 'success');
          } else {
            this._provider.showToast('OPS!', data['result'], 'danger');
          }
        },
        (error: any) => {
          this.loading = false;
        },
        () => {
          this.loading = false;
          this._dialogRef.close('update');
        }
      );
    }
  }

  setForm(id: number) {
    this.loading = true;

    let url = 'users/?id_user=' + id;

    return this._provider.getAPI(url).subscribe(
      (data) => {
        // CARREGAR DADOS NA FORMULÁRIO
        if (data['status'] === 'success') {
          this.formulario.patchValue({
            id_user: data['rows']['id_user'],
            name: data['rows']['name'],
            password: data['rows']['password'],
            nivel: data['rows']['nivel'].toString(),
          });
        } else {
          this._provider.showToast('OPS!', data['result'], 'danger');
        }
      },
      (error: any) => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  geraPassord(): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charsLength = chars.length;
    let password = '';

    for (let i = 0; i < 6; i++) {
      password += chars[Math.floor(Math.random() * charsLength)];
    }

    return password;
  }

  query_email(email: any) {
    if (email) {
      let url = 'usuarios/?email=' + email;

      return this._provider.getAPI(url).subscribe(
        (data) => {
          if (data['status'] == 'success') {
            if (this.metodo == 'POST') {
              this.formulario.controls['email'].setValue('');
              this._provider.showToast('E-mail já existe', 'Falha', 'danger');
            } else {
              this._provider.showToast('E-mail já existe', 'Falha', 'danger');
              this.setForm(this.id);
            }
          }
        },
        (error: any) => {
          console.log('erro' + error);
        },
        () => { }
      );
    } else {
      return
    }
  }

  close() {
    this._dialogRef.close();
  }
}
