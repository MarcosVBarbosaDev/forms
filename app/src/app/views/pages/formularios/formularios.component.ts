import { Component, Input, OnInit } from '@angular/core';
import { NbDialogService, NbThemeService, NbToastrService } from '@nebular/theme';

import { ApiService } from 'src/app/services/api.service';

import { IColumnType, LocalDataSource, Settings } from 'angular2-smart-table';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { FormNovoFormularioComponent } from '../../modal/form-novo-formulario/form-novo-formulario.component';

@Component({
  template: `
    <div class="example-items-rows">
      <nb-toggle
        [checked]="rowData.ativo == 1 ? true : false"
        (checkedChange)="onSwitch($event)"
        [status]="color"
          [disabled]="toggleDisabled"
      ></nb-toggle>
    </div>
  `,
  styleUrls: ['./formularios.component.scss']
})
export class BtnStatusFormulariosComponent implements OnInit {
  @Input() rowData: any;
  public table: string = 'formularios/';
  public color: any;
  public status: any;
  public toggleDisabled: boolean = false;
  public user: any;

  constructor(
    private _provider: ApiService,
    private _usuarios: FormulariosComponent,
    private _toastrService: NbToastrService,
    private _themeService: NbThemeService,
    private _authService: NbAuthService,
  ) { }

  ngOnInit(): void {
    this._themeService.onThemeChange();

    this._authService
      .onTokenChange()
      .subscribe((token: NbAuthJWTToken | any) => {
        if (token.isValid()) {
          this.user = token.getPayload();
        }
      });

    if (this.rowData.ativo == 1) {
      this.color = 'info';
    } else {
      this.color = 'danger';
    }

    if (this.user.user_id == this.rowData.id_usuario) {
      // Bloqueia interação com o toggle
      this.toggleDisabled = true;
    }
  }

  onSwitch(event: any) {

    this._usuarios.loading = true;

    if (event) {
      this.rowData.ativo = 1;
      this.color = 'info';
    } else {
      this.rowData.ativo = 0;
      this.color = 'danger';
    }

    let dados = {
      id_usuario: this.rowData.id_usuario,
      ativo: this.rowData.ativo
    }

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
  selector: 'app-formularios',
  templateUrl: './formularios.component.html',
  styleUrls: ['./formularios.component.scss']
})
export class FormulariosComponent {

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
      formulario: {
        width: '60%',
        title: 'Titulo',
        sortDirection: 'asc',
      },
      data_format: {
        width: '30%',
        title: 'Data',
      },
      ativo: {
        title: 'STATUS',
        width: '10%',
        type: IColumnType.Custom,
        sortDirection: 'desc',
        renderComponent: BtnStatusFormulariosComponent,
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

  expDados() { }

  getDados() {
    this.loading = true;
    this.source = new LocalDataSource();

    let url = 'formularios/';

    return this._provider.getAPI(url).subscribe(
      (data) => {
        // CARREGAR DADOS NA TABELA
        if (data['status'] === 'success') {
          // this.status(data['result']);F
          this.source.load(data['result']);
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
      this.showDialog(event.data.id_formulario, 'PUT');
    }
  }

  ngOnInit(): void { }

  showDialog(id: number, metodo: string) {
    this._dialogService
      .open(FormNovoFormularioComponent, {
        context: {
          id: id,
        },
        closeOnEsc: true,
        hasBackdrop: true,
        closeOnBackdropClick: false,
        hasScroll: true,
      })
      .onClose.subscribe((update) => update && this.getDados());
  }


}
