import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorsService {

  constructor() { }

  checkDate() : ValidatorFn{
    return (control : AbstractControl) : ValidationErrors | null =>{
      const start_date : AbstractControl | null = control.get('start_date');
      const end_date : AbstractControl | null = control.get('end_date');
      if( start_date == null || end_date == null) return null;
      if( start_date.value == end_date.value ) return null;
      const start_val = new Date(start_date.value);
      const end_val = new Date(end_date.value);
      if(start_val <= end_val) return null;
      return {checkDate:true};
    }
  }

  checkTimeNeeded() : ValidatorFn{
    return (control : AbstractControl) : ValidationErrors | null =>{
      const is_all_day : AbstractControl | null = control.get('is_all_day');
      if (is_all_day == null) return null;
      if (is_all_day.value) return null;
      const start_time : AbstractControl | null = control.get('start_time');
      const end_time : AbstractControl | null = control.get('end_time');
      if(start_time?.value && end_time?.value) return null;
      return {checkTimeNeeded:true};
    }
  }
}
