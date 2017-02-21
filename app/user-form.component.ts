import {Component} from "angular2/core";
import {FormBuilder, ControlGroup, Validators} from 'angular2/common';
import {BasicValidators} from './basic.validators'
import {CanDeactivate} from 'angular2/router';
import {RouterLink} from "angular2/router";
import {Router} from "angular2/src/router/router";
import {UserService} from "./user.service";

@Component({
    selector: 'user-form',
    templateUrl: 'app/user-form.component.html',
    directives: [RouterLink],
    providers: [UserService]
})
export class UserFormComponent implements CanDeactivate{

    form: ControlGroup;

    constructor(fb: FormBuilder, private _router: Router, private _userService: UserService){
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

    routerCanDeactivate(next, prev){
       if(this.form.dirty)
           return confirm("You have unsaved changes. Are you sure you want to navigate away?");
       return true;
    }

    save(){
       this._userService.addUser(this.form.value)
           .subscribe(x => {
               this._router.navigate(['Users'])
           })
    }

}