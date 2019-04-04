import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {Repo} from '../models/repo';
import {Issue} from '../models/issue';

@Injectable({
  providedIn: 'root'
})
export class SearchRepoService {
  repoList: Repo[] = [];
  issueList: Issue[] = [];

  constructor(private http: HttpClient) {
  }

  getRepos(repoName: string) {
      // Http get request to search repository, the return value is an Observable
      return this.http.get(`http://api.github.com/search/repositories?q=${repoName}`)
        .pipe(
          map( // map the result of the http request to Repo[] model
            (res: any) => {
              return this.repoList = res.items.map(item =>
                new Repo(
                  item.url,
                  item.description,
                  item.full_name,
                  item.stargazers_count,
                  item.watchers_count,
                  item.forks,
                  null));}),
          catchError(this.handleError)); // call custom error handling
  }

  // Http get request to search issues, the return value is an Observable
  getOpenIssues(fullName: string) {
    return this.http.get(`http://api.github.com/search/issues?q=repo:${fullName}`)
      .pipe(
        map( // map the result of the http request to Issue[] model
          (res: any) => {
            return this.repoList = res.items.map(item =>
              new Issue(
                item.title,
                item.state,
                item.comments));}),
        catchError(this.handleError)); // call custom error handling
  }

  // Custom error handling to the Http requests
  private handleError(error: HttpErrorResponse){
    console.error(`Error code: ${error.status}, Message: ${error.message}`);
    return throwError('Something happened');
  }
}
