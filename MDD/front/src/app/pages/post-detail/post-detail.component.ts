import {Component, HostListener, OnInit, Renderer2} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { CommentService } from '../../../services/comment.service';
import { Post } from '../../models/Post';
import { Comment } from '../../models/Comment';
import {AuthService} from "../../../services/auth.service";
import {UserService} from "../../../services/user.service";
import {User} from "../../models/User";

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  user: User | null = null;
  post: Post | null = null;
  comments: Comment[] | null = null;
  commentContent: string = '';
  isMenuOpen: boolean = false;


  constructor(private route: ActivatedRoute,
              private postService: PostService,
              private commentService: CommentService,
              private router: Router,
              private authService: AuthService,
              private renderer: Renderer2,
              private userService: UserService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const postId = +params['id'];
      this.fetchPost(postId);
      this.fetchComments(postId);
      this.fetchUser();
    });
  }

  fetchPost(postId: number): void {
    this.postService.getPostById(postId).subscribe(
      (data) => {
        this.post = data;
      },
      (error) => {
        console.error('Error fetching post', error);
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

  fetchComments(postId: number): void {
    this.commentService.getCommentsByPostId(postId).subscribe(
      (data) => {
        console.log('Comments fetched:', data);
        this.comments = data;
      },
      (error) => {
        console.error('Error fetching comments', error);
      }
    );
  }

  goToHomePage(): void {
    this.router.navigate(['/home']);
  }

  addComment(form: any): void {
    if (!this.post || !this.post.id || !this.commentContent) {
      console.log('Invalid post or comment content missing');
      return;
    }

    const commentRequest = {
      userId: this.authService.getUserId(),
      postId: this.post.id,
      content: this.commentContent
    };

    console.log('Adding comment:', commentRequest);

    this.commentService.addComment(commentRequest).subscribe(
      () => {
        // Refresh comments after adding
        // @ts-ignore
        this.fetchComments(this.post.id);

        form.resetForm();
        this.commentContent = '';
      },
      (error) => {
        console.error('Error adding comment', error);
      }
    );
  }
  deleteComment(commentId: number, commentUserId: number): void {
    const userId = this.authService.getUserId();
    if (userId && userId === commentUserId) {
      this.commentService.deleteComment(commentId, userId).subscribe(
        () => {
          console.log('Commentaire supprimé avec succès');
          // @ts-ignore
          this.fetchComments(this.post.id);


        },
        (error) => {
          console.error('Erreur lors de la suppression du commentaire', error);
        }
      );
    } else {
      console.error('Vous n\'êtes pas autorisé à supprimer ce commentaire');

    }
  }
  goToUserPage(): void {
    this.router.navigate(['/userpage']);
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    if (!(event.target as HTMLElement).closest('.mobile-menu') && !(event.target as HTMLElement).closest('.menu-button')) {
      this.closeMenu();
    }
  }
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    console.log(this.isMenuOpen);
  }

  closeMenu(): void {
    const menu = document.querySelector('.mobile-menu');
    if (menu) {
      menu.classList.remove('open');
    }
  }
}
