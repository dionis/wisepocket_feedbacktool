import { Breakpoints } from "@angular/cdk/layout";
import { SharedVariablesService } from "../../../../services/shared-variables.service";
import { Inject } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { UserInv } from "../../../../models/userInv.model";
import { UserInvService } from "../../../../services/user-inv.service";
import swal from "sweetalert2";
import { FuseConfirmDialogComponent } from "../../../../../@fuse/components/confirm-dialog/confirm-dialog.component";

@Component({
  selector: "app-contact-asociar",
  templateUrl: "./contact-asociar.component.html",
  styleUrls: ["./contact-asociar.component.scss"],
})
export class ContactAsociarComponent implements OnInit {
  action: string;
  contact: UserInv;
  nameCamp: string;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  //contactForm: FormGroup;
  invUserForm: FormGroup;
  dialogTitle: string;
  estadoAcceso: boolean;
  constructor(
    public matDialogRef: MatDialogRef<ContactAsociarComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder,
    private invService: UserInvService,
    private servCamp: SharedVariablesService,
    public _matDialog: MatDialog
  ) {
    this.action = _data.action;
    this.estadoAcceso = false;
    if (this.action === "asociar") {
      this.dialogTitle = "Asociar a Campaña";
      this.contact = _data.contact;
    }
    this.invUserForm = this._formBuilder.group({
      contraseña: ["", Validators.required],
    });
    this.nameCamp = this.servCamp.getName();
    console.log(this.nameCamp);

    this.invUserForm = this.createContactForm();
  }

  ngOnInit(): void {}

  asociarAcamp(contact) {
    this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
      disableClose: false,
    });

    this.confirmDialogRef.componentInstance.confirmMessage =
      "¿Está seguro que desea vincular a " +
      contact.nombre +
      " y darle acceso a la campaña " +
      this.servCamp.getName() +
      "?";

    this.confirmDialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.invService.getStatusAcceso(contact).subscribe((res) => {
          console.log(res.success);
          if (res.success) {
            this.invService.AddCampInv(contact).subscribe((res) => {
              if (res.message === "Asociado a la Campaña con éxito") {
                this.updatePass(contact);
                this.updateAcces(contact);
                swal.fire(
                  "Ahora el usuario tiene acceso a la Campaña: " +
                    this.servCamp.getName(),
                  "Cuando asocie este usuario a otra campaña debe ser la misma contraseña que se usó." +
                    "  " +
                    "Si pone una nueva contraseña pues esa es la que usará a partir de ahora"
                );
                this.invService.getFiltersAllInv().then((data) => {
                  console.log(data);
                  this.invService.getUsers(data.data);
                });
              } else if (res.success === false) {
                swal.fire("Fallo la operación");
              }
              this.statusAcces(contact);
            });
          } else {
            swal.fire("Ya está asociado");
          }
        });
      }
      this.confirmDialogRef = null;
    });
  }

  alert() {
    swal.fire();
  }

  updatePass(contact) {
    this.invService.updatePass(contact).subscribe((data) => {
      console.log(data);
    });
  }

  updateAcces(contact) {
    this.invService.darAcceso(contact).subscribe((data) => {
      console.log(data);
    });
  }

  statusAcces(contact): any {
    this.invService.getStatusAcceso(contact).subscribe((res) => {
      console.log(res.success);
      return res.success;
    });
  }

  createContactForm(): FormGroup {
    console.log("New Form");
    this.contact.password = "";
    return this._formBuilder.group({
      id: [this.contact.id],
      nombre: [this.contact.nombre],
      correo: [this.contact.correo],
      telefono: [this.contact.telefono],
      password: [this.contact.password],
      direccion: [this.contact.direccion],
    });
  }
}
