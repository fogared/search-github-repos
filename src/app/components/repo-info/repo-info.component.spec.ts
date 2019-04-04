import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoInfoComponent } from './repo-info.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {Repo} from '../../models/repo';
import {SearchRepoService} from '../../services/search-repo.service';
import {of} from 'rxjs';
import {By} from '@angular/platform-browser';
import {Issue} from '../../models/issue';

describe('RepoInfoComponent', () => {
  let component: RepoInfoComponent;
  let fixture: ComponentFixture<RepoInfoComponent>;
  let oldRepoList: Repo[] = [
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

  let issueList: Issue[] = [
    {title: 'title1',
    state: 'state1',
    comments: 1},
    {title: 'title2',
      state: 'state2',
      comments: 2}];

  let newRepoList: Repo[] = [
    { url: 'testurl1',
      description: 'description1',
      full_name: 'fullname1',
      stargazers_count: 2,
      watchers_count: 3,
      forks: 4,
      issues: issueList},
    { url: 'testurl2',
      description: 'description2',
      full_name: 'fullname2',
      stargazers_count: 5,
      watchers_count: 6,
      forks: 7,
      issues: null }];

  beforeEach(async(() => {
    const searchService = jasmine.createSpyObj('SearchRepoService', ['getOpenIssues']);
    TestBed.configureTestingModule({
      declarations: [ RepoInfoComponent ],
      imports: [FormsModule, HttpClientModule],
      providers:    [
        { provide: SearchRepoService, useValue: searchService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoInfoComponent);
    component = fixture.componentInstance;
    component.repoList = oldRepoList;
    component.selectedRepo = 'fullname1';
    spyOn(component.addIssueToRepo, 'emit');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addIssueToRepo eventEmitter when click on open issues button', () => {
    let searchService= TestBed.get(SearchRepoService);
    searchService.getOpenIssues.and.returnValue(of(issueList));
    let btn = fixture.debugElement.query(By.css('.open-issues-button'));
    btn.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.addIssueToRepo.emit).toHaveBeenCalledWith({repoList: oldRepoList, issueList: issueList, fullName: 'fullname1'});
  });
});
