import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {CreditoModel} from '../credito.model';
import {CreditosService} from '../../../../services/creditos.service';
import {MonedaModel} from '../../monedas/moneda.model';
import {MonedasService} from '../../../../services/monedas.service';
import {EntidadFinancieraModel} from '../../entidadesFinancieras/entidadFinanciera.model';
import {EntidadesFinancierasService} from '../../../../services/entidadesFinancieras.service';

@Component({
  selector: 'app-creditos-form',
  templateUrl: './creditos-form.component.html',
  styleUrls: ['./creditos-form.component.css']
})
export class CreditosFormComponent implements OnInit {
  titulo: string;
  lista: string[];
  public errores: string[];

  creditoModel: CreditoModel;

  entidadesFinancieras: EntidadFinancieraModel[];

  monedas: MonedaModel[];
  monedaModel: MonedaModel;


  constructor(private creditosService: CreditosService,
              private entidadesFinancierasService: EntidadesFinancierasService,
              private monedasService: MonedasService,
              private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.monedaModel = new MonedaModel();
    this.creditoModel = new CreditoModel();
    this.entidadesFinancierasService.getAll().subscribe(getAll => {
        this.entidadesFinancieras = getAll;
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
    this.monedasService.getAll().subscribe(getAll => {
        this.monedas = getAll;
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
    this.titulo = 'Crear Credito';
    this.cargarCredito();
    this.lista = ['Creditos'];
    this.lista.push(this.titulo);
  }


  cargarCredito(): void {
    this.activatedRoute.params.subscribe(params => {
      const nroCredito = params['nroCredito'];
      if (nroCredito) {
        this.titulo = 'Editar Credito Nro: ' + nroCredito;
        this.creditosService.getCredito(nroCredito)
          .subscribe((creditoModel) => {
            this.creditoModel = creditoModel;
          });
      }
    });
  }

  create(): void {
    console.log(JSON.stringify(this.creditoModel).toString());
    this.creditosService.create(this.creditoModel)
      .subscribe(credito => {
          this.router.navigate(['/creditos']);
          swal.fire('Nuevo Credito', `El Credito: ${credito.nroCredito} ha sido creado con exito`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  update(): void {
    this.creditosService.update(this.creditoModel)
      .subscribe(json => {
          console.error(json);
          this.router.navigate(['/creditos']);
          swal.fire(json.mensaje, `Credito: ${json.credito.nroCredito}`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  back() {
    this.router.navigate(['/creditos']);
  }


  setEntidadFinancieraId($event) {
    console.log($event);

  }

  onChange(newValue) {
    console.log(newValue);
  }
}
