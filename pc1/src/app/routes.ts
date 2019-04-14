import { Routes } from '@angular/router';
import { FormComponent } from './form/form/form.component';
import { PracticeComponent } from './practice/practice/practice.component';
import { PracticeSummariesComponent } from './practice/practice-summaries/practice-summaries.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { AuthGuard } from './auth-guard';

export const appRoutes: Routes = [
	{
		path: 'practices/:practiceSlug',
		// canActivate: [AuthGuard],
		component: PracticeComponent,
	},
	{	path: 'login',
		component: LoginComponent,
	},
	{
		path:'logout',
		component: LogoutComponent,
	},
	{	path: '',
		redirectTo: '/login',
		pathMatch: 'full'
	},

]