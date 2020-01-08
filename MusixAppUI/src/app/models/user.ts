export class User {
    id:number;
    email:string;
    password:string;
    profileImage:any;

    constructor(email:string, password:string){
        this.email = email;
        this.password = password;
    }


}
