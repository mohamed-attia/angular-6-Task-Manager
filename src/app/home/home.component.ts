import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { Title } from '@angular/platform-browser';
import { trigger, transition, style, query, animate, group,state } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('s1', style({
        opacity: 0
      })),
      state('s2', style({
        opacity: 1
      })),
      transition('s1=>s2',animate(1000))
    ])
  ]
})
export class HomeComponent implements OnInit {
  public tasks = [];
  public state = 's1';
  constructor(private tasksService: TasksService, private title: Title) { }

  ngOnInit() {
    this.tasks = this.tasksService.tasks;
    this.title.setTitle('Task Manager');
    setTimeout(()=>{
      this.state = 's2';
    },100)
  }

  public deleteTask(index) {
    if (confirm("Are you sure to delete " + this.tasks[index].title)) {
      this.tasksService.deleteTaskById(index);
    }
  }

}
