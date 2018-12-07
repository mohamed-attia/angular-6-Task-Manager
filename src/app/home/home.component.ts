import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public tasks = [];
  constructor(private tasksService: TasksService, private title: Title) { }

  ngOnInit() {
    this.tasks = this.tasksService.tasks;
    this.title.setTitle('Task Manager');
  }

  public deleteTask(index) {
    if(confirm("Are you sure to delete "+ this.tasks[index].title)) {
      this.tasksService.deleteTaskById(index)
    }
  }
}
