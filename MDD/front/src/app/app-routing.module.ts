

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import {UserComponent} from "./pages/user/user.component";
import {LandingPageComponent} from "./pages/landing-page/landing-page.component";
import {PostDetailComponent} from "./pages/post-detail/post-detail.component";
import {ArticleComponent} from "./pages/article/article.component";
import {SubjectComponent} from "./pages/subject/subject.component";


const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'userpage', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'article', component: ArticleComponent },
  { path: 'post/:id', component: PostDetailComponent },
  { path: 'subject', component: SubjectComponent }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
