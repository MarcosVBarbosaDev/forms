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

  public option:['marcos','luis','glauco']

  public formulario: FormGroup = this._formBuilder.group({
    id_formulario: [this.id, [Validators.required]],
    formulario: [null, [Validators.required]],
    descricao: [null, [Validators.required]],
    acesso: [null, [Validators.required]],
  });


  onSubmit() {

  }

  setForm(id: any) {

  }

  close() {
    this._dialogRef.close();
  }
}
