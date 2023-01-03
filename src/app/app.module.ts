import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AsteroidService } from './asteroid.service';
import { NeoStatsComponent } from './neo-stats/neo-stats.component';

@NgModule({
  declarations: [
    AppComponent,
    NeoStatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [AsteroidService],
  bootstrap: [AppComponent]
})
export class AppModule { }
