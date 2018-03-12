import { Directive, Input } from '@angular/core';
import { AbstractControl, Validator, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[building]',
  providers: [{provide: NG_VALIDATORS, useExisting: BuildingValidatorDirective, multi: true}]
})
export class BuildingValidatorDirective implements Validator {
  @Input() building: any;

  validate(control: AbstractControl): {[key: string]: any} {
    if (this.building && control.value) {
      return null;
    } else {
      return {'buildingValidator': true};
    }
  }
}
