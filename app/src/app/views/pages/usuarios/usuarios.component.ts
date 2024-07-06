import { Component, Input, OnInit } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';

import { ApiService } from 'src/app/services/api.service';

import { IColumnType, LocalDataSource, Settings } from 'angular2-smart-table';
import { FormUserComponent } from '../../modal/form-user/form-user.component';

@Component({
  template: `
    <div class="example-items-rows">
      <nb-toggle
        [checked]="rowData.status == 1 ? true : false"
        (checkedChange)="onSwitch($event)"
        [status]="color"
      ></nb-toggle>
    </div>
  `,
  styleUrls: ['./usuarios.component.scss'],
})
export class BtnStatusUsuarioComponent implements OnInit {
  @Input() rowData: any;
  public table: string = 'usuarios/';
  public color: any;
  public status: any;

  constructor(
    private _provider: ApiService,
    private _usuarios: UsuariosComponent,
    private _toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    if (this.rowData.status == 1) {
      this.color = 'info';
    } else {
      this.color = 'danger';
    }
  }

  onSwitch(event: any) {
    this._usuarios.loading = true;

    if (event) {
      this.rowData.status = 1;
      this.color = 'info';
    } else {
      this.rowData.status = 0;
      this.color = 'danger';
    }

    let dados = {
      form: {
        status: this.rowData.status,
        id_user: this.rowData.id_user,
      },
    };

    this._provider.putAPI(this.table, dados).subscribe(
      (data: any) => {
        if (data['status'] == 'success') {
          this._toastrService.show(data['status'], 'Oba!', {
            status: 'success',
            duration: 8000,
          });
        } else {
          this._toastrService.show(data['status'], 'Ops!', {
            status: 'danger',
            duration: 8000,
          });
        }
      },
      (error: any) => {
        this._usuarios.loading = false;
      },
      () => {
        this._usuarios.loading = false;
      }
    );
  }
}


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {

  public source: LocalDataSource = new LocalDataSource();
  public loading: boolean = false;

  @Input() rowData: any;

  settings: Settings = {
    mode: 'external',
    noDataMessage: 'Nenhum registro foi encontrado.',
    attr: {
      class: 'table table-striped align-middle',
    },
    pager: {
      perPage: 25,
      perPageSelect: [25, 50, 100, 200],
      perPageSelectLabel: 'Total: ',
    },
    add: {
      addButtonContent: '<i class="bi bi-plus"></i>',
      confirmCreate: true,
    },

    actions: {
      columnTitle: '',
      position: 'right',
      edit: false,
      delete: false,
      custom: [
        {
          name: 'edit',
          title: '<i class="bi bi-pencil"></i> ',
        },
      ],
    },
    columns: {
      name: {
        width: '60%',
        title: 'Usuario',
        sortDirection: 'asc',
      },
      password: {
        width: '30%',
        title: 'Senha',
      },
      status: {
        title: 'STATUS',
        width: '10%',
        type: IColumnType.Custom,
        sortDirection: 'desc',
        renderComponent: BtnStatusUsuarioComponent,
        filter: false,
      },
    },
  };

  constructor(
    private _provider: ApiService,
    private _dialogService: NbDialogService
  ) {
    // CARREGAR DADOS NA TABELA
    this.getDados();
  }

  expDados() {}

  getDados() {
    this.loading = true;
    this.source = new LocalDataSource();

    let url = 'users/';

    return this._provider.getAPI(url).subscribe(
      (data) => {
        // CARREGAR DADOS NA TABELA
        if (data['status'] === 'success') {
          // this.status(data['result']);F
          this.source.load(data['rows']);
        } else {
          this.loading = false;
        }
      },
      (error: any) => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  onOptions(event: any) {
    if (event.action == 'edit') {
      // OPÇÃO PARA EDITAR
      this.showDialog(event.data.id_user, 'PUT');
    }
  }

  ngOnInit(): void {}

  showDialog(id: number, metodo: string) {
    this._dialogService
      .open(FormUserComponent, {
        context: {
          id: id,
          metodo: metodo,
        },
        closeOnEsc: true,
        hasBackdrop: true,
        closeOnBackdropClick: false,
        hasScroll: true,
      })
      .onClose.subscribe((update) => update && this.getDados());
  }

}
