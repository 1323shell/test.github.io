import { Component } from '@angular/core';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent {
    user = [
        {
            id: 1,
            name: 'Max'
        },
        {
            id: 2,
            name: 'Anna'
        },
        {
            id: 3,
            name: 'Chris'
        }
    ];
}