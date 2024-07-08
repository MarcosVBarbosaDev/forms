import { Component } from '@angular/core';

@Component({
  selector: 'app-form-reset-password',
  templateUrl: './form-reset-password.component.html',
  styleUrls: ['./form-reset-password.component.scss']
})
export class FormResetPasswordComponent {

  user: any = {};
  submitted = false;


  // Função para verificar se a senha e a confirmação de senha são iguais
  isPasswordConfirmed(): boolean {
    return this.user.senha === this.user.confirmaSenha;
  }

  onSubmit() { }
  // Método de exemplo para obter valor de configuração
  getConfigValue(key: string) {
    return {
      required: true,
      minLength: 4,
      maxLength: 50
    };
  }

}
