import { Routes } from '@angular/router';
import { FormComponent } from './form/form/form.component';
import { HomeComponent } from './home/home.component';
import { PracticeSummariesComponent } from './practice/practice-summaries/practice-summaries.component';
import { UserComponent } from './user/user/user.component';

export const appRoutes: Routes = [
	{
		path: 'practices/:practiceSlug',
		component: PracticeSummariesComponent,
		children: [
			{path: ':summaryId', component: FormComponent},
		]
	},
	{	path: 'login',
		component: UserComponent,
	},
	{	path: '',
		redirectTo: '/login',
		pathMatch: 'full'
	},

]