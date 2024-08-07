import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef, NbDialogService, NbThemeService, NbToastrService } from '@nebular/theme';

import { ApiService } from 'src/app/services/api.service';

import { IColumnType, LocalDataSource, Settings } from 'angular2-smart-table';
import { ListaPerguntasComponent } from '../../modal/lista-perguntas/lista-perguntas.component';
import { FormNovoFormularioComponent } from '../../modal/form-novo-formulario/form-novo-formulario.component';
import { RespostasComponent } from '../respostas/respostas.component';
import { ModalExcluirComponent } from '../../modal/modal-excluir/modal-excluir.component';

@Component({
  template: `
  <div class="example-items-rows">
    <button nbButton shape="round" (click)="openListPerguntas()" outline nbPopover="Perguntas" nbPopoverTrigger="hover" nbPopoverPlacement="left" status="primary" size="small"><nb-icon icon="file-text-outline"></nb-icon> </button>
    <button nbButton shape="round" (click)="onRespostas()" outline nbPopover="Respostas" nbPopoverTrigger="hover" nbPopoverPlacement="right" status="success" size="small"><nb-icon icon="checkmark-circle-outline"></nb-icon> </button>
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

  onRespostas() {
    this._dialogService.open(RespostasComponent, {
      context: {
        id_formulario: this.rowData.id_formulario,
        titulo: this.rowData.formulario,
      },
      closeOnEsc: true,
      hasBackdrop: true,
      closeOnBackdropClick: false,
      hasScroll: true
    });
  }

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
  template: `
  <div class="example-items-rows">
      <nb-toggle
        [checked]="rowData.exibir == 1 ? true : false"
        (checkedChange)="onSwitch($event)"
        [status]="color"
      ></nb-toggle>
    </div>
  `,
  styleUrls: ['./formularios.component.scss']
})
export class BtnExibirFormulariosComponent implements OnInit {
  @Input() rowData: any;
  public color: any;

  constructor(
    private _provider: ApiService,
    private _toastrService: NbToastrService,
  ) { }

  ngOnInit(): void {
    if (this.rowData.exibir == 1) {
      this.color = 'info';
    } else {
      this.color = 'danger';
    }
  }

  onSwitch(event: any) {

    if (event) {
      this.rowData.exibir = 1;
      this.color = 'info';
    } else {
      this.rowData.exibir = 0;
      this.color = 'danger';
    }

    let dados = {
      id_formulario: this.rowData.id_formulario,
      exibir: this.rowData.exibir
    }

    this._provider.putAPI('formularios/', dados).subscribe(
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
        {
          name: 'remove',
          title: '<i class="bi bi-trash"></i> ',
        },
      ],
    },
    columns: {
      ordem: {
        width: '80px',
        title: 'Ordem',
        sortDirection: "asc",
        classContent: 'text-center'
      },
      data_format: {
        width: '150px',
        title: 'Data',
        classContent: 'text-center'
      },
      formulario: {
        title: 'Titulo',
      },
      ativo: {
        width: '100px',
        type: IColumnType.Custom,
        renderComponent: BtnPgtaFormulariosComponent,
        filter: false,
      },
      exibir: {
        width: '100px',
        type: IColumnType.Custom,
        renderComponent: BtnExibirFormulariosComponent,
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
    } else if (event.action == 'remove') {
      // OPÇÃO PARA EDITAR
      this._dialogService.open(ModalExcluirComponent, {
        context: {
          id: event.data.id_formulario
        }
      })
        .onClose.subscribe(update => update && this.getDados()
        );
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
