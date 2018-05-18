import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AddTaskFormComponent } from './add-task-form/add-task-form.component';
import { TilesContainerComponent } from './tiles-container/tiles-container.component';

import { FormsModule } from '@angular/forms';
import { ChipInputComponent } from './chip-input/chip-input.component';
import { TileComponent } from './tiles-container/tile/tile.component';

@NgModule({
  declarations: [
    AppComponent,
    AddTaskFormComponent,
    TilesContainerComponent,
    ChipInputComponent,
    TileComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
