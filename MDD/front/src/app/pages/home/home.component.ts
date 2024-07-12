import { Component, OnInit } from '@angular/core';
import { UserService } from "../../../services/user.service";
import { User} from "../../models/User";
import { AuthService } from "../../../services/auth.service";
import { Router } from "@angular/router";
import { Post } from "../../models/Post";
import { Subject } from "../../models/Subject";
import { PostService } from "../../../services/post.service";
import { SubjectService } from "../../../services/subject.service";
import { SubscriptionService } from "../../../services/subscription.service";
import {HostListener} from "@angular/core";
import {Renderer2} from "@angular/core";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: User | null = null;
  posts: Post[] = [];
  subjects: Subject[] = [];
  selectedSubject: Subject | null = null;
  subscriptions: Subject[] = [];
  affichedPosts: Post[] = [];
  isMenuOpen: boolean = false;



  constructor(private userService: UserService,
              private authService: AuthService,
              private postService: PostService,
              private subjectService: SubjectService,
              private subscriptionService: SubscriptionService,
              private renderer: Renderer2,
              private router: Router) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    const userId = this.authService.getUserId();
    if (userId !== null) {
      const userId = this.authService.getUserId();
      this.fetchUser();
      this.fetchUserSubscriptions();
    } else {
      console.error('User ID not found');
    }
    this.fetchSubjects();
    this.fetchDefaultPosts();
  }

  fetchUserSubscriptions(): void {
    const userId = this.authService.getUserId();
    this.subscriptionService.getSubscriptionsByUser(userId).subscribe(
      (data) => {
        this.subscriptions = data;
        if (this.subscriptions.length > 0) {
          const firstSubscriptionId = this.subscriptions[0].id;
          this.fetchPostsBySubject(firstSubscriptionId);
        }
      },
      (error) => {
        console.error('Error fetching subscriptions', error);
      }
    );
  }


  fetchUser(): void {
    const userId = this.authService.getUserId();
    if (userId !== null) {
      this.userService.getUserById(userId).subscribe(
        (data) => {
          this.user = data;
        },
        (error) => {
          console.error('Error fetching user', error);
        }
      );
    } else {
      console.error('User ID not found');
    }
  }

  getPostsBySubscription(subscriptionId: number): Post[] {
    const subscription = this.subscriptions.find(sub => sub.id === subscriptionId);
    return subscription ? subscription.posts : [];
  }

  fetchSubjects(): void {
    this.subjectService.getAllSubjects().subscribe(
      (data) => {
        this.subjects = data;
      },
      (error) => {
        console.error('Error fetching subjects', error);
      }
    );
  }
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    if (!(event.target as HTMLElement).closest('.mobile-menu') && !(event.target as HTMLElement).closest('.menu-button')) {
      this.closeMenu();
    }
  }
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  closeMenu(): void {
    const menu = document.querySelector('.mobile-menu');
    if (menu) {
      menu.classList.remove('open');
    }
  }

  fetchDefaultPosts(): void {
    if (this.subscriptions.length > 0) {

      const defaultSubject = this.subscriptions[0];
      this.fetchPostsBySubject(defaultSubject.id);
    } else {
      this.posts = [];
    }
  }

  getPostsFromSubscriptions(): Post[] {
    const allPosts: Post[] = [];
    this.subscriptions.forEach(subscription => {
      allPosts.push(...subscription.posts);
    });
    return allPosts;
  }

  loadMyFeed(): void {
    if (this.subscriptions.length > 0) {
      const firstSubscriptionId = this.subscriptions[0].id;
      this.fetchPostsBySubject(firstSubscriptionId);
    } else {

      console.log('Utilisateur non abonné à aucun sujet');
    }
  }

  fetchPostsBySubject(subjectId: number): void {
    this.postService.getPostsBySubject(subjectId).subscribe(
      (data) => {
        if (Array.isArray(data)) {
          console.log('Data received:', data);
          this.affichedPosts = data;
          this.posts = [...this.affichedPosts];
        } else if (data && typeof data === 'object') {
          console.log('Data received:', data);
          this.affichedPosts = Object.values(data);
          this.posts = [...this.affichedPosts];
        } else {
          console.error('Invalid data format: Expected array or object');
          this.posts = [];
        }
      },
      (error) => {
        console.error('Error fetching posts by subject', error);
      }
    );
  }

  goToUserPage(): void {
    this.router.navigate(['/userpage']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  selectSubject(subject: Subject): void {
    this.selectedSubject = subject;
    console.log(this.selectedSubject);
    this.fetchPostsBySubject(subject.id);
  }

  goToArticle():void {
    this.router.navigate(['/article']);
  }

  goToPostDetail(postId: number): void {
    this.router.navigate(['/post', postId]);
  }

  sortPostsByDateAscending(): void {
    this.posts = [...this.affichedPosts].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      console.log("valeur de a", a.createdAt, "valeur de b", b.createdAt);
      if (isNaN(dateA) || isNaN(dateB)) {
        console.error('Invalid date format', a.createdAt, b.createdAt);
        return 0;
      }
      return dateA - dateB;
    });
  }

  sortPostsByDateDescending(): void {
    this.posts = [...this.affichedPosts].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      console.log("valeur de a", a.createdAt, "valeur de b", b.createdAt);
      if (isNaN(dateA) || isNaN(dateB)) {
        console.error('Invalid date format', a.createdAt, b.createdAt);
        return 0;
      }
      return dateB - dateA;
    });
  }


  unsubscribe(userId: number, subjectId: number): void {
    this.subscriptionService.unsubscribe(userId, subjectId).subscribe(
      () => {
        console.log('Désabonnement réussi');

      },
      (error) => {
        console.error('Erreur lors du désabonnement : ', error);

      }
    );
  }

  subscribeToSubject(subject: Subject): void {
    const userId = this.user?.id;
    if (userId) {
      this.subscriptionService.subscribeToSubject(subject.id, userId).subscribe(
        (data) => {

          console.log('Souscription réussie', data);
        },
        (error) => {
          console.error('Erreur lors de la souscription', error);
        }
      );
    } else {
      console.error('User ID not available');
    }
  }
  deletePost(postId: number): void {
    if (!this.user || !this.authService.isAuthenticated()) {
      console.error('User not authenticated or user data unavailable');
      return;
    }
    const postToDelete = this.posts.find(post => post.id === postId);
    if (!postToDelete) {
      console.error('Post not found in user\'s posts');
      return;
    }
    if (postToDelete.user.id !== this.user.id) {
      console.error('User is not authorized to delete this post');
      return;
    }
    this.postService.deletePost(postId).subscribe(
      () => {
        console.log('Post deleted successfully');

        this.posts = this.posts.filter(post => post.id !== postId);
      },
      (error) => {
        console.error('Error deleting post', error);
      }
    );
  }
  goToSubjectPage(){
    this.router.navigate(['/subject']);
  }
}
