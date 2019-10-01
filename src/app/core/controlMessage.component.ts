import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationService } from './validation.service';

@Component({
    selector: 'app-control-messages',
    template: `<div style="color: red;" *ngIf="errorMessages !== null">{{errorMessage}}</div>`
})
export class ControlMessagesComponent {
    errorMessages: string;
    @Input() control: FormControl;
    constructor() { }

    get errorMessage() {
        for (const propertyName in this.control.errors) {
            if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
                return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
            }
        }

        return null;
    }
}
