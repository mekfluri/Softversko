import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { MainComponent } from './components/main/main.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { OglasnaComponent } from './components/oglasna/oglasna.component';
import { PredmetiComponent } from './components/predmeti/predmeti.component';
import { PredmetPreviewComponent } from './components/predmet-preview/predmet-preview.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { KalendarComponent } from './components/kalendar/kalendar.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignInComponent },
  { path: "", component: MainComponent },
  { path: "profile", component: UserProfileComponent },
  { path: "oglasna", component: OglasnaComponent },
  { path: "predmeti", component: PredmetiComponent },
  { path: "predmet", component: PredmetPreviewComponent },
  { path: "kviz", component: QuizComponent },
  { path:"kalendar", component:KalendarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
