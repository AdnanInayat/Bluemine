import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { appRoutes} from './routes';
import { MatToolbarModule, MatInputModule, MatButtonModule, MatSidenavModule, MatIconModule,
  MatListModule, MatCardModule, MatNativeDateModule, MatBadgeModule, MatMenuModule } from '@angular/material';
import { TicketpageComponent } from './pages/ticketpage/ticketpage.component';
import { NewticketComponent } from './pages/newticket/newticket.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ChartsModule } from 'ng2-charts';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ListticketsComponent } from './pages/listtickets/listtickets.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    RegisterComponent,
    DashboardComponent,
    TicketpageComponent,
    NewticketComponent,
    ProfileComponent,
    ListticketsComponent    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ChartsModule,
    ReactiveFormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatCardModule,
    MatBadgeModule,
    MatListModule,
    MatMenuModule,
    DragDropModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
