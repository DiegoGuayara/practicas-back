export class UserDto {
  id_persona?: string;
  name: string;
  email: string;
  password?: string;

  constructor(name: string, email: string, password?: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
