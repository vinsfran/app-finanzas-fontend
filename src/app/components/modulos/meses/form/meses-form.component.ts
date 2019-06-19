import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {MesModel} from '../mes.model';
import {MesesService} from '../../../../services/meses.service';

@Component({
  selector: 'app-meses-form',
  templateUrl: './meses-form.component.html',
  styleUrls: ['./meses-form.component.css']
})
export class MesesFormComponent implements OnInit {
  titulo: string;
  lista: string[];
  public errores: string[];

  // name = '';

  mesModel: MesModel;

  constructor(private mesesService: MesesService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.mesModel = new MesModel();
    this.titulo = 'Crear Mes';
    this.cargarMes();
    this.lista = ['Meses'];
    this.lista.push(this.titulo);
  }


  cargarMes(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.titulo = 'Editar Mes Nro: ' + id;
        this.mesesService.get(id).subscribe((mesModel) => this.mesModel = mesModel);
      }
    });
  }

  create(): void {
    this.mesesService.create(this.mesModel)
      .subscribe(mes => {
          this.router.navigate(['/meses']);
          swal.fire('Nuevo mes', `El mes: ${mes.nombre} ha sido creado con exito`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  update(): void {
    this.mesesService.update(this.mesModel)
      .subscribe(json => {
          console.error(json);
          this.router.navigate(['/meses']);
          swal.fire(json.mensaje, `Mes: ${json.mes.nombre}`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  back() {
    this.router.navigate(['/meses']);
  }

}
