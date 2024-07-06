import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbAuthComponent } from '@nebular/auth';

import { NgxLoginComponent } from './login/login.component';
import { NgxLogoutComponent } from './logout/logout.component';
import { NgxResetPasswordComponent } from './reset-password/reset-password.component';
import { NgxRequestPasswordComponent } from './request-password/request-password.component';

const title: string = 'PMO | ';

export const routes: Routes = [
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NgxLoginComponent,
      },
      {
        path: 'login',
        title: title + 'Tela login',
        component: NgxLoginComponent,
      },
      {
        path: 'logout',
        title: title + 'Logout',
        component: NgxLogoutComponent,
      },
      {
          path: 'request-password',
          title: title + 'Recuperar acesso',
          component: NgxRequestPasswordComponent,
      },
      {
          path: 'reset-password',
          title: title + 'Alterar senha',
          component: NgxResetPasswordComponent,
      },
    ],
  },
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgxAuthRoutingModule {}
