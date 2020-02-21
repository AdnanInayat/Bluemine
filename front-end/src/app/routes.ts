import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { TicketpageComponent } from './pages/ticketpage/ticketpage.component';
import { NewticketComponent } from './pages/newticket/newticket.component';
import { AppComponent } from './app.component';
import { ModuleWithProviders } from '@angular/core';
import { ProfileComponent } from './pages/profile/profile.component';

export const appRoutes: Routes = [
    { path : 'register', component : RegisterComponent },
    { path : 'dashboard', component : DashboardComponent },
    { path : 'dashboard/:type', component : DashboardComponent },
    { path : 'home', component : HomepageComponent },
    { path : 'ticket/:id', component : TicketpageComponent },
    { path : 'newticket', component : NewticketComponent },
    { path: 'profile', component: ProfileComponent },
    { path : '', redirectTo : '/home', pathMatch : 'full' }
];

