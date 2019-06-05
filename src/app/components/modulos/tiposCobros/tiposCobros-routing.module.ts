import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TiposCobrosListComponent} from './list/tiposCobros-list.component';
import {TiposCobrosComponent} from './tiposCobros.component';
import {TiposCobrosFormComponent} from './form/tiposCobros-form.component';

const routes: Routes = [
  {
    path: '',
    component: TiposCobrosComponent,
    children: [
      {
        path: 'tipos-cobros',
        component: TiposCobrosListComponent
      },
      {
        path: 'tipos-cobros/form',
        component: TiposCobrosFormComponent
      },
      {
        path: 'tipos-cobros/form/:id',
        component: TiposCobrosFormComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TiposCobrosRoutingModule {
}
