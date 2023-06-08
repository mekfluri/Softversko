import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FormsModule } from '@angular/forms';


import { KalendarComponent } from './components/kalendar/kalendar.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { PredmetiComponent } from './components/predmeti/predmeti.component';
import { MainComponent } from './components/main/main.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './helpers/auth-interceptor';
import { PredmetPreviewComponent } from './components/predmet-preview/predmet-preview.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { OglasnaComponent } from './components/oglasna/oglasna.component';
import { LoadingInterceptor } from './helpers/loader-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { TagOperationsComponent } from './components/tag-operations/tag-operations.component';
import { PredmetOperationsComponent } from './components/predmet-operations/predmet-operations.component';
import { ErrorComponent } from './components/error/error.component';
import { ModulOperationsComponent } from './components/modul-operations/modul-operations.component';
import { LiteraturaComponent } from './components/literatura/literatura.component';
import { DodajLiteraturuComponent } from './components/dodaj-literaturu/dodaj-literaturu.component';
import { ZahteviComponent } from './components/zahtevi/zahtevi.component';
import { KomentariComponent } from './components/komentari/komentari.component';
import { LiteraturaOperationsComponent } from './components/literatura-operations/literatura-operations.component';
import { StudentOperationsComponent } from './components/student-operations/student-operations.component';
import { PreferencesComponent } from './components/preferences/preferences.component';
import { PreferencaComponent } from './components/preferenca/preferenca.component';
import { UploadComponent } from './components/upload/upload.component';
import { MentorOperationsComponent } from './components/mentor-operations/mentor-operations.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignInComponent,
    UserProfileComponent,
    MainComponent,
    PredmetiComponent,
    PredmetPreviewComponent,
    QuizComponent,
    OglasnaComponent,
    AdminLoginComponent,
    AdminPanelComponent,
    TagOperationsComponent,
    PredmetOperationsComponent,
    ErrorComponent,
    KalendarComponent,
    ModulOperationsComponent,
    LiteraturaComponent,
    DodajLiteraturuComponent,
    ZahteviComponent,
    KomentariComponent,
    LiteraturaOperationsComponent,
    StudentOperationsComponent,
    PreferencesComponent,
    PreferencaComponent,
    UploadComponent,
    MentorOperationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DragDropModule,
    CdkAccordionModule,
    DragDropModule, 
    FullCalendarModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    /* { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true } */
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
