import { Injectable } from "@angular/core";
import { TasksModel } from "src/app/api/models/tasks-model";
import {MessageService} from '../../shared/messaging/messaging.service';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: "root"
})

export class TasksService {
  public tasks: Array<TasksModel>;

  constructor(private messageService: MessageService, private httpClient:HttpClient) {
   this.tasks =  JSON.parse(localStorage.getItem('tasks')) || [];
  }
//TODO: needs to be changes with firebase url
  public getData(){
    return this.httpClient.get('https://www.mocky.io/v2/5185415ba171ea3a00704eed');
  }
  public deleteTaskById(index) {
    this.tasks.splice(index, 1);
    setTimeout(()=>{
      this.messageService.success("Task Successfully Deleted ");
    },500)
    this.saveAll()
  }

  public addNewTask(task) {
    this.tasks.push(task);
    setTimeout(()=>{
      this.messageService.success("Task Successfully Added ");
    },500)
    this.saveAll();
  }

  public updateTask(id, newTask) {
    this.tasks[id] = newTask;
    setTimeout(()=>{
      this.messageService.success("Task Successfully Updated ");
    },500)
    this.saveAll();
  }

  public saveAll() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks))
  }
}
