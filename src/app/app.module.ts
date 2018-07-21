import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AddTaskFormComponent } from './add-task-form/add-task-form.component';
import { TilesContainerComponent } from './tiles-container/tiles-container.component';

import { FormsModule } from '@angular/forms';
import { ChipInputComponent } from './chip-input/chip-input.component';
import { TileComponent } from './tiles-container/tile/tile.component';
import { NameInitialsPipe } from './name-initials.pipe';
import { ShortenPipe } from './shorten.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AddTaskFormComponent,
    TilesContainerComponent,
    ChipInputComponent,
    TileComponent,
    NameInitialsPipe,
    ShortenPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
