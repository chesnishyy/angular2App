import {Component, OnInit} from "angular2/core";
import {UserService} from "./user.service";
import {RouterLink} from "angular2/router";


@Component({
    selector: 'users',
    templateUrl: "app/users.component.html",
    providers: [UserService],
    directives: [RouterLink]
})
export class UsersComponent implements OnInit {
    users: any[];

    constructor(private _userService: UserService){
    }

    ngOnInit(){
        this._userService.getUsers()
            .subscribe(users => this.users = users)
    }

    deleteUser(user){
        if(confirm("Are you sure want to delete " + user.name + "?")){
            let index = this.users.indexOf(user);
            this.users.slice(index, 1);

            this._userService.deleteUser(user.id)
                .subscribe(null, err => {
                    alert("Couldn't delete the user.");
                    this.users.splice(index, 0, user);
                })

        }
    }

}