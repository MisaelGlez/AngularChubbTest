import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PersonAddEditComponent } from './person-add-edit/person-add-edit.component';
import { PersonsService } from './services/persons.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'crud-app-chubb';

  displayedColumns: string[] = [
    'id', 
    'name', 
    'address', 
    'email', 
    'phone', 
    'birthdate',
    'action',
  ];


  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private _empService: PersonsService) {}

  ngOnInit(): void {
    this.getPersons();
  }

  openAddEditPersonForm() {
    const dialogRef = this._dialog.open(PersonAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPersons();
        }
      }
    })
  }

  getPersons() {
    this._empService.getPersons().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deletePerson(id: number) {
    this._empService.deletePerson(id).subscribe({
      next: (res) => {
        alert('Se ha eliminado la Persona con éxito');
        this.getPersons();
      },
      error: (err) => {
        console.log(err);
      },
    })
  }
}
