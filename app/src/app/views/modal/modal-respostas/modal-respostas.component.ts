import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-modal-respostas',
  templateUrl: './modal-respostas.component.html',
  styleUrls: ['./modal-respostas.component.scss']
})
export class ModalRespostasComponent implements OnInit {

  @Input() id: number;
  @Input() formulario: string;

  public loading: boolean = false;
  public table: string = 'respostas/';
  public resposta: any
  public componentes: any[] = []
  public usuario: string

  constructor(
    private _provider: ApiService,
    protected _dialogRef: NbDialogRef<''>
  ) { }

  ngOnInit(): void {
    // CARREGA CADASTRO
    if (this.id > 0) {
      this.getRespostas(this.id);
    }
  }

  getRespostas(id: number) {
    this.loading = true
    const endpoint = this.table + '?id=' + id
    this._provider.getAPI(endpoint).subscribe((data: any) => {
      if (data['status'] == 'success') {
        this.usuario = "[" + data['result']['data_hora_format'] + "] | " + data['result']['usuario']
        this.resposta = JSON.parse(data['result']['resposta'])
        this.componentes = this.TransformarParaArray(this.resposta)
      } else {
        this._provider.showToast(
          'Ops!',
          data['result'],
          'danger'
        )
      }
    }, (error: any) => {
      this.loading = false
    }, () => {
      this.loading = false
    })
  }

  TransformarParaArray(resposta: any) {
    let arrayFormatado: any = [];
    let linhaFormatada

    for (let chave in resposta) {
      if (chave.indexOf("id_") == -1) {
        // Formatando cada chave e valor no formato solicitado
        let valor = resposta[chave];
        if (typeof resposta[chave] === 'object' && resposta[chave] !== null) {
          let arrayFormatado2 = [];
          let linhaFormatada2
          for (let chave2 in resposta[chave]) {
            let valor2 = resposta[chave][chave2];
            if (valor2 == true) {
              arrayFormatado2.push(chave2);
              linhaFormatada2 = arrayFormatado2.join(', ');
            }
          }
          linhaFormatada = { label: chave, value: linhaFormatada2 };

        } else {
          linhaFormatada = { label: chave, value: valor };
        }
        arrayFormatado.push(linhaFormatada);
      }
    }

    return arrayFormatado;
  }


  close() {
    this._dialogRef.close();
  }

}
