import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'; 

import { AppComponent } from './app.component';
import { AddTaskFormComponent } from './add-task-form/add-task-form.component';
import { EditTaskFormComponent } from './edit-task-form/edit-task-form.component';
import { TilesContainerComponent } from './tiles-container-wrapper/tiles-container/tiles-container.component';

import { FormsModule } from '@angular/forms';
import { ChipInputComponent } from './chip-input/chip-input.component';
import { TileComponent } from './tiles-container-wrapper/tiles-container/tile/tile.component';
import { NameInitialsPipe } from '../pipes/name-initials.pipe';
import { ShortenPipe } from '../pipes/shorten.pipe';
import { TilesContainerWrapperComponent } from './tiles-container-wrapper/tiles-container-wrapper.component';
import { NgDragDropModule } from 'ng-drag-drop';
import { ClickOutsideModule } from 'ng-click-outside';
import { ModalComponent } from './modal/modal.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FilterTaskFormComponent } from './filter-task-form/filter-task-form.component';
import { TagsContainerComponent } from './filter-task-form/tags-container/tags-container.component';
import { TagComponent } from './filter-task-form/tags-container/tag/tag.component';

@NgModule({
  declarations: [
    AppComponent,
    AddTaskFormComponent,
    EditTaskFormComponent,
    TilesContainerComponent,
    ChipInputComponent,
    TileComponent,
    NameInitialsPipe,
    ShortenPipe,
    TilesContainerWrapperComponent,
    ModalComponent,
    FilterTaskFormComponent,
    TagsContainerComponent,
    TagComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule.forRoot(),
    NgDragDropModule.forRoot(),
    ClickOutsideModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
