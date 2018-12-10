import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TasksService } from "src/app/services/tasks.service";
import { TasksModel } from "src/app/models/tasks-model";
import { Title } from "@angular/platform-browser";
import { trigger, transition, style, query, animate,group } from '@angular/animations';

@Component({
  selector: "app-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.sass"],
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
  constructor(
    private title: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tasksService: TasksService
  ) {
    this.taskId = this.activatedRoute.snapshot.paramMap.get("id");
    this.getTaskById();
    this.title.setTitle(this.task.title + '- Task Manager');
  }

  ngOnInit() {

  }

  getTaskById() {
    this.task = this.tasksService.tasks[this.taskId];
  }

  editTask() {
    this.tasksService.updateTask(this.taskId, this.task);
    this.router.navigate(["/"]);
  }
}