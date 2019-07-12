import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TarjetasListComponent} from './list/tarjetas-list.component';
import {TarjetasComponent} from './tarjetas.component';
import {TarjetasFormComponent} from './form/tarjetas-form.component';
import {VerDetallesTarjetaFormComponent} from './verDetalles/verDetallesTarjeta-form.component';

const routes: Routes = [
  {
    path: '',
    component: TarjetasComponent,
    children: [
      {
        path: 'tarjetas',
        component: TarjetasListComponent
      },
      {
        path: 'tarjetas/form',
        component: TarjetasFormComponent
      },
      {
        path: 'tarjetas/form/:id',
        component: TarjetasFormComponent
      },
      {
        path: 'tarjetas/detalles/:id',
        component: VerDetallesTarjetaFormComponent
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
