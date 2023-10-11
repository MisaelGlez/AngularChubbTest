import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PersonsService } from '../services/persons.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-person-add-edit',
  templateUrl: './person-add-edit.component.html',
  styleUrls: ['./person-add-edit.component.scss']
})
export class PersonAddEditComponent implements OnInit {
  personForm: FormGroup;

  constructor(private _fb: FormBuilder, 
    private _personService: PersonsService, 
    private _dialogRef: MatDialogRef<PersonAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.personForm = this._fb.group({
      name: '',
      address: '',
      email: '',
      phone: '',
      birthdate: '',
    })
  }

  ngOnInit(): void {
    this.personForm.patchValue(this.data);
  }

  onFormSubmit() {
    if(this.personForm.valid){
      if(this.data) {
        this._personService
        .updatePerson(this.data.id, this.personForm.value)
        .subscribe({
          next: (val: any) => {
            alert('Los datos de la Persona se actualizaron con éxito');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      } else {
        this._personService
        .addPerson(this.personForm.value)
        .subscribe({
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
}