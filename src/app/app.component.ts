import { Component } from '@angular/core';
import {Repo} from './models/repo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public repolist: Repo[] = [];

  constructor() {
  }

  repoListUpdate(repoList: Repo[]) {
    this.repolist = repoList.map(item =>
      new Repo(
        item.url,
        item.description,
        item.full_name,
        item.stargazers_count,
        item.watchers_count,
        item.forks,
        item.issues));
  }

  addIssueToRepo(data: any) {
    this.repolist = data.repoList.map(item => {
      let issues = item.issues;

      if (item.full_name === data.fullName) {
        issues = data.issueList;
      }
      return new Repo(
        item.url,
        item.description,
        item.full_name,
        item.stargazers_count,
        item.watchers_count,
        item.forks,
        issues);
    });
  }
}
