import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService, } from '@nebular/theme';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-form-perguntas',
  templateUrl: './form-perguntas.component.html',
  styleUrls: ['./form-perguntas.component.scss']
})
export class FormPerguntasComponent {


  @Input() id: any;
  @Input() id_formulario: any;
  public table: string = 'rl_formularios_componentes/';
  public items: any = [];
  public loading: boolean = false;
  metodo: string = 'POST';


  constructor(
    private _toastrService: NbToastrService,
    private _formBuilder: FormBuilder,
    private _provider: ApiService,
    protected _dialogRef: NbDialogRef<''>
  ) {
    this.getDados();
  }

  public formulario: FormGroup = this._formBuilder.group({
    label: [null, [Validators.required]],
    tipo: [null, [Validators.required]],
  });


  selectedItem: any;


  getDados() {

    this.loading = true;

    let url = 'componentes/';

    return this._provider.getAPI(url).subscribe(
      (data) => {
        // CARREGAR DADOS NA TABELA
        if (data['status'] === 'success') {
          this.items = data['result'].map((item: { componente: any; id_componente: any; }) => ({
            title: item.componente,
            value: item.id_componente
          }));
        } else {
          this.loading = false;
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

  onSubmit() {
    this.loading = true;

    let dados = this.formulario.value

    dados['id_formulario'] = this.id_formulario

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

  close() {
    this._dialogRef.close();
  }

}
