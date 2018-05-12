import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AddTaskFormComponent } from './add-task-form/add-task-form.component';
import { TilesContainerComponent } from './tiles-container/tiles-container.component';

import { FormsModule } from '@angular/forms';
import { ChipInputComponent } from './chip-input/chip-input.component';

@NgModule({
  declarations: [
    AppComponent,
    AddTaskFormComponent,
    TilesContainerComponent,
    ChipInputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
