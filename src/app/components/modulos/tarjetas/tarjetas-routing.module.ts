import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TarjetasListComponent} from './list/tarjetas-list.component';
import {TarjetasComponent} from './tarjetas.component';
import {TarjetasFormComponent} from './form/tarjetas-form.component';

const routes: Routes = [
  {
    path: '',
    component: TarjetasComponent,
    children: [
      {
        path: 'ahorros',
        component: TarjetasListComponent
      },
      {
        path: 'ahorros/form',
        component: TarjetasFormComponent
      },
      {
        path: 'ahorros/form/:id',
        component: TarjetasFormComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TarjetasRoutingModule {
}
