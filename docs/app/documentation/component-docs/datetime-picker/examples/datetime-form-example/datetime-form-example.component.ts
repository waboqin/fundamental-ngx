import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'fd-date-time-form-example',
    templateUrl: './datetime-form-example.component.html',
    styleUrls: ['./datetime-form-example.component.scss']
})
export class DateTimeFormExampleComponent {
    customForm = new FormGroup({
        date: new FormControl('', Validators.required)
    });
}
