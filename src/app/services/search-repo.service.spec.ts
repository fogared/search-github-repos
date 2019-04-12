import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SearchRepoService } from './search-repo.service';
import { of } from 'rxjs';
import {map} from 'rxjs/operators';
import {Repo} from '../models/repo';
import {Issue} from '../models/issue';

describe('SearchRepoService', () => {
  let service: SearchRepoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchRepoService]
    });
    service = TestBed.get(SearchRepoService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const service: SearchRepoService = TestBed.get(SearchRepoService);
    expect(service).toBeTruthy();
  });

  it('getRepos should return an Observable<Repo[]>', () => {
    const dummyRepos: Repo[] = [
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
        issues: null }
    ];

    service.getRepos('test').subscribe(repos => {
      expect(repos.length).toBe(2);
      expect(repos).toEqual(dummyRepos);
    });

    const req = httpMock.expectOne(`http://api.github.com/search/repositories?q=test`);
    expect(req.request.method).toBe("GET");
    req.flush(of(dummyRepos));
  });

  it('getOpenIssues should return an Observable<Issue[]>', () => {
    const issueList: Issue[] = [
      {title: 'title1',
        state: 'state1',
        comments: 1},
      {title: 'title2',
        state: 'state2',
        comments: 2}];

    service.getOpenIssues('name/reponame').subscribe(issues => {
      expect(issues.length).toBe(2);
      expect(issues).toEqual(issueList);
    });

    const req = httpMock.expectOne(`http://api.github.com/search/issues?q=repo:name/reponame`);
    expect(req.request.method).toBe("GET");
    req.flush(of(issueList));
  });
});
