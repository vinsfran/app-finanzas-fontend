import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MesesListComponent} from './list/meses-list.component';
import {MesesComponent} from './meses.component';
import {MesesFormComponent} from './form/meses-form.component';

const routes: Routes = [
  {
    path: '',
    component: MesesComponent,
    children: [
      {
        path: 'meses',
        component: MesesListComponent
      },
      {
        path: 'meses/form',
        component: MesesFormComponent
      },
      {
        path: 'meses/form/:id',
        component: MesesFormComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MesesRoutingModule {
}
