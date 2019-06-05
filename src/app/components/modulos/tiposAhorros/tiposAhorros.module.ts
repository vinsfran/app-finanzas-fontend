import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ContentHeaderModule} from '../widgets/content-header/content-header.module';
import {PaginationModule} from '../widgets/pagination/pagination.module';
import {TiposAhorrosRoutingModule} from './tiposAhorros-routing.module';
import {TiposAhorrosComponent} from './tiposAhorros.component';
import {TiposAhorrosListComponent} from './list/tiposAhorros-list.component';
import {TiposAhorrosFormComponent} from './form/tiposAhorros-form.component';
import {TiposAhorrosService} from '../../../services/tiposAhorros.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContentHeaderModule,
    PaginationModule,
    TiposAhorrosRoutingModule
  ],
  declarations: [
    TiposAhorrosComponent,
    TiposAhorrosFormComponent,
    TiposAhorrosListComponent
  ],
  providers: [
    TiposAhorrosService
  ]
})

export class TiposAhorrosModule {
}
