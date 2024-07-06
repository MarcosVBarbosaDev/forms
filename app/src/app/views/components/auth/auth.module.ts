import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxAuthRoutingModule } from './auth-routing.module';
import { NbAuthModule } from '@nebular/auth';
import {
    NbAlertModule,
    NbButtonModule,
    NbCheckboxModule,
    NbInputModule
} from '@nebular/theme';
import { NgxLoginComponent } from './login/login.component';
import { NgxLogoutComponent } from './logout/logout.component';
import { NgxResetPasswordComponent } from './reset-password/reset-password.component';
import { NgxRequestPasswordComponent } from './request-password/request-password.component';

@NgModule({
    declarations: [
        NgxLoginComponent,
        NgxLogoutComponent,
        NgxRequestPasswordComponent,
        NgxResetPasswordComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        NbAlertModule,
        NbAuthModule,
        NbInputModule,
        NbButtonModule,
        NbCheckboxModule,
        NgxAuthRoutingModule,
    ],
})
export class NgxAuthModule {
}