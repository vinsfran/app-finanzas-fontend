import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TiposAhorrosListComponent} from './list/tiposAhorros-list.component';
import {TiposAhorrosComponent} from './tiposAhorros.component';
import {TiposAhorrosFormComponent} from './form/tiposAhorros-form.component';

const routes: Routes = [
  {
    path: '',
    component: TiposAhorrosComponent,
    children: [
      {
        path: 'tipos-ahorros',
        component: TiposAhorrosListComponent
      },
      {
        path: 'tipos-ahorros/form',
        component: TiposAhorrosFormComponent
      },
      {
        path: 'tipos-ahorros/form/:id',
        component: TiposAhorrosFormComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TiposAhorrosRoutingModule {
}
