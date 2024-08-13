export class SignUp{
    firstName: string;
    username: string;
    password: string;
    roleid:number
    constructor(    firstName: string = "" ,   username: string = "" , password: string = "" ,roleid: number = 1 )
    {
        this.firstName=firstName;
        this.username =username;
        this.password =password;
        this.roleid = roleid;
    }
}