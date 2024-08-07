import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-modal-excluir',
  templateUrl: './modal-excluir.component.html',
  styleUrls: ['./modal-excluir.component.scss']
})
export class ModalExcluirComponent {
  @Input() id: number;
  public loading: boolean = false;
  public table: string = 'formularios/';

  constructor(
    private _provider: ApiService,
    protected _dialogRef: NbDialogRef<''>
  ) { }

  confirm() {
    this.loading = true
    const endpoint = this.table + '?id=' + this.id
    this._provider.deleteAPI(endpoint).subscribe((data: any) => {
      if (data['status'] == 'success') {
        this._provider.showToast(
          'Ops!',
          data['result'],
          'danger'
        )
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
      this._dialogRef.close('update');
    })
  }

  close() {
    this._dialogRef.close();
  }

}
