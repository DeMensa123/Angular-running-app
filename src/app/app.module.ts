import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LocalStorageModule } from 'angular-2-local-storage';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RunsComponent } from './runs/runs.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NewRunComponent } from './new-run/new-run.component';
import { NewStanoviskoFormComponent } from './new-stanovisko-form/new-stanovisko-form.component';
import { NewPrihlaskaComponent } from './new-prihlaska/new-prihlaska.component';
import { LoginComponent } from './login/login.component';
import { RegistraciaComponent } from './registracia/registracia.component';
import { TimInterceptor } from './tim.interceptor';
import { StanoviskaComponent } from './stanoviska/stanoviska.component';
import { PrihlaskyComponent } from './prihlasky/prihlasky.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    NotFoundComponent,
    RunsComponent,
    NewRunComponent,
    NewStanoviskoFormComponent,
    NewPrihlaskaComponent,
    LoginComponent,
    RegistraciaComponent,
    StanoviskaComponent,
    PrihlaskyComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    LocalStorageModule.forRoot({
      prefix: 'fsa-project-app',
      storageType: 'localStorage',
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TimInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
