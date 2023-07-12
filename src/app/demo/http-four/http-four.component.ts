import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { GithubService } from 'src/app/shared/github.service';
import { User } from 'src/app/shared/user';

@Component({
  selector: 'app-http-fout',
  templateUrl: './http-four.component.html',
  styleUrls: ['./http-four.component.css']
})
export class HttpFourComponent {
  title = '测试拦截器';
  constructor(private githubService: GithubService) { }; // 注入GithubService服务类

  users$: Observable<Array<User>>;

  ngOnInit() {
    this.users$ = this.githubService.getUsers()
  }
}
