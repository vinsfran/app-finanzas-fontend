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

@Component({
  selector: 'app-movimientos-form',
  templateUrl: './movimientos-form.component.html',
  styleUrls: ['./movimientos-form.component.css']
})
export class MovimientosFormComponent implements OnInit {
  titulo: string;
  lista: string[];
  public errores: string[];

  conceptos: ConceptoModel[];
  monedas: MonedaModel[];

  movimientoModel: MovimientoModel;

  constructor(private authService: AuthService,
              private movimientosService: MovimientosService,
              private conceptosService: ConceptosService,
              private monedasService: MonedasService,
              private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
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

    this.movimientoModel = new MovimientoModel();
    this.titulo = 'Crear Movimiento';
    this.cargarMovimiento();
    this.lista = ['Movimientos'];
    this.lista.push(this.titulo);
  }

  cargarMovimiento(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.titulo = 'Editar Movimiento Nro: ' + id;
        this.movimientosService.get(id).subscribe((movimientoModel) => this.movimientoModel = movimientoModel);
      }
    });
  }

  create(): void {
    this.movimientoModel.usuarioId = this.authService.usuario.id;
    this.movimientosService.create(this.movimientoModel)
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
    this.movimientosService.update(this.movimientoModel)
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

}
