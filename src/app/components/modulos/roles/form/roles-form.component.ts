import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {RolModel} from '../rol.model';
import {RolesService} from '../../../../services/roles.service';

@Component({
  selector: 'app-rol-form',
  templateUrl: './roles-form.component.html',
  styleUrls: ['./roles-form.component.css']
})
export class RolesFormComponent implements OnInit {
  titulo: string;
  lista: string[];
  public errores: string[];

  rolModel: RolModel;

  constructor(private rolesService: RolesService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.rolModel = new RolModel();
    this.titulo = 'Crear Cliente';
    this.cargarCliente();
    this.lista = ['Roles'];
    this.lista.push(this.titulo);
  }


  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.titulo = 'Editar Cliente Nro: ' + id;
        this.rolesService.getRol(id).subscribe((rolModel) => this.rolModel = rolModel);
      }
    });
  }

  create(): void {
    this.rolesService.create(this.rolModel)
      .subscribe(rol => {
          this.router.navigate(['/roles']);
          swal.fire('Nuevo rol', `El rol: ${rol.nombre} ha sido creado con exito`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  update(): void {
    this.rolesService.update(this.rolModel)
      .subscribe(json => {
          console.error(json);
          this.router.navigate(['/roles']);
          swal.fire(json.mensaje, `Cliente: ${json.rol.nombre}`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  back() {
    this.router.navigate(['/roles']);
  }

}
