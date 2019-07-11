import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {MovimientoModel} from '../movimiento.model';
import {MovimientosService} from '../../../../services/movimientos.service';
import {ConceptoModel} from '../../conceptos/concepto.model';
import {ConceptosService} from '../../../../services/conceptos.service';
import {MonedasService} from '../../../../services/monedas.service';
import {MonedaModel} from '../../monedas/moneda.model';
import {AuthService} from '../../../../services/auth.service';
import {TipoPagoModel} from '../../tiposPagos/tipoPago.model';
import {TiposPagosService} from '../../../../services/tiposPagos.service';
import {PrestamosService} from '../../../../services/prestamos.service';
import {PrestamoModel} from '../../prestamos/prestamo.model';
import {AhorroModel} from '../../ahorros/ahorro.model';
import {AhorrosService} from '../../../../services/ahorros.service';
import {TarjetaModel} from '../../tarjetas/tarjeta.model';
import {TarjetasService} from '../../../../services/tarjetas.service';

@Component({
  selector: 'app-movimientos-form',
  templateUrl: './movimientos-form.component.html',
  styleUrls: ['./movimientos-form.component.css']
})
export class MovimientosFormComponent implements OnInit {
  titulo: string;
  lista: string[];
  public errores: string[];

  prestamos: PrestamoModel[];
  ahorros: AhorroModel[];
  tarjetas: TarjetaModel[];
  conceptos: ConceptoModel[];
  monedas: MonedaModel[];
  tiposPagos: TipoPagoModel[];

  movimiento: MovimientoModel;
  prestamo: PrestamoModel;
  ahorro: AhorroModel;
  tarjeta: TarjetaModel;
  concepto: ConceptoModel;

  mostrarNroCuota: boolean;

  constructor(private authService: AuthService,
              private movimientosService: MovimientosService,
              private conceptosService: ConceptosService,
              private monedasService: MonedasService,
              private tiposPagosService: TiposPagosService,
              private prestamosService: PrestamosService,
              private ahorrosService: AhorrosService,
              private tarjetasService: TarjetasService,
              private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.movimiento = new MovimientoModel();
    this.prestamo = new PrestamoModel();
    this.ahorro = new AhorroModel();
    this.concepto = new ConceptoModel();

    this.conceptosService.getAll().subscribe(getAll => {
        this.conceptos = getAll;
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

    this.tiposPagosService.getAll().subscribe(getAll => {
        this.tiposPagos = getAll;
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );

    this.prestamosService.getAll().subscribe(getAll => {
        this.prestamos = getAll;
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );

    this.ahorrosService.getAll().subscribe(getAll => {
        this.ahorros = getAll;
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );

    this.tarjetasService.getAll().subscribe(getAll => {
        this.tarjetas = getAll;
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );

    this.titulo = 'Crear Movimiento';
    this.cargarMovimiento();
    this.lista = ['Movimientos'];
    this.lista.push(this.titulo);
    this.clearForm();
  }

  cargarMovimiento(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.titulo = 'Editar Movimiento Nro: ' + id;
        this.movimientosService.get(id).subscribe((movimiento) => this.movimiento = movimiento);
      }
    });
  }

  create(): void {
    this.movimiento.usuarioId = this.authService.usuario.id;
    this.movimiento.codigoConcepto = this.concepto.codigoConcepto;
    this.movimientosService.create(this.movimiento)
      .subscribe(movimiento => {
          this.router.navigate(['/movimientos']);
          swal.fire('Nuevo movimiento', `El movimiento: ${movimiento.id} ha sido creada con exito`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  update(): void {
    this.movimientosService.update(this.movimiento)
      .subscribe(json => {
          console.error(json);
          this.router.navigate(['/movimientos']);
          swal.fire(json.mensaje, `Movimiento: ${json.movimiento.nombre}`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  back() {
    this.router.navigate(['/movimientos']);
  }

  onChangePrestamo() {
    this.prestamo = this.prestamos.find(prestamo => prestamo.id == this.movimiento.prestamoId);
    this.movimiento.nombreEntidad = this.prestamo.entidadFinancieraNombre;
    this.movimiento.montoPagado = this.prestamo.montoCuota;
    this.movimiento.numeroCuota = this.prestamo.cantidadCuotasPagadas + 1;
  }

  onChangeAhorro() {
    this.ahorro = this.ahorros.find(ahorro => ahorro.id == this.movimiento.ahorroId);
    this.movimiento.nombreEntidad = this.ahorro.entidadFinancieraNombre;
    this.movimiento.montoPagado = this.ahorro.montoCuota;
    this.movimiento.numeroCuota = this.ahorro.cantidadCuotasPagadas + 1;
  }

  onChangeTarjeta() {
    this.tarjeta = this.tarjetas.find(tarjeta => tarjeta.id == this.movimiento.tarjetaId);
    this.movimiento.nombreEntidad = this.tarjeta.entidadFinancieraNombre;
  }

  onChangeMovimiento() {
    this.concepto = this.conceptos.find(concepto => concepto.id == this.movimiento.conceptoId);
    this.movimiento.codigoConcepto = this.concepto.codigoConcepto;
    if (this.concepto.codigoConcepto === 'PP' || this.concepto.codigoConcepto === 'PA') {
      this.mostrarNroCuota = true;
    }else {
      this.mostrarNroCuota = false;
    }
    this.clearForm();
  }

  clearForm() {
    // this.movimiento.codigoConcepto = 'PS';
    this.movimiento.prestamoId = 0;
    this.movimiento.ahorroId = 0;
    this.movimiento.numeroCuota = 0;
    this.movimiento.numeroComprobante = '';
    this.movimiento.fechaMovimiento = new Date();
    this.movimiento.montoPagado = 0;
    this.movimiento.monedaId = 1;
    this.movimiento.nombreEntidad = '';
    this.movimiento.tipoPagoId = 1;

  }


}
