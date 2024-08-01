import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS_ADMIN, MENU_ITEMS_BASIC } from './sidebar.menu';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public isLoggin: boolean = false;
  public user: any;

  constructor(private _authService: NbAuthService) {
    this._authService
      .onTokenChange()
      .subscribe((token: NbAuthJWTToken | any) => {
        this.user = token.getPayload();
      });
  }

  get menu() {
    return this.user.user_permission == 1 ? MENU_ITEMS_BASIC : MENU_ITEMS_ADMIN;
  }

  ngOnInit(): void { }
}
