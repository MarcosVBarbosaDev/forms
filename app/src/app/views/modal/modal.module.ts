import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbAlertModule,
  NbAutocompleteModule,
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
  NbToggleModule,
  NbTooltipModule,
} from '@nebular/theme';

import { FormUserComponent } from './form-user/form-user.component';
import { FormResetPasswordComponent } from './form-reset-password/form-reset-password.component';
import { FormNovoFormularioComponent } from './form-novo-formulario/form-novo-formulario.component';

@NgModule({
  declarations: [FormUserComponent, FormResetPasswordComponent, FormNovoFormularioComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NbAutocompleteModule,
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
    NbToggleModule,
    NbTooltipModule,
    NbAlertModule
  ],
  exports: [],
  providers: [],
})
export class ModalModule { }
