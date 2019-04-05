import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Repo} from '../../models/repo';
import {SearchRepoService} from '../../services/search-repo.service';
import * as d3 from "d3";
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

  // inject the SearchRepoService
  constructor(private searchService: SearchRepoService) { }

  ngOnInit() {
  }

  /*ngAfterViewChecked() {
    let repoChartList=d3.selectAll(".repo-chart")
      .data(this.repoList);
    debugger;
    let repoChart = repoChartList.selectAll("div")
      .data(function(d){return [d.stargazers_count, d.forks, d.watchers_count];})
      .enter()
      .append("div")
      .attr("class","chart-element")
      .style("width", function(d) { return d*10 + "px"; })
      .text(function(d) { return d; });
  }*/

  // update the repoList when click on open available issues button
  openIssues(repo: Repo) {
    // set the selected repo to open the issue list
    this.selectedRepo = repo.full_name;
    // call the injected SearchReposervice getOpenIssues method and subscribe of the Observable
    this.searchService.getOpenIssues(repo.full_name).subscribe(issues => {
      // pass the result the EventEmitter, and update the repoList with the result
      this.addIssueToRepo.emit({repoList: this.repoList, issueList: issues, fullName: repo.full_name});
    });
  }
}
