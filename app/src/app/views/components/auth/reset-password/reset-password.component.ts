import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbAuthService, NbResetPasswordComponent } from '@nebular/auth';
import { ApiService } from 'src/app/services/api.service';

// Interface para definir o formato das configurações de validação de senha
interface PasswordValidationConfig {
  required: boolean;
  minLength: number;
  maxLength: number;
}

@Component({
  selector: 'ngx-reset-password',
  templateUrl: './reset-password.component.html',
})
export class NgxResetPasswordComponent extends NbResetPasswordComponent implements OnInit {
  // Propriedades do componente com tipagem aprimorada
  override showMessages: any = {};
  override errors: any[] = [];
  override submitted = false;
  override redirectDelay: number;
  override strategy: string;
  override messages: string[];
  override user: any = {};
  public table: string = 'autenticacao/redefinir-senha/';
  public token_reset_senha: any = '';

  constructor(
    service: NbAuthService,
    cd: ChangeDetectorRef,
    router: Router,
    private route: ActivatedRoute,
    private _provider: ApiService,
  ) {
    super(service, {}, cd, router);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token_reset_senha = params['token_reset_senha'];
    });
  }

  // Método para redefinir a senha (manipulador ngSubmit)
  override resetPass() {
    // Verificar se os dados necessários estão presentes
    if (!this.user.senha || !this.token_reset_senha) {
      // Exibir mensagem de erro ou tratar de outra forma

      return;
    }

    // Montar os dados a serem enviados na requisição PUT
    let dados = {
      form: {
        nova_senha: this.user.senha,
        token_reset_senha: this.token_reset_senha
      }
    };

    this._provider.putAPI(this.table, dados).subscribe((data: any) => {
      // Verificar a resposta do servidor
      if (data['status'] === 'success') {
        // Exibir mensagem de sucesso
        this._provider.showToast('Sucesso!', data['result'], 'success');
        // Redirecionar para a página de login após sucesso
        this.router.navigate(['../auth/login']);
      } else {
        // Exibir mensagem de erro
        this._provider.showToast('Ops!', data['result'], 'danger');
      }
    },
      (error: any) => {
        // Tratar erros de requisição (exibir mensagem de erro genérica ou específica)
        this._provider.showToast('Erro!', 'Erro ao processar a requisição.', 'danger');
      }
    );
  }



  // Método de exemplo para obter valor de configuração
  override getConfigValue(key: string): PasswordValidationConfig {
    return {
      required: true,
      minLength: 4,
      maxLength: 50
    };
  }

  // Função para verificar se a senha e a confirmação de senha são iguais
  isPasswordConfirmed(): boolean {
    return this.user.senha === this.user.confirmaSenha;
  }
}
