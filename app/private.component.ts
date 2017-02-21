import {Component} from 'angular2/core';
import {AuthenticationService} from './authentication.service'


@Component({
    selector: 'my-app',
    providers: [AuthenticationService],
	templateUrl:'app/home.html',
})

export class PrivateComponent {

    constructor(
        private _service:AuthenticationService){}

    ngOnInit(){
        this._service.checkCredentials();
    }

    logout() {
        this._service.logout();
    }
}