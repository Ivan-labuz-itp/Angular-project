import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared.module'

import { ModalRoutingModule } from './modal-routing.module';
import { ModalComponent } from './modal.component';

@NgModule({
  imports: [
    CommonModule,
    ModalRoutingModule,
    SharedModule
  ],
  exports: [ModalComponent],
  declarations: [ModalComponent],
  entryComponents: [ModalComponent],
})
export class ModalModule { }