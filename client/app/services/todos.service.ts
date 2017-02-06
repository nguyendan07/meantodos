import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TodoService {
    constructor(private _http: Http){

    }

    getTodo(){
        return this._http.get('/api/v1/todos').map(res => res.json());
    }
}