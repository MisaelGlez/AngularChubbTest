import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-person-add-edit',
  templateUrl: './person-add-edit.component.html',
  styleUrls: ['./person-add-edit.component.scss']
})
export class PersonAddEditComponent {
  personForm: FormGroup;

  constructor(private _fb: FormBuilder) {
    this.personForm = this._fb.group({
      name: '',
      address: '',
      email: '',
      phone: '',
      birthdate: '',
    })
  }

  onFormSubmit() {
    if(this.personForm.valid){
      console.log(this.personForm.value);
    }
  }
}