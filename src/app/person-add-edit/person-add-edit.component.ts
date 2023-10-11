import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PersonsService } from '../services/persons.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-person-add-edit',
  templateUrl: './person-add-edit.component.html',
  styleUrls: ['./person-add-edit.component.scss']
})
export class PersonAddEditComponent {
  personForm: FormGroup;

  constructor(private _fb: FormBuilder, 
    private _personService: PersonsService, 
    private _dialogRef: MatDialogRef<PersonAddEditComponent>
  ) {
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
      this._personService.addPerson(this.personForm.value).subscribe({
        next: (val: any) => {
          alert('Persona agregada con éxito');
          this._dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }
  }
}