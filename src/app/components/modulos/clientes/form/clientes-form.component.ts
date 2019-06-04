import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {ClienteModel} from '../cliente.model';
import {ClientesService} from '../../../../services/clientes.service';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {
  titulo: string;
  lista: string[];
  public errores: string[];

  // name = '';

  clienteModel: ClienteModel;

  constructor(private clientesService: ClientesService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.clienteModel = new ClienteModel();
    this.titulo = 'Crear Cliente';
    this.cargarCliente();
    this.lista = ['Clientes'];
    this.lista.push(this.titulo);
  }


  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.titulo = 'Editar Cliente Nro: ' + id;
        this.clientesService.getCliente(id).subscribe((clienteModel) => this.clienteModel = clienteModel);
      }
    });
  }

  create(): void {
    this.clientesService.create(this.clienteModel)
      .subscribe(cliente => {
          this.router.navigate(['/clientes']);
          swal.fire('Nuevo cliente', `El cliente: ${cliente.nombre} ha sido creado con exito`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  update(): void {
    this.clientesService.update(this.clienteModel)
      .subscribe(json => {
          console.error(json);
          this.router.navigate(['/clientes']);
          swal.fire(json.mensaje, `Cliente: ${json.cliente.nombre}`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  back() {
    this.router.navigate(['/clientes']);
  }

}
