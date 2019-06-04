import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientesListComponent} from './list/clientes-list.component';
import {ClientesComponent} from './clientes.component';
import {ClientesFormComponent} from './form/clientes-form.component';

const routes: Routes = [
  {
    path: '',
    component: ClientesComponent,
    children: [
      {
        path: 'clientes',
        component: ClientesListComponent
      },
      {
        path: 'clientes/form',
        component: ClientesFormComponent
      },
      {
        path: 'clientes/form/:id',
        component: ClientesFormComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule {
}
