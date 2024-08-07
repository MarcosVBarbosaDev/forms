import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { sha256 } from 'js-sha256';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss'],
})
export class FormUserComponent {
  public loading: boolean = false;
  public table: string = 'usuarios/';
  metodo: string = 'POST';
  @Input() id: number = 0;

  public formulario: FormGroup = this._formBuilder.group({
    id_usuario: [this.id, [Validators.required]],
    email: [null, [Validators.required]],
    usuario: [null, [Validators.required]],
    senha: [null, [Validators.minLength(4)]],
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
    // this.loading = true;

    if (this.formulario.controls['senha'].value != '' && this.formulario.controls['senha'].value != null) {
      this.formulario.patchValue({
        senha: sha256(this.formulario.controls['senha'].value)
      })
    }
    let dados = this.formulario.value

    if (this.metodo == 'POST') {

      this._provider.postAPI(this.table, dados).subscribe(
        (data: any) => {
          if (data['status'] == 'success') {
            this._provider.showToast('OBA!', data['result'], 'success');
          } else if (data['error'] && data['error'].includes('1062 Duplicate entry')) {
            this._provider.showToast('OPS!', 'Erro de duplicidade de informação.', 'danger');
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

    let url = 'usuarios/?id=' + id;

    return this._provider.getAPI(url).subscribe(
      (data) => {
        // CARREGAR DADOS NA FORMULÁRIO
        if (data['status'] === 'success') {
          this.formulario.patchValue({
            id_usuario: data['result']['id_usuario'],
            usuario: data['result']['usuario'],
            acesso: data['result']['acesso'].toString(),
            email: data['result']['email'],
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

  close() {
    this._dialogRef.close();
  }
}

