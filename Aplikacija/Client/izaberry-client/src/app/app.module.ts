import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkAccordionModule } from '@angular/cdk/accordion';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DragDropModule,
    CdkAccordionModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
