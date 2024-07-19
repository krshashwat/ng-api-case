import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-api-case';
  index = 0;
  steps = 10;
  paginationCount: Array<any> = [];
  postsList: Array<{userId: number, id: number, title: string, body: string}> = [];
  paginatedPostList: Array<{userId: number, id: number, title: string, body: string}> = [];
  constructor(
    private apiService: ApiService,
  ) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts(): void {
    this.apiService.getPosts().subscribe((res) => {
      this.postsList = res;
      this.paginationCount = new Array(this.postsList.length / this.steps).fill(0);
      console.log(this.paginationCount);
      this.splitPosts();
    }, () => {
      this.postsList = [];
      alert('Failed to fetch the posts');
    });
  }

  splitPosts(): void {
    this.paginatedPostList = [];
    // 100 post -> index -> 0 steps -> 10 -> 0 - 9 , 10 -> 19, 20 - 29
    this.paginatedPostList = this.postsList.slice(this.index*this.steps, this.index*this.steps+this.steps);
  }

  handlePageChange(index: number): void {
    this.index = index;
    this.splitPosts();
  }
}
