import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ContentHeaderModule} from '../widgets/content-header/content-header.module';
import {PaginationModule} from '../widgets/pagination/pagination.module';
import {ClientesRoutingModule} from './clientes-routing.module';
import {ClientesComponent} from './clientes.component';
import {ClientesListComponent} from './list/clientes-list.component';
import {ClientesFormComponent} from './form/clientes-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContentHeaderModule,
    PaginationModule,
    ClientesRoutingModule
  ],
  declarations: [
    ClientesComponent,
    ClientesFormComponent,
    ClientesListComponent
  ],
  providers: []
})

export class ClientesModule {
}
