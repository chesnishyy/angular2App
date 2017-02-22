import {Component} from "angular2/core";
import {FormBuilder, ControlGroup, Validators} from 'angular2/common';
import {BasicValidators} from './basic.validators'
import {CanDeactivate, RouteParams} from 'angular2/router';
import {RouterLink} from "angular2/router";
import {Router} from "angular2/src/router/router";
import {UserService} from "./user.service";
import {OnInit} from "angular2/src/core/linker/interfaces";
import {User} from "./user";

@Component({
    selector: 'user-form',
    templateUrl: 'app/user-form.component.html',
    directives: [RouterLink],
    providers: [UserService]
})
export class UserFormComponent implements CanDeactivate, OnInit{

    form: ControlGroup;
    title: string;
    user = new User();

    constructor(
        fb: FormBuilder,
        private _router: Router,
        private _routeParams: RouteParams,
        private _userService: UserService
    ){
        this.form = fb.group({
            name: ['', Validators.required],
            email: ['', BasicValidators.email],
            phone: [],
            address: fb.group({
                street: [],
                suite: [],
                city: [],
                zipCode: []
            })
        });
    }

    ngOnInit(){
        let id = this._routeParams.get("id");

        this.title = id ? "Edit User": "New User";

        if(!id)
            return;

        this._userService.getUser(id)
            .subscribe(user => this.user = user, res => {
                if(res.status == 404){
                    this._router.navigate(['NotFound']);
                }
            })
    }

    routerCanDeactivate(next, prev){
       if(this.form.dirty)
           return confirm("You have unsaved changes. Are you sure you want to navigate away?");
       return true;
    }

    save(){
        var result;
        if(this.user.id)
            result = this._userService.updateUser(this.user);
        else
            result = this._userService.addUser(this.form.value);

        result.subscribe(x => {
               this._router.navigate(['Users'])
           });
    }

}