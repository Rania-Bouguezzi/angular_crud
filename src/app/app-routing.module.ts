import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UpdateFormComponent } from './update-form/update-form.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
{path:'', component:HomeComponent},
{path:'addUser', component:UserFormComponent},
{path:'updateUser/:id',component:UpdateFormComponent},
{path:':id', component:HomeComponent},
{path:'detail/:id', component:DetailsComponent}





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
