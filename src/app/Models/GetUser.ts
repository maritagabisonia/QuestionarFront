export class GetUser {
    id: number;
    firstName: string;
    username: string;
    password: string;
  
    // Constructor using parameter properties
    constructor(
      id: number = 0,
      username: string = '',
      password: string = '',
      firstName: string = ''
    ) {
      this.id = id;
      this.username = username;
      this.password = password;
      this.firstName = firstName;
    }
  }
  