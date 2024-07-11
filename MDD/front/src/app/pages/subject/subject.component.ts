import {Component, HostListener, OnInit, Renderer2} from '@angular/core';
import {SubjectService} from "../../../services/subject.service";
import {Subject} from "../../models/Subject";
import {AuthService} from "../../../services/auth.service";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {User} from "../../models/User";
import {SubscriptionService} from "../../../services/subscription.service";
import {PostService} from "../../../services/post.service";
import {Post} from "../../models/Post";


@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
  user: User | null = null;
  subjects: Subject[] = [];
  selectedSubject: Subject | null = null;
  posts: Post[] = [];
  subscriptions: Subject[] = [];
  isMenuOpen: boolean = false;


  constructor(private subjectService: SubjectService,
              private authService: AuthService,
              private userService: UserService,
              private subscriptionService: SubscriptionService,
              private postService: PostService,
              private renderer: Renderer2,
              private router: Router) { }

  ngOnInit(): void {
    this.fetchUser();
    this.fetchSubjects();
    console.log("les datas", this.user)
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
  selectSubject(subject: Subject): void {
    this.selectedSubject = subject;
    console.log(this.selectedSubject);
    this.fetchPostsBySubject(subject.id);
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
  goToPostDetail(postId: number): void {
    this.router.navigate(['/post', postId]);
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
  goToUserPage(): void {
    this.router.navigate(['/userpage']);
  }
  goToHomePage(): void {
    this.router.navigate(['/home']);
  }

  goToHomeWithSubject(subjectId: number) {
    this.router.navigate(['/home'], { queryParams: { subjectId: subjectId } });
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

}
