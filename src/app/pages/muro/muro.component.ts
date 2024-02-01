import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { ActivateService } from '../../services/activate.service';

@Component({
  selector: 'app-muro',
  templateUrl: './muro.component.html',
  styleUrls: ['./muro.component.scss']
})
export class MuroComponent implements OnInit {
  posts: any[] = [];
  filteredPosts: any[] = [];
  searchText: string = '';
  searchText$ = new BehaviorSubject<string>('');
  private unsubscribe$ = new Subject<void>();
  private subscription: Subscription;

  constructor(
    private postService: PostService,
    private activateService: ActivateService
    ) {
      this.subscription = activateService.active$.subscribe((active)=>{
        if (active) {
          this.allPosts();
        }
      })
    }
  

  ngOnInit(): void {
    this.allPosts();
    this.setupSearchTextSubscription();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.subscription.unsubscribe();
  }

  allPosts() {
    this.postService.getAllPosts().pipe(takeUntil(this.unsubscribe$)).subscribe(
      (data) => {
        this.posts = data;
        this.filteredPosts = this.posts;
        console.log(this.posts);
      },
      (error) => {
        console.error('Error al obtener los posts:', error);
      }
    );
  }

  filterPosts() {
    if (this.searchText.trim() === '') {
      this.filteredPosts = this.posts;
    } else {
      this.filteredPosts = this.posts.filter(post =>
        post.content.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }

  private setupSearchTextSubscription() {
    this.searchText$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.unsubscribe$)
    ).subscribe(() => {
      this.filterPosts();
    });
  }

  onSearchTextChanged() {
    this.searchText$.next(this.searchText);
  }
}
