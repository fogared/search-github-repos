import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Repo} from '../../models/repo';
import {SearchRepoService} from '../../services/search-repo.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-repo-info',
  templateUrl: './repo-info.component.html',
  styleUrls: ['./repo-info.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '200px'
      })),
      state('closed', style({
        height: '100px'
      })),
      transition('* => *', [
        animate('2s')
      ]),
    ]),
  ],
})
export class RepoInfoComponent implements OnInit {
  @Input() repoList: Repo[];
  @Output() addIssueToRepo: EventEmitter<object> = new EventEmitter<object>();
  selectedRepo: string;

  constructor(private searchService: SearchRepoService) { }

  ngOnInit() {
  }

  openIssues(repo: Repo) {
    this.selectedRepo = repo.full_name;
    this.searchService.getOpenIssues(repo.full_name).subscribe(issues => {
      this.addIssueToRepo.emit({repoList: this.repoList, issueList: issues, fullName: repo.full_name});
    });
  }
}
