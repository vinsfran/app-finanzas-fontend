import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ContentHeaderComponent} from './content-header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ContentHeaderComponent
  ],
  exports: [
    ContentHeaderComponent
  ],
  providers: []
})

export class ContentHeaderModule {
}
