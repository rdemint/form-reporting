import { Routes } from '@angular/router';
import { FormComponent } from './form/form/form.component';
import { PracticeComponent } from './practice/practice/practice.component';
import { PracticeSummariesComponent } from './practice/practice-summaries/practice-summaries.component';
import { UserComponent } from './user/user/user.component';
import { LogoutComponent } from './user/logout/logout.component';

export const appRoutes: Routes = [
	{
		path: 'practices/:practiceSlug',
		component: PracticeComponent,
	},
	{	path: 'login',
		component: UserComponent,
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