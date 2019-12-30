import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { RecommendationComponent } from './recommendation/recommendation.component';
import { ResultsComponent } from './results/results.component';
import { MusicService } from './services/music.service';
import { RecommendationService } from './services/recommendation.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    RecommendationComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [MusicService,RecommendationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
