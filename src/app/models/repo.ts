import {Issue} from './issue';

export class Repo {
  constructor(public url: string,
              public description: string,
              public full_name: string,
              public stargazers_count: number,
              public watchers_count: number,
              public forks: number,
              public issues: Issue[]) {}
}
