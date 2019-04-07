import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
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
  encapsulation: ViewEncapsulation.None,
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

  //create repo chart after the view is loaded
  ngAfterViewChecked() {
    const width = 420;
    const barHeight = 20;

    // select repo-chart svg and pass the Repo[] data array
    let repoChartList=d3.selectAll(".repo-chart")
      .attr("width", width)
      .attr("height", barHeight * 3)
      .data(this.repoList);

    // in all svg select/create bar element and pass a Repo data for them (only 3 element from the Repo object)
    var bar = repoChartList.selectAll("g")
      .data(function(d){return [{name: 'stargazers', value: d.stargazers_count},
        {name: 'forks', value: d.forks}, {name: 'watchers', value: d.watchers_count}];})
      .enter()
      .append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

    // create a rect in every bar of the chart and set the width
    bar.append("rect")
      .attr("width", function(d) { return d.value * 10 + "px"; })
      .attr("height", barHeight - 1)
      .attr("fill", "#379683");

    // create text in every bar of the chart
    bar.append("text")
      .attr("x", function(d) { return 10 * d.value + 3; })
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      .attr("fill", "#05386b")
      .text(function(d) { return `${d.name} ${d.value}`; });
  }

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
