import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-entity',
  templateUrl: './add-entity.component.html',
  styleUrls: ['./add-entity.component.scss']
})
export class AddEntityComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialogRef: MatDialogRef<AddEntityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  onClick(choice) {
    this.router.navigate(['/']);
    switch (choice) {
      case 'book':
        this.router.navigate(['/library/books/add']);
        break;
      case 'student':
        this.router.navigate(['/library/students/add']);
        break;
      case 'class':
        this.router.navigate(['/library/class/add']);
        break;
    }
    this.dialogRef.close(false);
  }

}
