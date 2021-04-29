import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http'
import { SelectorPageComponent } from './pages/selector-page/selector-page.component';

import { PaisesRoutingModule } from './paises-routing.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SelectorPageComponent
  ],
  imports: [
    CommonModule,
    PaisesRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class PaisesModule { }
