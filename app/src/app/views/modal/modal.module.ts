import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbAlertModule,
  NbAutocompleteModule,
  NbButtonGroupModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbSelectModule,
  NbSpinnerModule,
  NbTabsetModule,
  NbTagModule,
  NbToggleModule,
  NbTooltipModule,
} from '@nebular/theme';

import { FormUserComponent } from './form-user/form-user.component';
import { FormResetPasswordComponent } from './form-reset-password/form-reset-password.component';
import { FormNovoFormularioComponent } from './form-novo-formulario/form-novo-formulario.component';
import { FormPerguntasComponent } from './form-perguntas/form-perguntas.component';
import { BtnStatusObrigatorioComponent, ListaPerguntasComponent } from './lista-perguntas/lista-perguntas.component';
import { Angular2SmartTableModule } from 'angular2-smart-table';
import { ModalRespostasComponent } from './modal-respostas/modal-respostas.component';
import { ModalExcluirComponent } from './modal-excluir/modal-excluir.component';

@NgModule({
  declarations: [FormUserComponent, FormResetPasswordComponent, FormNovoFormularioComponent, FormPerguntasComponent, ListaPerguntasComponent, BtnStatusObrigatorioComponent, ModalRespostasComponent, ModalExcluirComponent],
  imports: [
    Angular2SmartTableModule,
    CommonModule,
    NbTagModule,
    ReactiveFormsModule,
    FormsModule,
    NbAutocompleteModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbFormFieldModule,
    NbIconModule,
    NbButtonGroupModule,
    NbInputModule,
    NbListModule,
    NbSelectModule,
    NbSpinnerModule,
    NbTabsetModule,
    NbToggleModule,
    NbTooltipModule,
    NbAlertModule,
  ],
  exports: [],
  providers: [],
})
export class ModalModule { }
