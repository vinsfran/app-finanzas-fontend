import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ContentHeaderModule} from '../widgets/content-header/content-header.module';
import {PaginationModule} from '../widgets/pagination/pagination.module';
import {ConceptosRoutingModule} from './conceptos-routing.module';
import {ConceptosComponent} from './conceptos.component';
import {ConceptosListComponent} from './list/conceptos-list.component';
import {ConceptosFormComponent} from './form/conceptos-form.component';
import {ConceptosService} from '../../../services/conceptos.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContentHeaderModule,
    PaginationModule,
    ConceptosRoutingModule
  ],
  declarations: [
    ConceptosComponent,
    ConceptosFormComponent,
    ConceptosListComponent,
  ],
  providers: [
    ConceptosService
  ]
})

export class ConceptosModule {
}
