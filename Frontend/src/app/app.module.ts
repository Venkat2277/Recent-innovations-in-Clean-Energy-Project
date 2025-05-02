import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login.component';
import { DashboardComponent } from './pages/dashboard.component';
import { SummaryComponent } from './pages/summary.component';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './pages/reports.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule} from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    SharedModule,
    LoginComponent,
    DashboardComponent,
    SummaryComponent,
    ReportsComponent
  ],
  imports: [BrowserModule,HttpClientModule,CommonModule,AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent] ,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  
})
export class AppModule {}
