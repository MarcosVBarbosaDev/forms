import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbActionsModule,
  NbButtonGroupModule,
  NbButtonModule,
  NbCardModule,
  NbContextMenuModule,
  NbDialogModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbMenuModule,
  NbPopoverModule,
  NbSelectModule,
  NbSidebarModule,
  NbSpinnerModule,
  NbTabsetModule,
  NbThemeModule,
  NbToastrModule,
  NbToggleModule,
  NbUserModule,
} from '@nebular/theme';

import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

import { Angular2SmartTableModule } from 'angular2-smart-table';

import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { FooterComponent } from '../components/footer/footer.component';
import { HeaderComponent } from '../components/header/header.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { ModalModule } from '../modal/modal.module';
import { PagesRoutingModule } from './pages-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyAccountComponent } from './my-account/my-account.component';
import { UsuariosComponent,BtnStatusUsuarioComponent, } from './usuarios/usuarios.component';

@NgModule({
  declarations: [
    HomeComponent,
    PagesComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    BtnStatusUsuarioComponent,
    MyAccountComponent,
    UsuariosComponent,
  ],
  imports: [
    Angular2SmartTableModule,
    FormsModule,
    CommonModule,
    ModalModule,
    NbActionsModule,
    NbContextMenuModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbToggleModule,
    NbDialogModule.forRoot({ context: String }),
    NbIconModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbButtonGroupModule,
    NbLayoutModule,
    NbMenuModule.forRoot(),
    NbPopoverModule,
    NbSelectModule,
    NbSidebarModule.forRoot(),
    NbSpinnerModule,
    NbTabsetModule,
    NbToggleModule,
    NbToastrModule.forRoot(),
    NbUserModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [provideNgxMask()],
})
export class PagesModule {}
