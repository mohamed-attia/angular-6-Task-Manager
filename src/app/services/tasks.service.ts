import { Injectable } from "@angular/core";
import { TasksModel } from "src/app/models/tasks-model";

@Injectable({
  providedIn: "root"
})
export class TasksService {
  public tasks: Array<TasksModel>;

  constructor() {
   this.tasks =  JSON.parse(localStorage.getItem('tasks')) || [];
  }

  public deleteTaskById(index) {
    this.tasks.splice(index, 1);
    this.saveAll()
  }

  public addNewTask(task) {
    this.tasks.push(task);
    this.saveAll();
  }

  public updateTask(id, newTask) {
    this.tasks[id] = newTask;
    this.saveAll();
  }

  public saveAll() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks))
  }
}
