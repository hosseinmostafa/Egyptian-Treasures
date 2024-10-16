import { AbstractControl } from '@angular/forms';

export function ForbiddenNameValidator(control: AbstractControl) {

    const forbidden = /admin/.test(control.value) ||
        /Admin/.test(control.value) ||
        /administrator/.test(control.value) ||
        /Administrator/.test(control.value);
    return forbidden ? { 'forbiddenName': { value: control.value } } : null;
}
