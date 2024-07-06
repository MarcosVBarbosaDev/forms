import { Component, OnInit, ViewChild } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import {
  NbContextMenuDirective,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from '@nebular/theme';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild(NbContextMenuDirective) contextMenu: NbContextMenuDirective;

  public isLoggin: boolean = false;
  public currentTheme: string = 'default';
  public logoHeader: string = 'assets/images/logo-blue.png';

  public user: any;

  public userMenu = [
    {
      title: 'Minha conta',
      link: '/pages/my-account',
    },
    {
      title: 'Sair',
      link: '/auth/logout',
    },
  ];

  public themes: any[] = [
    {
      value: 'default',
      name: 'Claro',
    },
    {
      value: 'dark',
      name: 'Escuro',
    },
    {
      value: 'cosmic',
      name: 'Cosmico',
    },
  ];

  constructor(
    private _themeService: NbThemeService,
    private _sidebarService: NbSidebarService,
    private _authService: NbAuthService,
    private _nbMenuService: NbMenuService
  ) {
    this._themeService.onThemeChange();

    this._authService
      .onTokenChange()
      .subscribe((token: NbAuthJWTToken | any) => {
        if (token.isValid()) {
          this.user = token.getPayload();
          this.isLoggin = true;

          // CRIAR SESSION STORE
          if (this.user['user_remember'] == 1) {
            console.log('ok');
            sessionStorage.setItem('auth_app_token', JSON.stringify(this.user));
          }
        }
      });
  }

  ngOnInit(): void {
    this._nbMenuService
      .onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'menu-user'),
        map(({ item: { title } }) => title)
      )
      .subscribe((title: string) => {
        if (title == 'Sair') {
          this.isLoggin = false;
        }
      });
  }

  toggleSidebar(): boolean {
    this._sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  changeTheme(themeName: string) {
    this._themeService.changeTheme(themeName);
    if (themeName !== 'default') {
      this.logoHeader = 'assets/images/logo-write.png';
    } else {
      this.logoHeader = 'assets/images/logo-blue.png';
    }
  }
}
