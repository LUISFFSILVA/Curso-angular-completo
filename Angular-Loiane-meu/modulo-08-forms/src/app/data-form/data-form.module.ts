import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataFormComponent } from '../data-form/data-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShareModule } from '../share/share.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    DataFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ShareModule,
    HttpClientModule
  ]
})
export class DataFormModule { }
