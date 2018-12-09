import { Component, OnInit } from "@angular/core";
import { TasksService } from "src/app/services/tasks.service";
import { Router } from "@angular/router";
import { TasksModel } from "src/app/models/tasks-model";
import { Title } from "@angular/platform-browser";
import { trigger, transition, style, query, animate,group } from '@angular/animations';

@Component({
  selector: "app-add-task",
  templateUrl: "./add-task.component.html",
  styleUrls: ["./add-task.component.sass"],
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

  constructor(
    private title: Title,
    private tasksService: TasksService,
    private router: Router
  ) {
    this.title.setTitle("Add Task");
  }

  ngOnInit() {}

  addTask() {
    this.tasksService.addNewTask(this.task);
    this.router.navigate(["/"]);
  }

  backtoHome() {}
}
