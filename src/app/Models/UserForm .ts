import { Answer } from './Answer';

export class UserForm {
  fullname: string;
  answers: Answer[];

  constructor(fullname: string = '', answers: Answer[] = []) {
    this.fullname = fullname;
    this.answers = answers;
  }
}
