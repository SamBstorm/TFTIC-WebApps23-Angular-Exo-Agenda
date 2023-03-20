import { CustomValidatorsService } from './../../Services/custom-validators.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
  newEventForm! : FormGroup;

  constructor(
    private _fb : FormBuilder,
    private _validators : CustomValidatorsService
    ){}

  ngOnInit(): void {
    this.newEventForm = this._fb.group({
      name : [null, [Validators.required, Validators.minLength(2), Validators.maxLength(32)]],
      start_date : [null, [Validators.required]],
      end_date : [null, [Validators.required]],
      is_all_day : [null, []], //Validators.required oblige que la case soit cochée...
      start_time : [null, []],
      end_time : [null, []],
      place : [null, [Validators.minLength(2), Validators.maxLength(64)]],
      participants : this._fb.array([])
    },
    //Ajout de validators pour l'ensemble du FormGroup
    { validator:[
      this._validators.checkDate(),
      this._validators.checkTimeNeeded()
    ]});
  }

  addParticipant():void{
    this.getParticipantsForms().push(
      this._fb.group({
        last_name : [null, [Validators.minLength(2), Validators.maxLength(32)]],
        first_name : [null, [Validators.minLength(2), Validators.maxLength(32)]],
        email : [null, [Validators.required, Validators.minLength(5), Validators.maxLength(255), Validators.email]],
      })
    );
  }

  onSubmit() : void{
    console.dir(this.newEventForm);
  }

  getParticipantsForms() : FormArray{
    return this.newEventForm.get('participants') as FormArray;
  }
}
