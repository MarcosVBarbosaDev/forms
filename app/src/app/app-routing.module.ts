import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./views/components/auth/auth.module').then((m: any) => m.NgxAuthModule),
  },
  {
    path: 'pages',
    loadChildren: () => import('./views/pages/pages.module').then((m: any) => m.PagesModule),
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
