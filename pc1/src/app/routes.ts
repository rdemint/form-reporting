import { Routes } from '@angular/router';
import { FormComponent } from './form/form/form.component';
import { PracticeComponent } from './practice/practice/practice.component';
import { PracticeListComponent } from './practice/practice-list/practice-list.component';
import { ProviderListComponent } from './provider/provider-list/provider-list.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { EntityComponent } from './entity/entity/entity.component';
import { AuthGuard } from './auth-guard';

export const appRoutes: Routes = [
	{
		path: 'practices/:practiceSlug',
		// canActivate: [AuthGuard],
		component: PracticeComponent,
	},
	{
		path: 'entities/:entitySlug',
		// canActivate: [AuthGuard],
		component: EntityComponent,
		children: [
			{path: 'practice-dashboard', component: PracticeListComponent},
			{path: 'provider-dashboard', component: ProviderListComponent},
		]
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