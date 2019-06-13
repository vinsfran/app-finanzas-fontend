import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConceptosListComponent} from './list/conceptos-list.component';
import {ConceptosComponent} from './conceptos.component';
import {ConceptosFormComponent} from './form/conceptos-form.component';

const routes: Routes = [
  {
    path: '',
    component: ConceptosComponent,
    children: [
      {
        path: 'conceptos',
        component: ConceptosListComponent
      },
      {
        path: 'conceptos/form',
        component: ConceptosFormComponent
      },
      {
        path: 'conceptos/form/:id',
        component: ConceptosFormComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConceptosRoutingModule {
}
