import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GuardService } from './services/guard.service';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path : '',
        component : HomeComponent
      }
    ])
  ],
  providers: [
    GuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }