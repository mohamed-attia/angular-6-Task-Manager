import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TaskComponent } from './task/task.component';
import { AlertComponent } from './shared/messaging/messaging.component';
import { MessageService } from './shared/messaging/messaging.service';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ViewTaskComponent } from './view-task/view-task.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddTaskComponent,
    NotFoundComponent,
    TaskComponent,
    ViewTaskComponent,
    AlertComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }