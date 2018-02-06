import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AddEntityComponent } from '@modules/library/components/dialogs/add-entity/add-entity.component';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent {

  constructor(private route: ActivatedRoute, private router: Router, private dialog: MatDialog) { }

  onAdd() {
    let dialogRef = this.dialog.open(AddEntityComponent, {
      minWidth: '250px',
      maxWidth: '250px',
      width: '80vw',
      disableClose: false,
      data: { title: "Add" }
    });
  }

}
