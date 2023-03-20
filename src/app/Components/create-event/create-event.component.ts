import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
  newEventForm! : FormGroup;

  constructor(private _fb : FormBuilder){}

  ngOnInit(): void {
    this.newEventForm = this._fb.group({
      name : [null, [Validators.required, Validators.minLength(2), Validators.maxLength(32)]],
      start_date : [null, [Validators.required]],
      end_date : [null, [Validators.required]],
      is_all_day : [null, [Validators.required]],
      start_time : [null, []],
      end_time : [null, []],
      place : [null, [Validators.minLength(2), Validators.maxLength(64)]],
      participants : this._fb.array([])
    });
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
