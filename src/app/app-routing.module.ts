import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AddTaskComponent } from "./add-task/add-task.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { TaskComponent } from "./task/task.component";
const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "add-task", component: AddTaskComponent },
  { path: "task/:id", component: TaskComponent },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
