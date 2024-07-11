// src/app/models/Subscription.ts

import { User } from './User';
import { Subject } from './Subject';

export class Subscription {
  id: number;
  user: User;
  subject: Subject;

  constructor(id: number, user: User, subject: Subject) {
    this.id = id;
    this.user = user;
    this.subject = subject;
  }
}
