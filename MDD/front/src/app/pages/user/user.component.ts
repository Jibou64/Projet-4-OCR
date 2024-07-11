import {Component, HostListener, OnInit, Renderer2} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../../../services/auth.service";
import { UserService } from "../../../services/user.service";
import { User } from "../../models/User";
import { UpdateUserRequest } from "../../models/UpdateUserRequest";
import {SubscriptionService} from "../../../services/subscription.service";
import {Subject} from "../../models/Subject";
import {SubjectService} from "../../../services/subject.service";
import {PostService} from "../../../services/post.service";
import {Post} from "../../models/Post"; // Assurez-vous que UpdateUserRequest est correctement importé

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user: User | null = null;
  newEmail: string = '';
  newUsername: string = '';
  updateUserRequest: UpdateUserRequest = {email: "", firstName: "", lastName: "", username: "", password: ""};
  showEditForm: boolean = false;
  subscriptions: Subject[] = [];
  posts: Post[] = [];
  isMenuOpen: boolean = false;


  constructor(
    private userService: UserService,
    private authService: AuthService,
    private subscriptionService: SubscriptionService,
    private postService: PostService,
    private render: Renderer2,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchUser();
    this.fetchUserSubscriptions();
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
  fetchPostsBySubject(subjectId: number): void {
    this.postService.getPostsBySubject(subjectId).subscribe(
      (data) => {
        if (Array.isArray(data)) {
          this.posts = data;
        } else if (data && typeof data === 'object') {
          this.posts = Object.values(data);
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
  unsubscribeUser(subjectId: number): void {
    const userId = this.authService.getUserId();
    if (userId !== null) {
      this.subscriptionService.unsubscribe(userId, subjectId).subscribe(
        () => {
          console.log(`Successfully unsubscribed from subject ${subjectId}`);
          this.fetchUserSubscriptions();
        },
        (error) => {
          console.error(`Error unsubscribing from subject ${subjectId}`, error);
        }
      );
    } else {
      console.error('User ID not found');
    }
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

  updateUser(): void {
    const userId = this.authService.getUserId();
    if (userId !== null) {
      this.userService.updateUser(userId, this.updateUserRequest).subscribe(
        (data) => {
          console.log('User updated successfully', data);
        },
        (error) => {
          console.error('Error updating user', error);

        }
      );
    } else {
      console.error('User ID not found');
    }
  }
  toggleEditForm(): void {
    this.showEditForm = !this.showEditForm;
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goToHomePage(): void {
    this.router.navigate(['/home']);
  }

}
