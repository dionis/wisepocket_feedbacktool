import { Component, ViewEncapsulation } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { fuseAnimations } from "../../../../@fuse/animations";
import { ContactsContactFormDialogComponent } from "./contact-form/contact-form.component";

@Component({
  selector: "profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class ProfileComponent {
  dialogRef: any;
  /**
   * Constructor
   */
  constructor(private _matDialog: MatDialog) {}

  editContact(contact): void {
    this.dialogRef = this._matDialog.open(ContactsContactFormDialogComponent, {
      panelClass: "contact-form-dialog",
      data: {
        contact: contact,
        action: "edit",
      },
    });
  }
}
