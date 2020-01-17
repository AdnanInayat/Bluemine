import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { TicketpageComponent } from './pages/ticketpage/ticketpage.component';

export const appRoutes: Routes = [
    { path : 'register', component : RegisterComponent },
    { path : 'dashboard', component : DashboardComponent },
    { path : 'home', component : HomepageComponent },
    { path : 'ticket', component : TicketpageComponent},
    { path : '', redirectTo : '/home', pathMatch : 'full' }
];
