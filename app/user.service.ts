import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

    private _url = "https://jsonplaceholder.typicode.com/users";

    private _getUserUrl(userId){
        return this._url + '/' + userId;
    }

    constructor(private _http: Http){

    }

    getUsers(){
        return this._http.get(this._url)
            .map(res => res.json())
    }

    getUser(userId){
        return this._http.get(this._getUserUrl(userId))
                .map(res => res.json());
    }

    addUser(user){
        return this._http.put(this._url + '/' + user.id, JSON.stringify(user))
            .map(res => res.json());
    }

    updateUser(user){
        return this._http.put(this._getUserUrl(user.id), JSON.stringify(user))
                .map(res => res.json());
    }

    deleteUser(userId){
        return this._http.delete(this._getUserUrl(userId))
            .map(res => res.json());
    }

}