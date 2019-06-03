import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ContentHeaderModule} from '../widgets/content-header/content-header.module';
import {PaginationModule} from '../widgets/pagination/pagination.module';
import {ClientesRoutingModule} from './clientes-routing.module';
import {ClientesComponent} from './clientes.component';
import {ClientesFormEditComponent} from './edit/clientes-form-edit.component';
import {ClientesListComponent} from './list/clientes-list.component';
import {ClientesFormNewComponent} from './new/clientes-form-new.component';
import {ClientesService} from '../../../services/clientes.service';

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
    ClientesFormEditComponent,
    ClientesListComponent,
    ClientesFormNewComponent
  ],
  providers: [
    ClientesService
  ]
})

export class ClientesModule {
}
