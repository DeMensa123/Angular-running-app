import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewStanoviskoFormComponent } from './new-stanovisko-form/new-stanovisko-form.component';
import { NewRunComponent } from './new-run/new-run.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { RunsComponent } from './runs/runs.component';
import { NewPrihlaskaComponent } from './new-prihlaska/new-prihlaska.component';
import { LoginComponent } from './login/login.component';
import { RegistraciaComponent } from './registracia/registracia.component';
import { TimGuard } from './tim.guard';
import { PrihlaskaGuard } from './prihlaska.guard';
import { StanoviskaComponent } from './stanoviska/stanoviska.component';
import { PrihlaskyComponent } from './prihlasky/prihlasky.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent}, 
  {path: 'registracia', component: RegistraciaComponent},   
  {path: 'behy', component: RunsComponent}, 
  {path: 'prihlasky', component: PrihlaskyComponent}, 
  {path: 'novy-beh', component: NewRunComponent, canActivate: [TimGuard]}, 
  {path: 'stanoviska', component: NewStanoviskoFormComponent, canActivate: [TimGuard]}, 
  {path: 'behy/beh/:id/stanoviska', component: StanoviskaComponent, pathMatch: 'full'}, 
  {path: 'nova-prihlaska', component: NewPrihlaskaComponent, canActivate: [PrihlaskaGuard]}, 
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
