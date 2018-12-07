import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TasksService } from "src/app/services/tasks.service";
import { TasksModel } from "src/app/models/tasks-model";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.sass"]
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

  deleteTask() {
    this.tasksService.deleteTaskById(this.taskId);
    this.router.navigate(["/"]);
  }

  editTask() {
    this.tasksService.updateTask(this.taskId, this.task);
  }
}
