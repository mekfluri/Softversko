import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { MainComponent } from './components/main/main.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { OglasnaComponent } from './components/oglasna/oglasna.component';
import { PredmetiComponent } from './components/predmeti/predmeti.component';
import { PredmetPreviewComponent } from './components/predmet-preview/predmet-preview.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { TagOperationsComponent } from './components/tag-operations/tag-operations.component';
import { PredmetOperationsComponent } from './components/predmet-operations/predmet-operations.component';
import { ErrorComponent } from './components/error/error.component';
import { KalendarComponent } from './components/kalendar/kalendar.component';
import { LiteraturaComponent } from './components/literatura/literatura.component';
import { ModulOperationsComponent } from './components/modul-operations/modul-operations.component';
import { DodajLiteraturuComponent } from './components/dodaj-literaturu/dodaj-literaturu.component';
import { ZahteviComponent } from './components/zahtevi/zahtevi.component';
import { KomentariComponent } from './components/komentari/komentari.component';
import { LiteraturaOperationsComponent } from './components/literatura-operations/literatura-operations.component';
import { StudentOperationsComponent } from './components/student-operations/student-operations.component';
import { PreferencesComponent } from './components/preferences/preferences.component';
import { UploadComponent } from './components/upload/upload.component';
import { MentorOperationsComponent } from './components/mentor-operations/mentor-operations.component';
import { LiteraturaUserComponent } from './components/literatura-user/literatura-user.component';
import { KomentariUserComponent } from './components/komentari-user/komentari-user.component';
import { MentorRequestComponent } from './components/mentor-request/mentor-request.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignInComponent },
  { path: "", component: MainComponent },
  { path: "zahtevi", component: ZahteviComponent },
  { path: "dodajLiteraturu/:predmetId", component: DodajLiteraturuComponent },
  {
    path: "profile/:userId", component: UserProfileComponent, children: [
      {
        path: "kalendar", component: KalendarComponent
      },
      {
        path: "preference", component: PreferencesComponent
      },
      {
        path: "literatura-user", component: LiteraturaUserComponent
      },
      {
        path: "komentari-user", component: KomentariUserComponent
      }
    ]
  },
  {
    path: "me", component: UserProfileComponent, children: [
      {
        path: "kalendar", component: KalendarComponent
      },
      {
        path: "preference", component: PreferencesComponent
      }
   
    ]
  },

  {  path: "upload", component: UploadComponent},
  { path: "oglasna", component: OglasnaComponent },
  {
    path: 'literatura/:predmetId',
    component: LiteraturaComponent
  }
  ,
  { path: "predmeti", component: PredmetiComponent },
  { path: "predmet", component: PredmetPreviewComponent },
  { path: "kviz", component: QuizComponent },
  { path: "admin/login", component: AdminLoginComponent },
  {
    path: "admin",
    component: AdminPanelComponent,
    children: [
      {
        path: 'predmeti',
        component: PredmetOperationsComponent
      },
      {
        path: "tagovi",
        component: TagOperationsComponent
      },
      {
        path: "moduli",
        component: ModulOperationsComponent
      },
      {
        path: "komentari",
        component: KomentariComponent
      },
      {
        path: "literatura",
        component: LiteraturaOperationsComponent
      },
      {
        path: "studentiop",
        component: StudentOperationsComponent
      },
      {
        path:"mentor-op",
        component: MentorOperationsComponent
      }


    ]
  },
  { path: "error", component: ErrorComponent },
  { path: "mentor-request", component: MentorRequestComponent}
];

export const routingConfig: ExtraOptions = {
  paramsInheritanceStrategy: 'always'
}

@NgModule({
  imports: [RouterModule.forRoot(routes, routingConfig)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
