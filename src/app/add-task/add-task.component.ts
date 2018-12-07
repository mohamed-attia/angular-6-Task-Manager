import { Component, OnInit } from "@angular/core";
import { TasksService } from "src/app/services/tasks.service";
import { Router } from "@angular/router";
import { TasksModel } from "src/app/models/tasks-model";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-add-task",
  templateUrl: "./add-task.component.html",
  styleUrls: ["./add-task.component.sass"]
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
