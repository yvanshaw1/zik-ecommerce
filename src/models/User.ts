// Representa um usuário autenticado na aplicação.
// Mantém apenas os dados necessários para o front (username e email opcional).
export class User {
  readonly username: string;
  readonly email?: string;

  constructor(params: { username: string; email?: string }) {
    this.username = params.username;
    this.email = params.email;
  }
}
