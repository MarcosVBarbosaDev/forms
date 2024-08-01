import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService, NbTagComponent, NbTagInputAddEvent } from '@nebular/theme';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-perguntas',
  templateUrl: './form-perguntas.component.html',
  styleUrls: ['./form-perguntas.component.scss']
})
export class FormPerguntasComponent {

  @Input() id: any;
  @Input() id_formulario: any;
  @Input() metodo: any;

  public table: string = 'rl_formularios_componentes/';
  public items: any = [];
  public loading: boolean = false;
  public options: any;

  mostraroptions: boolean = false;
  trees: Set<string> = new Set();
  hasOptionsControl: boolean = false;
  isOptions: boolean = false;

  private subscription: Subscription = new Subscription();

  constructor(
    private _toastrService: NbToastrService,
    private _formBuilder: FormBuilder,
    private _provider: ApiService,
    protected _dialogRef: NbDialogRef<''>,
  ) {

  }

  ngOnInit(): void {
    this.getDados();

    if (this.id) {
      this.setForm(this.id)
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();

  }

  public formulario: FormGroup = this._formBuilder.group({
    label: [null, [Validators.required]],
    tipo: [null, [Validators.required]],
    options: [null]
  });


  setForm(id: number) {
    this.loading = true;

    let url = this.table + '?id=' + id;

    return this._provider.getAPI(url).subscribe(
      (data) => {
        // CARREGAR DADOS NA TABELA
        if (data['status'] === 'success') {

          this.isOptions = data['result']['id_componente'] == 3 || data['result']['id_componente'] == 4 || data['result']['id_componente'] == 5;

          if (this.isOptions && data['result']['options']) {

            this.mostraroptions = true;

            data['result']['options'] = data['result']['options'].split(',');

            data['result']['options'].forEach((element: any) => {
              this.trees.add(element);
            });
          } else {
            this.mostraroptions = false;
          }

          this.formulario.patchValue({
            label: data['result']['label'],
            tipo: data['result']['id_componente'],
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
      () => { }
    );
  }

  getDados() {
    this.loading = true;
    let url = 'componentes/';
    this._provider.getAPI(url).subscribe(
      (data) => {
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

    let dados = this.formulario.value;

    this.isOptions = dados.tipo == 3 || dados.tipo == 4 || dados.tipo == 5;

    if (this.isOptions) {
      dados['options'] = this.trees.size > 0 ? Array.from(this.trees.values()) : false;
    }

    if (dados['options'] === false) {
      this._toastrService.success('OBA!', "Preencha todos os Campos");
      this.loading = false;
      return;
    }

    if (this.metodo == 'POST') {

      dados['id_formulario'] = this.id_formulario;

      this._provider.postAPI(this.table, dados).subscribe(
        (data: any) => {
          if (data['status'] == 'success') {
            this._toastrService.success('OBA!', data['result']);
          } else {
            this._toastrService.danger('OPS!', data['result']);
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

      dados['id_rl_formulario_componente'] = this.id;

      this._provider.putAPI(this.table, dados).subscribe(
        (data: any) => {
          if (data['status'] == 'success') {
            this._toastrService.success('OBA!', data['result']);
          } else {
            this._toastrService.danger('OPS!', data['result']);
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

  remove_option(tagToRemove: NbTagComponent): void {
    this.trees.delete(tagToRemove.text);
  }

  add_option({ value, input }: NbTagInputAddEvent): void {
    if (value) {
      this.trees.add(value);
      this.options = '';
    }
    input.nativeElement.value = '';
  }

  remove_optionAll(tagToRemove: NbTagComponent): void {
    const tagText = tagToRemove.text.trim();
    this.trees.delete(tagText);
  }

  close() {
    this._dialogRef.close();
  }
}
