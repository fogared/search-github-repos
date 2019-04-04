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

  // give this method to the search-repos component as an output parameter; update the repository list
  repoListUpdate(repoList: Repo[]) {
    this.repolist = repoList;
  }

  // give this method to the repo-info component as an output parameter; update the repository list with the issues of the selected repos
  addIssueToRepo(data: any) {
    this.repolist = data.repoList.map(item => {
      let issues = item.issues;

      // update the issues of the selected repo
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
