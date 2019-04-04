import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SearchReposComponent } from './components/search-repos/search-repos.component';
import { RepoInfoComponent } from './components/repo-info/repo-info.component';
import {SearchRepoService} from './services/search-repo.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchReposComponent,
    RepoInfoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [SearchRepoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
