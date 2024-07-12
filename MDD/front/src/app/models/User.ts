

export class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  createdAt: Date;

  constructor(id: number, firstName: string, lastName: string, email: string, username: string, createdAt: Date) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = email;
    this.email = email;
    this.createdAt = createdAt;

  }
}
