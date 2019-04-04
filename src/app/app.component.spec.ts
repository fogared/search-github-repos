import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {SearchReposComponent} from './components/search-repos/search-repos.component';
import {RepoInfoComponent} from './components/repo-info/repo-info.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, SearchReposComponent, RepoInfoComponent
      ],
      imports: [FormsModule, HttpClientModule]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
});
