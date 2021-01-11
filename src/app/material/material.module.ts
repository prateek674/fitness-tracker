import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  imports: [
    MatButtonModule, 
    MatIconModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatDatepickerModule,
    MatCheckboxModule,
    MatNativeDateModule
  ],
  exports: [
    MatButtonModule, 
    MatIconModule, 
    MatFormFieldModule,
    MatInputModule, 
    MatDatepickerModule,
    MatCheckboxModule,
    MatNativeDateModule
  ]
})
export class MaterialModule { }
