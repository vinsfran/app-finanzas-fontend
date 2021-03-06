import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {PrestamoPagoModel} from '../prestamoPago.model';
import {PrestamosPagosService} from '../../../../services/prestamosPagos.service';
import {AuthService} from '../../../../services/auth.service';
import {PrestamosService} from '../../../../services/prestamos.service';
import {PrestamoModel} from '../../prestamos/prestamo.model';
import {TiposPagosService} from '../../../../services/tiposPagos.service';
import {TipoPagoModel} from '../../tiposPagos/tipoPago.model';

@Component({
  selector: 'app-prestamos-pagos-form',
  templateUrl: './prestamosPagos-form.component.html',
  styleUrls: ['./prestamosPagos-form.component.css']
})
export class PrestamosPagosFormComponent implements OnInit {
  titulo: string;
  lista: string[];
  public errores: string[];

  prestamoPagoModel: PrestamoPagoModel;

  prestamos: PrestamoModel[];
  tiposPagos: TipoPagoModel[];


  constructor(private authService: AuthService,
              private prestamosPagosService: PrestamosPagosService,
              private prestamosService: PrestamosService,
              private tiposPagosService: TiposPagosService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.prestamoPagoModel = new PrestamoPagoModel();
    this.prestamosService.getAll().subscribe(getAll => {
        this.prestamos = getAll;
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
    this.tiposPagosService.getAll().subscribe(getAll => {
        this.tiposPagos = getAll;
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
    this.titulo = 'Crear Prestamo Pago';
    this.cargar();
    this.lista = ['Prestamos Pago'];
    this.lista.push(this.titulo);
  }


  cargar(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.titulo = 'Editar Prestamo Pago Nro: ' + id;
        this.prestamosPagosService.get(id)
          .subscribe((prestamoPagoModel) => {
            this.prestamoPagoModel = prestamoPagoModel;
          });
      }
    });
  }

  create(): void {
    this.prestamoPagoModel.usuarioId = this.authService.usuario.id;
    console.log(JSON.stringify(this.prestamoPagoModel).toString());
    this.prestamosPagosService.create(this.prestamoPagoModel)
      .subscribe(prestamoPago => {
          this.prestamoPagoModel = prestamoPago;
          this.router.navigate(['/prestamos-pagos']);
          swal.fire('Nuevo Prestamo', `El Prestamo Pago: ${this.prestamoPagoModel.id} ha sido creado con exito`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  update(): void {
    this.prestamosPagosService.update(this.prestamoPagoModel)
      .subscribe(json => {
          console.error(json);
          this.router.navigate(['/prestamos-pagos']);
          swal.fire(json.mensaje, `Prestamo Pago: ${json.prestamo.nroPrestamo}`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  back() {
    this.router.navigate(['/prestamos-pagos']);
  }


  setEntidadFinancieraId($event) {
    console.log($event);

  }

  onChange(newValue) {
    console.log(newValue);
  }
}
