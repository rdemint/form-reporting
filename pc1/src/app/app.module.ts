import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule, MatFormFieldModule, MatNativeDateModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule} from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form/form.component';
import { FormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { appRoutes } from './routes';
import { PracticeService } from './practice/practice.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectPracticeComponent } from './practice/select-practice/select-practice.component';
import { PracticeSummariesComponent } from './practice/practice-summaries/practice-summaries.component';
import { ToggleableDirective } from './ui/toggleable.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PracticeFormComponent } from './form/practice-form/practice-form.component';
import { PracticeContainerComponent } from './practice/practice-container/practice-container.component';
import { PracticeComponent } from './practice/practice/practice.component';
import { UserComponent } from './user/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    HomeComponent,
    SelectPracticeComponent,
    PracticeSummariesComponent,
    ToggleableDirective,
    PracticeFormComponent,
    PracticeContainerComponent,
    PracticeComponent,
    UserComponent,
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
