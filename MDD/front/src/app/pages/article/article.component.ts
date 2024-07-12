import {Component, HostListener, OnInit, Renderer2} from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { PostRequest } from '../../models/PostRequest';
import { SubjectService } from '../../../services/subject.service';
import { Subject } from '../../models/Subject';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  subjects: Subject[] = [];
  postRequest: PostRequest = {
    userId: 0,
    subjectId: 0,
    title: '',
    content: ''
  };

  selectedSubject: Subject | null = null;
  isMenuOpen: boolean = false;



  constructor(
    private postService: PostService,
    private authService: AuthService,
    private subjectService: SubjectService,
    private render: Renderer2,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.postRequest.userId = userId;
    }
    this.fetchSubjects();
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

  createPost(): void {
    if (this.selectedSubject == null) {
      console.error('Please select a subject');
      return;
    }
    this.postRequest.subjectId = this.selectedSubject.id;
    console.log("oui", this.selectedSubject.name)


    this.postService.createPost(this.postRequest).subscribe(
      (response) => {
        console.log('Réponse du serveur:', response);
        console.log('Post créé avec succès');

      },
      (error) => {
        console.error('Erreur lors de la création du post', error);
        if (error.error && error.error.message) {
          console.error('Message d\'erreur du serveur:', error.error.message);
        }
      }
    );
  }

  selectSubject(subject: Subject): void {
    this.selectedSubject = subject;
    console.log(this.selectedSubject)
  }

  goToHomePage(): void {
    this.router.navigate(['/home']);
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
  }
  closeMenu(): void {
    const menu = document.querySelector('.mobile-menu');
    if (menu) {
      menu.classList.remove('open');
    }
  }
}
