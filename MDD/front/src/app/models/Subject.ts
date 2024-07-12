

import { Post } from './Post';
import { Subscription } from './Subscription';

export class Subject {
  id: number;
  name: string;
  description: string;
  posts: Post[];
  subscriptions: Subscription[];

  constructor(
    id: number,
    name: string,
    description: string,
    posts: Post[],
    subscriptions: Subscription[]
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.posts = posts;
    this.subscriptions = subscriptions;
  }
}
