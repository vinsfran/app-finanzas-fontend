import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {MonedaModel} from '../moneda.model';
import {MonedasService} from '../../../../services/monedas.service';

@Component({
  selector: 'app-monedas-form',
  templateUrl: './monedas-form.component.html',
  styleUrls: ['./monedas-form.component.css']
})
export class MonedasFormComponent implements OnInit {
  titulo: string;
  lista: string[];
  public errores: string[];

  // name = '';

  monedaModel: MonedaModel;

  constructor(private monedasService: MonedasService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.monedaModel = new MonedaModel();
    this.titulo = 'Crear Moneda';
    this.cargarMoneda();
    this.lista = ['Monedas'];
    this.lista.push(this.titulo);
  }


  cargarMoneda(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.titulo = 'Editar Moneda Nro: ' + id;
        this.monedasService.getMoneda(id).subscribe((monedaModel) => this.monedaModel = monedaModel);
      }
    });
  }

  create(): void {
    this.monedasService.create(this.monedaModel)
      .subscribe(moneda => {
          this.router.navigate(['/monedas']);
          swal.fire('Nueva moneda', `La moneda: ${moneda.descripcion} ha sido creada con exito`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  update(): void {
    this.monedasService.update(this.monedaModel)
      .subscribe(json => {
          console.error(json);
          this.router.navigate(['/monedas']);
          swal.fire(json.mensaje, `Moneda: ${json.moneda.nombre}`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  back() {
    this.router.navigate(['/monedas']);
  }

}
