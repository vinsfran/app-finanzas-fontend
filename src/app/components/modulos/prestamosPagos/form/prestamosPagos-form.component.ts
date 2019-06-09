import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {PrestamoPagoModel} from '../prestamoPago.model';
import {PrestamosService} from '../../../../services/prestamos.service';
import {MonedaModel} from '../../monedas/moneda.model';
import {MonedasService} from '../../../../services/monedas.service';
import {EntidadFinancieraModel} from '../../entidadesFinancieras/entidadFinanciera.model';
import {EntidadesFinancierasService} from '../../../../services/entidadesFinancieras.service';
import {AuthService} from '../../../../services/auth.service';

@Component({
  selector: 'app-prestamos-pagos-form',
  templateUrl: './prestamosPagos-form.component.html',
  styleUrls: ['./prestamosPagos-form.component.css']
})
export class PrestamosPagosFormComponent implements OnInit {
  titulo: string;
  lista: string[];
  public errores: string[];

  prestamoModel: PrestamoPagoModel;

  entidadesFinancieras: EntidadFinancieraModel[];

  monedas: MonedaModel[];
  monedaModel: MonedaModel;


  constructor(private authService: AuthService,
              private prestamosService: PrestamosService,
              private entidadesFinancierasService: EntidadesFinancierasService,
              private monedasService: MonedasService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.monedaModel = new MonedaModel();
    this.prestamoModel = new PrestamoPagoModel();
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
    this.titulo = 'Crear Prestamo';
    this.cargarPrestamo();
    this.lista = ['Prestamos'];
    this.lista.push(this.titulo);
  }


  cargarPrestamo(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.titulo = 'Editar Prestamo Nro: ' + id;
        this.prestamosService.getPrestamo(id)
          .subscribe((prestamoModel) => {
            this.prestamoModel = prestamoModel;
          });
      }
    });
  }

  create(): void {
    this.prestamoModel.usuarioId = this.authService.usuario.id;
    this.prestamoModel.estado = true;
    console.log(JSON.stringify(this.prestamoModel).toString());
    this.prestamosService.create(this.prestamoModel)
      .subscribe(prestamo => {
          this.router.navigate(['/prestamos']);
          swal.fire('Nuevo Prestamo', `El Prestamo: ${prestamo.id} ha sido creado con exito`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  update(): void {
    this.prestamosService.update(this.prestamoModel)
      .subscribe(json => {
          console.error(json);
          this.router.navigate(['/prestamos']);
          swal.fire(json.mensaje, `Prestamo: ${json.prestamo.nroPrestamo}`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  back() {
    this.router.navigate(['/prestamos']);
  }


  setEntidadFinancieraId($event) {
    console.log($event);

  }

  onChange(newValue) {
    console.log(newValue);
  }
}
