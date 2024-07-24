import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbAuthService, NbResetPasswordComponent } from '@nebular/auth';
import { ApiService } from 'src/app/services/api.service';
import * as CryptoJS from 'crypto-js';

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
  public ref: any = '';

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
      this.ref = params['ref'];
    });
  }

  // Função para calcular o hash SHA-256 de uma string
  calcularHashSHA256(input: string): string {
    return CryptoJS.SHA256(input).toString(CryptoJS.enc.Hex);
  }

  // Método para redefinir a senha (manipulador ngSubmit)
  override resetPass() {
    // Verificar se os dados necessários estão presentes
    if (!this.user.senha || !this.ref) {
      // Exibir mensagem de erro ou tratar de outra forma

      return;
    }

    // Montar os dados a serem enviados na requisição PUT
    let dados = {
      nova_senha: this.calcularHashSHA256(this.user.senha),
      ref: this.ref
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
