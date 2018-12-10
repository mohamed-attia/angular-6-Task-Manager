import { Injectable } from "@angular/core";
import { TasksModel } from "src/app/models/tasks-model";
import {MessageService} from '../shared/messaging/messaging.service';

@Injectable({
  providedIn: "root"
})
export class TasksService {
  public tasks: Array<TasksModel>;

  constructor(private messageService: MessageService) {
   this.tasks =  JSON.parse(localStorage.getItem('tasks')) || [];
  }

  public deleteTaskById(index) {
    this.tasks.splice(index, 1);
    setTimeout(()=>{
      this.messageService.success("Task Deleted Successfully");
    },500)
    this.saveAll()
  }

  public addNewTask(task) {
    this.tasks.push(task);
    setTimeout(()=>{
      this.messageService.success("Task Added Successfully");
    },500)
    this.saveAll();
  }

  public updateTask(id, newTask) {
    this.tasks[id] = newTask;
    setTimeout(()=>{
      this.messageService.success("Task Updated Successfully");
    },500)
    this.saveAll();
  }

  public saveAll() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks))
  }
}
