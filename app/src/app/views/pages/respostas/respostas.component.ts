import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { LocalDataSource, Settings } from 'angular2-smart-table';
import { ApiService } from 'src/app/services/api.service';
import { ModalRespostasComponent } from '../../modal/modal-respostas/modal-respostas.component';

@Component({
  selector: 'app-respostas',
  templateUrl: './respostas.component.html',
  styleUrls: ['./respostas.component.scss']
})
export class RespostasComponent implements OnInit {
  public source: LocalDataSource = new LocalDataSource();
  public loading: boolean = false;

  @Input() id_formulario: number;
  @Input() titulo: string;


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
    actions: {
      columnTitle: '',
      position: 'right',
      add: false,
      edit: false,
      delete: false,
      custom: [
        {
          name: 'view',
          title: '<i class="bi bi-eye"></i> ',
        },
      ],
    },
    columns: {
      data_hora_format: {
        width: '150px',
        title: 'Data - Hora',
        classContent: 'text-center'
      },
      usuario: {
        title: 'Usuários',
      },
      
    },
  };

  constructor(
    private _provider: ApiService,
    private _dialogService: NbDialogService,
    private _dialogRef: NbDialogRef<RespostasComponent>,
  ) { }

  close() {
    this._dialogRef.close();
  }

  getDados() {
    this.loading = true;
    this.source = new LocalDataSource();

    let url = 'respostas/?id_formulario=' + this.id_formulario;

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
    if (event.action == 'view') {
      // OPÇÃO PARA EDITAR
      this.showDialog(event.data.id_resposta, event.data.formulario);
    }
  }

  ngOnInit(): void {
    
    // CARREGAR DADOS NA TABELA
    this.getDados();
  
   }

  showDialog(id: number, formulario: string) {
    this._dialogService
      .open(ModalRespostasComponent, {
        context: {
          id: id,
          formulario: formulario,
        },
        closeOnEsc: true,
        hasBackdrop: true,
        closeOnBackdropClick: false,
        hasScroll: true,
      })
      .onClose.subscribe((update) => update && this.getDados());
  }
}
