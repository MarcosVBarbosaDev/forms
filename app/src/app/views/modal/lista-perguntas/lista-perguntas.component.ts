import { Component, Input, OnInit } from '@angular/core';
import { NbDialogService, NbThemeService, NbToastrService } from '@nebular/theme';

import { ApiService } from 'src/app/services/api.service';

import { IColumnType, LocalDataSource, Settings } from 'angular2-smart-table';
import { FormUserComponent } from '../../modal/form-user/form-user.component';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

@Component({
  selector: 'app-lista-perguntas',
  templateUrl: './lista-perguntas.component.html',
  styleUrls: ['./lista-perguntas.component.scss']
})
export class ListaPerguntasComponent {

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
      usuario: {
        width: '60%',
        title: 'Usuario',
        sortDirection: 'asc',
      },
      email: {
        width: '30%',
        title: 'email',
      }
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

    let url = 'usuarios/';

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
      this.showDialog(event.data.id_usuario, 'PUT');
    }
  }

  ngOnInit(): void { }

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

