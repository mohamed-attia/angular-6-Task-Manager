import { Component, OnInit } from "@angular/core";
import { TasksService } from "src/app/api/services/tasks.service";
import { Router } from "@angular/router";
import { TasksModel } from "src/app/api/models/tasks-model";
import { Title } from "@angular/platform-browser";
import { trigger, transition, style, query, animate,group } from '@angular/animations';
import {CheckMandatoryServiceService} from '../shared/mandatory/check-mandatory-service/check-mandatory-service.service';

@Component({
  selector: "app-add-task",
  templateUrl: "./add-task.component.html",
  styleUrls: ["./add-task.component.scss"],
  providers: [CheckMandatoryServiceService],
  animations: [
    trigger('fadeIn', [
      transition('void => *', [
        style({
          opacity: 0,
        }),
          animate(1000, style({
            opacity: 1
          }))
      ])
    ])
  ]
})
export class AddTaskComponent implements OnInit {
  public task: TasksModel = {};
  private validForm: boolean = false;

  constructor(
    private checkMandatorySer: CheckMandatoryServiceService,
    private title: Title,
    private tasksService: TasksService,
    private router: Router
  ) {
    this.title.setTitle("Add Task");
  }

  ngOnInit() {}

  public addTask() {
    this.tasksService.addNewTask(this.task);
    this.router.navigate(["/"]);
  }

  public submitMandatory(form) {
    debugger
    if (this.validForm && form.valid) {
      this.addTask();
    } else {
      this.checkMandatorySer.validate();
      if (this.validForm && form.valid) {
        this.addTask();
      }
    }
  }

  checkValidityandSubmit(e) {
    if (e === true) {
      this.validForm = true;
    } else {
      this.validForm = false;
    }
  }
}
