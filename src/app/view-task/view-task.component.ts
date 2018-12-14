import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TasksService } from "src/app/api/services/tasks.service";
import { TasksModel } from "src/app/api/models/tasks-model";
import { Title } from "@angular/platform-browser";
import { trigger, transition, style, query, animate,group } from '@angular/animations';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition('void => *', [
        style({
          opacity: 0,
        }),
        group([
          animate(1000, style({
            opacity: 1
          }))
        ])
      ])
    ])
  ]
})
export class ViewTaskComponent implements OnInit {
  public taskId;
  public task: TasksModel = {};
  constructor(
    private title: Title,
    private activatedRoute: ActivatedRoute,
    private tasksService: TasksService
  ) {
    this.taskId = this.activatedRoute.snapshot.paramMap.get("id");
    this.getTaskById();
    this.title.setTitle(this.task.title + '- Task Manager');
  }

  ngOnInit() { }

  getTaskById() {
    this.task = this.tasksService.tasks[this.taskId];
  }
  public getPriority(priority) {
    if (priority === 'high') {
      return 'red';
    } else if (priority === 'normal') {
      return 'orange';
    } else {
      return 'green';
    }
  }
}
