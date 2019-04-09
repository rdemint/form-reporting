import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule, MatFormFieldModule, MatNativeDateModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule} from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { appRoutes } from './routes';
import { PracticeService } from './practice/practice.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form/form.component';
import { FormsModule} from '@angular/forms';

import { PracticeSummariesComponent } from './practice/practice-summaries/practice-summaries.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PracticeFormComponent } from './form/practice-form/practice-form.component';
import { PracticeComponent } from './practice/practice/practice.component';
import { UserComponent } from './user/user/user.component';
import { LogoutComponent } from './user/logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    PracticeSummariesComponent,
    PracticeFormComponent,
    PracticeComponent,
    UserComponent,
    LogoutComponent,
  ],
  imports: [
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forRoot(appRoutes),
    BrowserModule,
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
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [MatNativeDateModule, PracticeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
