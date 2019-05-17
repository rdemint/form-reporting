import { Routes } from '@angular/router';
import { FormComponent } from './form/form/form.component';
import { PracticeComponent } from './practice/practice/practice.component';
import { PracticeContainerComponent } from './practice/practice-container/practice-container.component';
import { PracticeListComponent } from './practice/practice-list/practice-list.component';
import { ProviderListComponent } from './provider/provider-list/provider-list.component';
import { DailySummaryContainerComponent } from './daily-summary/daily-summary-container/daily-summary-container.component';
import { DailySummaryFormComponent } from './daily-summary/daily-summary-form/daily-summary-form.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { EntityComponent } from './entity/entity/entity.component';
import { AuthGuard } from './auth-guard';

export const appRoutes: Routes = [
	{
		path: 'practices/:practiceSlug',
		// canActivate: [AuthGuard],
		// component: PracticeContainerComponent,
		children: [
			{
				path: 'dashboard',
				component: PracticeContainerComponent
			},
			{
				path: 'reporting',
				component: DailySummaryContainerComponent
			}
		]
	},
	{
		path: 'entities/:entitySlug',
		// canActivate: [AuthGuard],
		component: EntityComponent,
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