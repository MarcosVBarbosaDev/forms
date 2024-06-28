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

@NgModule({
    declarations: [
        NgxLoginComponent,
        NgxLogoutComponent,
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