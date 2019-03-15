import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader';
//--- components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TaskComponent } from './edit-task/edit-task.component';

//--- shared
import { AlertComponent } from './shared/messaging/messaging.component';
import { MessageService } from './shared/messaging/messaging.service';
import {CheckMandatoryServiceService} from './shared/mandatory/check-mandatory-service/check-mandatory-service.service';
import {MandatoryFormGroupDirective} from './shared/mandatory/mandatory-form-group/mandatory-form-group.directive';
import {MandatoryInputsDirective} from './shared/mandatory/mandatory-inputs/mandatory-inputs.directive';

import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from './shared/confirmation-dialog/confirmation.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
    AlertComponent,
    ConfirmationDialogComponent,
    MandatoryFormGroupDirective,
    MandatoryInputsDirective
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    NgHttpLoaderModule.forRoot(),
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  exports:[
    MandatoryFormGroupDirective,
    MandatoryInputsDirective],
  providers: [MessageService, ConfirmationDialogService],
  bootstrap: [AppComponent],
  entryComponents: [ ConfirmationDialogComponent ],
})
export class AppModule { }
