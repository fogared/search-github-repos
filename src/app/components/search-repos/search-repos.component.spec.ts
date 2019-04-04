import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchReposComponent } from './search-repos.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {SearchRepoService} from '../../services/search-repo.service';
import {Repo} from '../../models/repo';
import { of } from 'rxjs';
import {By} from '@angular/platform-browser';

describe('SearchReposComponent', () => {
  let component: SearchReposComponent;
  let fixture: ComponentFixture<SearchReposComponent>;
  let repoList: Repo[] = [
    { url: 'testurl1',
    description: 'description1',
    full_name: 'fullname1',
    stargazers_count: 2,
    watchers_count: 3,
    forks: 4,
    issues: null},
    { url: 'testurl2',
      description: 'description2',
      full_name: 'fullname2',
      stargazers_count: 5,
      watchers_count: 6,
      forks: 7,
      issues: null }];

  beforeEach(async(() => {
    const searchService = jasmine.createSpyObj('SearchRepoService', ['getRepos']);
    TestBed.configureTestingModule({
      declarations: [ SearchReposComponent ],
      imports: [FormsModule, HttpClientModule],
      providers:    [
        { provide: SearchRepoService, useValue: searchService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchReposComponent);
    component = fixture.componentInstance;
    spyOn(component.repoListUpdate, 'emit');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update repoList when click on search button', () => {
    let searchService= TestBed.get(SearchRepoService);
    searchService.getRepos.and.returnValue(of(repoList));
    let btn = fixture.debugElement.query(By.css('.search-button'));
    btn.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.repoListUpdate.emit).toHaveBeenCalledWith(repoList);
    expect(component.repoList).toEqual(repoList);
  });
});
