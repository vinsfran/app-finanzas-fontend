import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {PresupuestoModel} from '../presupuesto.model';
import {PresupuestosService} from '../../../../services/presupuestos.service';
import {MesModel} from '../../meses/mes.model';
import {MesesService} from '../../../../services/meses.service';
import {MonedasService} from '../../../../services/monedas.service';
import {MonedaModel} from '../../monedas/moneda.model';
import {AuthService} from '../../../../services/auth.service';

@Component({
  selector: 'app-presupuestos-form',
  templateUrl: './presupuestos-form.component.html',
  styleUrls: ['./presupuestos-form.component.css']
})
export class PresupuestosFormComponent implements OnInit {
  titulo: string;
  lista: string[];
  public errores: string[];

  meses: MesModel[];
  monedas: MonedaModel[];

  presupuestoModel: PresupuestoModel;

  constructor(private authService: AuthService,
              private presupuestosService: PresupuestosService,
              private mesesService: MesesService,
              private monedasService: MonedasService,
              private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.mesesService.getAll().subscribe(getAll => {
        this.meses = getAll;
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

    this.presupuestoModel = new PresupuestoModel();
    this.presupuestoModel.porcentajeAlerta = 50;

    this.titulo = 'Crear Presupuesto';
    this.cargarPresupuesto();
    this.lista = ['Presupuestos'];
    this.lista.push(this.titulo);
  }

  cargarPresupuesto(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.titulo = 'Editar Presupuesto Nro: ' + id;
        this.presupuestosService.get(id).subscribe((presupuestoModel) => this.presupuestoModel = presupuestoModel);
      }
    });
  }

  create(): void {
    this.presupuestoModel.usuarioId = this.authService.usuario.id;
    this.presupuestosService.create(this.presupuestoModel)
      .subscribe(presupuesto => {
          this.router.navigate(['/presupuestos']);
          swal.fire('Nuevo presupuesto', `El presupuesto: ${presupuesto.id} ha sido creada con exito`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  update(): void {
    this.presupuestosService.update(this.presupuestoModel)
      .subscribe(json => {
          console.error(json);
          this.router.navigate(['/presupuestos']);
          swal.fire(json.mensaje, `Presupuesto: ${json.presupuesto.nombre}`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  back() {
    this.router.navigate(['/presupuestos']);
  }

}
