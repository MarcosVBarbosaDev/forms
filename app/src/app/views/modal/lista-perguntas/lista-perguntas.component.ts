import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef, NbDialogService, NbThemeService, NbToastrService } from '@nebular/theme';

import { ApiService } from 'src/app/services/api.service';

import { IColumnType, LocalDataSource, Settings } from 'angular2-smart-table';
import { FormPerguntasComponent } from '../form-perguntas/form-perguntas.component';


@Component({
  template: `
    <div class="example-items-rows">
      <nb-toggle
        [checked]="rowData.obrigatorio == 1 ? true : false"
        (checkedChange)="onSwitch($event)"
        [status]="color"
          [disabled]="toggleDisabled"
      ></nb-toggle>
    </div>
  `,
  styleUrls: ['./lista-perguntas.component.scss']
})
export class BtnStatusObrigatorioComponent implements OnInit {
  @Input() rowData: any;
  public table: string = 'rl_formularios_componentes/';
  public color: any;
  public status: any;
  public toggleDisabled: boolean = false;
  public user: any;

  constructor(
    private _provider: ApiService,
    private _listPergunta: ListaPerguntasComponent,
    private _toastrService: NbToastrService,
    private _themeService: NbThemeService,
  ) { }

  ngOnInit(): void {
    this._themeService.onThemeChange();

    if (this.rowData.obrigatorio == 1) {
      this.color = 'info';
    } else {
      this.color = 'danger';
    }
  }

  onSwitch(event: any) {

    this._listPergunta.loading = true;

    if (event) {
      this.rowData.ativo = 1;
      this.color = 'info';
    } else {
      this.rowData.ativo = 0;
      this.color = 'danger';
    }

    let dados = {
      id_rl_formulario_componente: this.rowData.id_rl_formulario_componente,
      obrigatorio: this.rowData.ativo
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
        this._listPergunta.loading = false;
      },
      () => {
        this._listPergunta.loading = false;
      }
    );
  }
}

@Component({
  selector: 'app-lista-perguntas',
  templateUrl: './lista-perguntas.component.html',
  styleUrls: ['./lista-perguntas.component.scss']
})
export class ListaPerguntasComponent {

  public source: LocalDataSource = new LocalDataSource();
  public loading: boolean = false;

  @Input() id: any;
  @Input() titulo: any;


  ngOnInit(): void {
    // CARREGAR DADOS NA TABELA
    if (this.id) {
      this.getDados(this.id);
    }
  }

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
      label: {
        width: '80%',
        title: 'Pergunta',
        sortDirection: 'asc',
      },
      componente: {
        width: '13%',
        title: 'Tipo de respota',
      },
      ativo: {
        title: 'Obrigatório',
        width: '7%',
        type: IColumnType.Custom,
        renderComponent: BtnStatusObrigatorioComponent,
        filter: false,
      },
    },
  };

  constructor(
    private _provider: ApiService,
    private _dialogService: NbDialogService,
    protected _dialogRef: NbDialogRef<''>
  ) {

  }

  expDados() { }

  getDados(id: any) {

    this.loading = true;
    this.source = new LocalDataSource();

    let url = 'formularios/?id=' + id;

    return this._provider.getAPI(url).subscribe(
      (data) => {
        // CARREGAR DADOS NA TABELA
        if (data['status'] === 'success') {
          this.source.load(data['result']['componentes']);
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

  showDialog(id: number, metodo: string) {
    this._dialogService
      .open(FormPerguntasComponent, {
        context: {
          id: id,
          id_formulario: this.id,
          metodo: metodo,
        },
        closeOnEsc: true,
        hasBackdrop: true,
        closeOnBackdropClick: false,
        hasScroll: true,
      })
      .onClose.subscribe((update) => update && this.getDados(this.id));
  }

  close() {
    this._dialogRef.close();
  }

}

