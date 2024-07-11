import { User } from './User';
import { Post } from './Post';

export interface Comment {
  id: number;
  user: User;
  post: Post;
  content: string;
  createdAt: Date;
}
