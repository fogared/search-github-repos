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
  constructor(private searchService: SearchRepoService) { }

  ngOnInit() {
  }

  searchRepository() {
    this.searchService.getRepos(this.repositoryName).subscribe(repoList => {
      this.repoList = repoList;
      this.repoListUpdate.emit(this.repoList);
    });
  }
}
