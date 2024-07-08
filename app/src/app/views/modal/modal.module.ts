import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
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

@NgModule({
  declarations: [FormUserComponent, FormResetPasswordComponent],
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
    FormResetPasswordComponent
  ],
  exports: [],
  providers: [],
})
export class ModalModule { }
