import { LOCALE_ID, NgModule } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { NbThemeModule } from '@nebular/theme';
import {
  NbAuthJWTToken,
  NbAuthModule,
  NbPasswordAuthStrategy,
} from '@nebular/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import { ApiService } from './services/api.service';

import { PagesModule } from './views/pages/pages.module';
import { AuthGuard } from './auth-guard.service';

import { NgxAuthModule } from './views/components/auth/auth.module';

registerLocaleData(localePt);

const formSetting: any = {
  strategy: 'email',
  redirectDelay: 600,
  showMessages: {
    success: true,
    error: true,
  },
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbEvaIconsModule,
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          token: {
            class: NbAuthJWTToken,
            key: 'token',
          },
          baseEndpoint: 'http://localhost/api',
          login: {
            endpoint: '/auth/login/',
            method: 'post',
            redirect: {
              success: '/pages/',
              failure: null,
            },
            defaultErrors: ['Usuário não encontrado! Tente novamente.'],
            defaultMessages: ['Acesso liberado.'],
          },
          logout: {
            endpoint: '/auth/logout/',
            method: 'get',
            redirect: {
              success: '/',
              failure: null,
            },
          },
          requestPass: {
            endpoint: '/auth/request-password/',
            redirect: {
              success: '/auth/login/',
              failure: null,
            },
            defaultErrors: ['Usuário não encontrado! Tente novamente.'],
            defaultMessages: [
              'Solicitação enviada com sucesso! Aguarde a confirmação do seu gestor',
            ],
          },
        }),
      ],
      forms: {
        login: formSetting,
        logout: formSetting,
      },
    }),
    HttpClientModule,
    PagesModule,
    NgxAuthModule,
  ],
  providers: [
    ApiService,
    AuthGuard,
    HttpClient,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
