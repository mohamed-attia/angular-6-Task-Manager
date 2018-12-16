import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TasksService } from "src/app/api/services/tasks.service";
import { TasksModel } from "src/app/api/models/tasks-model";
import { Title } from "@angular/platform-browser";
import { trigger, transition, style, query, animate,group } from '@angular/animations';
import {MessageService} from '../shared/messaging/messaging.service';
import {CheckMandatoryServiceService} from '../shared/mandatory/check-mandatory-service/check-mandatory-service.service';

@Component({
  selector: "app-task",
  templateUrl: "./edit-task.component.html",
  styleUrls: ["./edit-task.component.sass"],
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
export class TaskComponent implements OnInit {
  public taskId;
  public task: TasksModel = {};
  public isEdit: boolean = false;
  private validForm: boolean = false;

  constructor(
    private checkMandatorySer: CheckMandatoryServiceService,
    private title: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tasksService: TasksService,
    private messageService: MessageService
  ) {
    this.taskId = this.activatedRoute.snapshot.paramMap.get("id");
    this.getTaskById();
    this.title.setTitle(this.task.title + '- Task Manager');
  }

  ngOnInit() {}

  public getTaskById() {
    this.task = JSON.parse(localStorage.getItem('tasks'))[this.taskId];
  }

  public editTask() {
    if (this.isEdit) {
      this.tasksService.updateTask(this.taskId, this.task);
      this.router.navigate(["/"]);
    } else {
      this.messageService.warn("No changes !");
    }
  }

  public submitMandatory(form) {
    if (this.validForm && form.valid) {
      this.editTask();
    } else {
      this.checkMandatorySer.validate();
      if (this.validForm && form.valid) {
        this.editTask();
      }
    }
  }

  public checkValidityandSubmit(e) {
    if (e === true) {
      this.validForm = true;
    } else {
      this.validForm = false;
    }
  }

}
