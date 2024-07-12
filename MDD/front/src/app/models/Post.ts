
import { Subject } from './Subject';
import { User } from './User';

export class Post {
  id: number;
  subject: Subject;
  user: User;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    subject: Subject,
    user: User,
    title: string,
    content: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.subject = subject;
    this.user = user;
    this.title = title;
    this.content = content;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
