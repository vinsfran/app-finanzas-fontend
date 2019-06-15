import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {AhorroModel} from '../ahorro.model';
import {AhorrosService} from '../../../../services/ahorros.service';
import {MonedaModel} from '../../monedas/moneda.model';
import {MonedasService} from '../../../../services/monedas.service';
import {EntidadFinancieraModel} from '../../entidadesFinancieras/entidadFinanciera.model';
import {EntidadesFinancierasService} from '../../../../services/entidadesFinancieras.service';
import {AuthService} from '../../../../services/auth.service';
import {TipoAhorroModel} from '../../tiposAhorros/tipoAhorro.model';
import {TipoCobroModel} from '../../tiposCobros/tipoCobro.model';
import {TiposAhorrosService} from '../../../../services/tiposAhorros.service';
import {TiposCobrosService} from '../../../../services/tiposCobros.service';

@Component({
  selector: 'app-ahorros-form',
  templateUrl: './ahorros-form.component.html',
  styleUrls: ['./ahorros-form.component.css']
})
export class AhorrosFormComponent implements OnInit {
  titulo: string;
  lista: string[];
  public errores: string[];

  ahorroModel: AhorroModel;

  entidadesFinancieras: EntidadFinancieraModel[];
  tipoAhorros: TipoAhorroModel[];
  tipoCobros: TipoCobroModel[];
  monedas: MonedaModel[];
  monedaModel: MonedaModel;


  constructor(private authService: AuthService,
              private ahorrosService: AhorrosService,
              private tiposAhorrosService: TiposAhorrosService,
              private monedasService: MonedasService,
              private entidadesFinancierasService: EntidadesFinancierasService,
              private tiposCobrosService: TiposCobrosService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.monedaModel = new MonedaModel();
    this.ahorroModel = new AhorroModel();
    this.tiposAhorrosService.getAll().subscribe(getAll => {
        this.tipoAhorros = getAll;
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
    this.entidadesFinancierasService.getAll().subscribe(getAll => {
        this.entidadesFinancieras = getAll;
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
    this.tiposCobrosService.getAll().subscribe(getAll => {
        this.tipoCobros = getAll;
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
    this.titulo = 'Crear Ahorro';
    this.cargarAhorro();
    this.lista = ['Ahorros'];
    this.lista.push(this.titulo);
  }


  cargarAhorro(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.titulo = 'Editar Ahorro Nro: ' + id;
        this.ahorrosService.getAhorro(id)
          .subscribe((ahorroModel) => {
            this.ahorroModel = ahorroModel;
          });
      }
    });
  }

  create(): void {
    this.ahorroModel.usuarioId = this.authService.usuario.id;
    this.ahorrosService.create(this.ahorroModel)
      .subscribe(ahorro => {
          this.router.navigate(['/ahorros']);
          swal.fire('Nuevo Ahorro', `El Ahorro: ${ahorro.id} ha sido creado con exito`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  update(): void {
    this.ahorrosService.update(this.ahorroModel)
      .subscribe(json => {
          console.error(json);
          this.router.navigate(['/ahorros']);
          swal.fire(json.mensaje, `Ahorro: ${json.ahorro.nroAhorro}`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  back() {
    this.router.navigate(['/ahorros']);
  }
}
