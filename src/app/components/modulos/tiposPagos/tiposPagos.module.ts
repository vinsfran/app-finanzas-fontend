import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ContentHeaderModule} from '../widgets/content-header/content-header.module';
import {PaginationModule} from '../widgets/pagination/pagination.module';
import {TiposPagosRoutingModule} from './tiposPagos-routing.module';
import {TiposPagosComponent} from './tiposPagos.component';
import {TiposPagosListComponent} from './list/tiposPagos-list.component';
import {TiposPagosFormComponent} from './form/tiposPagos-form.component';
import {TiposPagosService} from '../../../services/tiposPagos.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContentHeaderModule,
    PaginationModule,
    TiposPagosRoutingModule
  ],
  declarations: [
    TiposPagosComponent,
    TiposPagosFormComponent,
    TiposPagosListComponent
  ],
  providers: [
    TiposPagosService
  ]
})

export class TiposPagosModule {
}
