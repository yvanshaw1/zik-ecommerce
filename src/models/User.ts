export class User {
  readonly username: string;
  readonly email?: string;

  constructor(params: { username: string; email?: string }) {
    this.username = params.username;
    this.email = params.email;
  }
}
