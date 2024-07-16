import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from 'src/app/auth-guard.service';
import { MyAccountComponent } from './my-account/my-account.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { FormulariosComponent } from './formularios/formularios.component';

const title: string = 'PMO | ';

export const routes: Routes = [
  {
    path: 'pages',
    canActivate: [AuthGuard],
    component: PagesComponent,
    children: [
      {
        path: '',
        title: title + 'Home',
        component: HomeComponent,
      },
      {
        path: 'my-account',
        title: title + 'Conta',
        component: MyAccountComponent,
      },
      {
        path: 'usuarios',
        title: title + 'Usuários',
        component: UsuariosComponent,
      },
      {
        path: 'formularios',
        title: title + 'Formulários',
        component: FormulariosComponent,
      },
      {
        path: '**',
        title: title + 'Home',
        component: HomeComponent,
      },
    ],
  },
  {
    path: '',
    redirectTo: '/pages/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
