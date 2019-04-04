import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {SearchRepoService} from '../../services/search-repo.service';
import {Repo} from '../../models/repo';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-search-repos',
  templateUrl: './search-repos.component.html',
  styleUrls: ['./search-repos.component.scss']
})
export class SearchReposComponent implements OnInit {
  @Input() repoList: Repo[];
  @Output() repoListUpdate: EventEmitter<Repo[]> = new EventEmitter<Repo[]>();
  repositoryName: string;

  // inject the SearchRepoService
  constructor(private searchService: SearchRepoService) { }

  ngOnInit() {
  }

  // update the repoList when click on search button
  searchRepository() {
    // call the injected SearchReposervice getRepos method and subscribe of the Observable
    this.searchService.getRepos(this.repositoryName).subscribe(repoList => {
      this.repoList = repoList;
      // pass the result the EventEmitter, and update the repoList with the result
      this.repoListUpdate.emit(this.repoList);
    });
  }
}
