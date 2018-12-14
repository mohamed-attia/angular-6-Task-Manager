import { Component, OnInit } from "@angular/core";
import { TasksService } from "src/app/api/services/tasks.service";
import { Title } from "@angular/platform-browser";
import {
  trigger,
  transition,
  style,
  query,
  animate,
  group,
  state
} from "@angular/animations";
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  animations: [
    trigger("fadeIn", [
      state(
        "s1",
        style({
          opacity: 0
        })
      ),
      state(
        "s2",
        style({
          opacity: 1
        })
      ),
      transition("s1=>s2", animate(1000))
    ])
  ]
})
export class HomeComponent implements OnInit {
  public tasks = [];
  public state = "s1";
  public totalHigh: number = 0;
  public totalNormal: number = 0;
  public totalLow: number = 0;
  constructor(private confirmationDialogService: ConfirmationDialogService,
    private tasksService: TasksService, private title: Title) { }

  ngOnInit() {
    this.getTasks();
    this.title.setTitle("Task Manager");
    setTimeout(() => {
      this.state = "s2";
    }, 100);
  }

  public getTasks() {
    this.tasks = this.tasksService.tasks;
    this.getTaskNumber();
  }

  public deleteTask(index) {
    this.confirmationDialogService.confirm(
      'Delete',
      'Do you really want to delete ' + this.tasks[index].title + '?',undefined,undefined,'md')
      .then((confirmed) => {
        if (confirmed) {
          this.tasksService.deleteTaskById(index);
          this.getTasks();
        } else {
          return
        }
      })
      .catch(() => { return });
  }

  public getTaskNumber() {
    this.totalHigh = 0;
    this.totalLow = 0;
    this.totalNormal = 0;
    if (this.tasksService.tasks.length) {
      debugger
      for (let i = 0; i < this.tasksService.tasks.length; i++) {
        if (this.tasksService.tasks[i].priority === "high") {
          this.totalHigh++;
        } else if (this.tasksService.tasks[i].priority === "normal") {
          this.totalNormal++;
        } else {
          this.totalLow++;
        }
      }
    }
  }

  public getPriority(priority) {
    if (priority === "high") {
      return "red";
    } else if (priority === "normal") {
      return "orange";
    } else {
      return "green";
    }
  }
}
