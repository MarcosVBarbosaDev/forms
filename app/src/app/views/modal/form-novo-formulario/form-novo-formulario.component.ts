import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-form-novo-formulario',
  templateUrl: './form-novo-formulario.component.html',
  styleUrls: ['./form-novo-formulario.component.scss']
})
export class FormNovoFormularioComponent {

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

  public loading: boolean = false;
  public table: string = 'formularios/';
  method: string = "POST";
  @Input() id: number = 0;

  public option: ['marcos', 'luis', 'glauco']

  public formulario: FormGroup = this._formBuilder.group({
    id_formulario: [this.id, [Validators.required]],
    formulario: [null, [Validators.required]],
    descricao: [null, [Validators.required]],
    acesso: ["TODOS", [Validators.required]],
    ordem: [0, [Validators.required, Validators.min(0)]],
  });


  onSubmit() {
    this.loading = true;

    let dados = this.formulario.value

    if (this.method == 'POST') {

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
    this.method = "PUT"

    let path = 'formularios/?id=' + id;

    return this._provider.getAPI(path).subscribe((data) => {
      //CARREGA DADOS NO FORMULÁRIO
      if (data['status'] === 'success') {
        this.formulario.patchValue({
          id_formulario: data['result']['id_formulario'],
          formulario: data['result']['formulario'],
          descricao: data['result']['descricao'],
          acesso: data['result']['acesso'],
          ordem: data['result']['ordem'],
        })
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
