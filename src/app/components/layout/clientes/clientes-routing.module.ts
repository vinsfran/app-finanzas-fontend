import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ClientesListComponent} from './list/clientes-list.component';
import {ClientesComponent} from './clientes.component';
import {ClientesFormNewComponent} from './new/clientes-form-new.component';
import {ClientesFormEditComponent} from './edit/clientes-form-edit.component';

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
        path: 'clientes/new',
        component: ClientesFormNewComponent
      },
      {
        path: 'clientes/edit',
        component: ClientesFormEditComponent
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
