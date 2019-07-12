import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {PrestamosPagosService} from '../../../../services/prestamosPagos.service';
import {AuthService} from '../../../../services/auth.service';
import {PrestamoModel} from '../../prestamos/prestamo.model';
import {TiposPagosService} from '../../../../services/tiposPagos.service';
import {TipoPagoModel} from '../../tiposPagos/tipoPago.model';
import {PrestamoPagoModel} from '../../prestamosPagos/prestamoPago.model';
import {PrestamosService} from '../../../../services/prestamos.service';
import {PageModel} from '../../widgets/page.model';
import {MovimientosService} from '../../../../services/movimientos.service';
import {MovimientoModel} from '../../movimientos/movimiento.model';

@Component({
  selector: 'app-detalles-prestamo-form',
  templateUrl: './verDetallesPrestamo-form.component.html',
  styleUrls: ['./verDetallesPrestamo-form.component.css']
})
export class VerDetallesPrestamoFormComponent implements OnInit {
  titulo: string;
  lista: string[];
  public errores: string[];

  prestamo: PrestamoModel;
  prestamoPagoModel: PrestamoPagoModel;
  prestamoId: number;

  prestamos: PrestamoModel[];
  tiposPagos: TipoPagoModel[];
  movimientos: MovimientoModel[];

  campo: string;
  orden: string;
  page: PageModel;

  constructor(private authService: AuthService,
              private movimientosService: MovimientosService,
              private prestamosService: PrestamosService,
              private tiposPagosService: TiposPagosService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.campo = 'id';
    this.orden = 'asc';
    this.prestamo = new PrestamoModel();
    this.cargarPrestamo();

    // const datosRetorno = this.router.getNavigatedData();
    // this.prestamo = datosRetorno[0];
    this.prestamoPagoModel = new PrestamoPagoModel();
    this.tiposPagosService.getAll().subscribe(getAll => {
        this.tiposPagos = getAll;
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
    this.titulo = 'Ver Detalles';
    this.lista = ['Prestamos Pago'];
    this.lista.push(this.titulo);
  }


  cargarPrestamo(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.prestamosService.getPrestamo(id)
          .subscribe((prestamoModel) => {
            this.prestamo = prestamoModel;
            this.prestamoPagoModel.montoPagado = this.prestamo.montoCuota;
            this.prestamoId = this.prestamo.id;
            this.prestamoPagoModel.fechaPago = new Date();
            this.getMovimientosPageByPrestamoId(0, 10, this.campo, this.orden, this.prestamoId);
          });
      }
    });
  }

  getMovimientosPageByPrestamoId(page: number, size: number, campo: string, orden: string, prestamoId: number) {
    this.movimientosService.getMovimientosPageByPrestamoId(page, size, campo, orden, prestamoId).subscribe(
      response => {
        console.log(response);
        this.page = response.page;
        this.movimientos = this.page.content;
      },
      (errors) => {
        swal.fire('Ocurrió un error al listar los Movimientos', errors.message, 'error');
      }
    );
  }

  changePage(event) {
    this.getMovimientosPageByPrestamoId(0, 10, this.campo, this.orden, this.prestamoId);
  }

  create(): void {
    // this.prestamoPagoModel.usuarioId = this.authService.usuario.id;
    // this.prestamoPagoModel.prestamoId = this.prestamo.id;
    // this.prestamoPagoModel.numeroCuota = this.prestamo.cantidadCuotasPagadas + 1;
    // this.prestamosPagosService.create(this.prestamoPagoModel)
    //   .subscribe(prestamoPago => {
    //       this.prestamoPagoModel = prestamoPago;
    //       this.router.navigate(['/prestamos']);
    //       swal.fire('Prestamo Pagado', `La cuota: ${this.prestamoPagoModel.numeroCuota} ha sido ingresada con exito`, 'success');
    //     },
    //     err => {
    //       this.errores = err.error.errors as string[];
    //       console.error('Codigo del error desde el backend: ' + err.status);
    //       console.error(err.error.errors);
    //     }
    //   );
  }

  update(): void {
    // this.prestamosPagosService.update(this.prestamoPagoModel)
    //   .subscribe(json => {
    //       console.error(json);
    //       this.router.navigate(['/prestamos-pagos']);
    //       swal.fire(json.mensaje, `Prestamo Pago: ${json.prestamo.nroPrestamo}`, 'success');
    //     },
    //     err => {
    //       this.errores = err.error.errors as string[];
    //       console.error('Codigo del error desde el backend: ' + err.status);
    //       console.error(err.error.errors);
    //     }
    //   );
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
