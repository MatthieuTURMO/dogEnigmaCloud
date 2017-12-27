import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
@Directive({
  selector: '[emailPattern][formControlName],[emailPattern][formControl],[emailPattern][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => EmailPatternDirective), multi: true }
  ]
})
export class EmailPatternDirective {

  constructor( @Attribute('emailPattern') public emailPattern: string) { }

  validate(c: AbstractControl): {} {
    // self value (e.g. retype email)
    let v = c.value;

    if (v) {
      if (v.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        return null;
      }
      else {
        return {
          emailPattern: false
        }
      }
    }
    return null;
  }

}
