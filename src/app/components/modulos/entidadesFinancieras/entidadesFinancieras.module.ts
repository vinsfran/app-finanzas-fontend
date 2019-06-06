import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ContentHeaderModule} from '../widgets/content-header/content-header.module';
import {PaginationModule} from '../widgets/pagination/pagination.module';
import {EntidadesFinancierasRoutingModule} from './entidadesFinancieras-routing.module';
import {EntidadesFinancierasComponent} from './entidadesFinancieras.component';
import {EntidadesFinancierasListComponent} from './list/entidadesFinancieras-list.component';
import {EntidadesFinancierasFormComponent} from './form/entidadesFinancieras-form.component';
import {EntidadesFinancierasService} from '../../../services/entidadesFinancieras.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContentHeaderModule,
    PaginationModule,
    EntidadesFinancierasRoutingModule
  ],
  declarations: [
    EntidadesFinancierasComponent,
    EntidadesFinancierasFormComponent,
    EntidadesFinancierasListComponent
  ],
  providers: [
    EntidadesFinancierasService
  ]
})

export class EntidadesFinancierasModule {
}
