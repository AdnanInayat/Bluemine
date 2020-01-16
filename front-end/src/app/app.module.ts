import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { NavComponent } from './pages/nav/nav.component';
import { MatToolbarModule, MatInputModule, MatButtonModule, MatSidenavModule, MatIconModule,
  MatListModule, MatCardModule, MatNativeDateModule, MatBadgeModule, MatMenuModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    RegisterComponent,
    DashboardComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
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
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
