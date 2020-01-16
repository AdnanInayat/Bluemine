import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { NavComponent } from './pages/nav/nav.component';

export const appRoutes: Routes = [
    { path : 'register', component : RegisterComponent },
    { path : 'dashboard', component : DashboardComponent },
    { path : 'home', component : HomepageComponent },
    { path : 'nav', component : NavComponent },
    { path : '', redirectTo : '/home', pathMatch : 'full' }
];
