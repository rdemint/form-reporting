import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule, MatCardModule, MatFormFieldModule, MatNativeDateModule } from '@angular/material';
import { MatSelectModule} from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule} from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { appRoutes } from './routes';
import { PracticeService } from './practice/practice.service';
import { AuthService } from './auth/auth.service';
import { EntityService } from './entity/entity.service';
import { DateService } from './date.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form/form.component';
import { FormsModule} from '@angular/forms';

import { AuthGuard } from './auth-guard';

import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { PracticeSummariesComponent } from './practice/practice-summaries/practice-summaries.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PracticeComponent } from './practice/practice/practice.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { EntityComponent } from './entity/entity/entity.component';
import { ChartComponent } from './chart/chart/chart.component';
<<<<<<< HEAD
import { ProviderComponent } from './provider/provider/provider.component';
=======
import { PracticeContainerComponent } from './practice/practice-container/practice-container.component';
import { UserComponent } from './user/user/user.component';

>>>>>>> dailySummaryRefactor

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    PracticeSummariesComponent,
    PracticeComponent,
    LoginComponent,
    LogoutComponent,
    EntityComponent,
    ChartComponent,
<<<<<<< HEAD
    ProviderComponent
=======
    PracticeContainerComponent,
    UserComponent,
>>>>>>> dailySummaryRefactor
  ],
  imports: [
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatSelectModule,
    MatCardModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
    MatNativeDateModule, 
    PracticeService,
    AuthService, 
    EntityService,
    DateService,
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
