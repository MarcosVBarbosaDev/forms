import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef, NbDialogService, NbThemeService, NbToastrService } from '@nebular/theme';

import { ApiService } from 'src/app/services/api.service';

import { IColumnType, LocalDataSource, Settings } from 'angular2-smart-table';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { ListaPerguntasComponent } from '../../modal/lista-perguntas/lista-perguntas.component';
import { FormNovoFormularioComponent } from '../../modal/form-novo-formulario/form-novo-formulario.component';

@Component({
  template: `
  <div class="example-items-rows">
  <button nbButton shape="round" (click)="openListPerguntas()" outline nbPopover="Adicionar pergunta ao Formularios" nbPopoverTrigger="hover" nbPopoverPlacement="left" status="primary" size="small"><nb-icon icon="file-text-outline"></nb-icon> </button>
  <button nbButton shape="round" (click)="onContatos()" outline nbPopover="Contatos" nbPopoverTrigger="hover" nbPopoverPlacement="left" status="success" size="small"><nb-icon icon="checkmark-circle-outline"></nb-icon> </button>
  </div>
  `,
  styleUrls: ['./formularios.component.scss']
})
export class BtnPgtaFormulariosComponent implements OnInit {
  @Input() rowData: any;

  constructor(
    private _dialogService: NbDialogService,
  ) { }

  ngOnInit(): void {

  }

  onContatos() { }

  openListPerguntas() {
    this._dialogService.open(ListaPerguntasComponent, {
      context: {
        id: this.rowData.id_formulario,
        titulo: this.rowData.formulario,
      },
      closeOnEsc: true,
      hasBackdrop: true,
      closeOnBackdropClick: false,
      hasScroll: true
    });
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
        title: '',
        width: '10%',
        type: IColumnType.Custom,
        sortDirection: 'desc',
        renderComponent: BtnPgtaFormulariosComponent,
        filter: false,
      },
    },
  };

  constructor(
    private _provider: ApiService,
    private _dialogService: NbDialogService,
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
