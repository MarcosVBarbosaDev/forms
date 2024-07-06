import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbAuthService, NbResetPasswordComponent } from '@nebular/auth';

@Component({
  selector: 'ngx-reset-password',
  templateUrl: './reset-password.component.html',
})
export class NgxResetPasswordComponent extends NbResetPasswordComponent implements OnInit {
  override showMessages: any = {}; // Certifique-se de inicializar showMessages e errors
  override errors: any[] = [];
  override submitted = false;

  constructor(
    service: NbAuthService,
    cd: ChangeDetectorRef,
    router: Router,
    private route: ActivatedRoute
  ) {
    super(service, {}, cd, router);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const ref = params['ref'];
            
      this.showMessages = { error: true }; 
    
    });
  }


  verfica_solicitacao(ref:any){
    

  }

 
}
