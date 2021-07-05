import { Breakpoints } from "@angular/cdk/layout";
import { SharedVariablesService } from "../../../../services/shared-variables.service";
import { Inject } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { UserInv } from "../../../../models/userInv.model";
import { UserInvService } from "../../../../services/user-inv.service";
import swal from "sweetalert2";
import { FuseConfirmDialogComponent } from "../../../../../@fuse/components/confirm-dialog/confirm-dialog.component";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

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
  private _unsubscribeAll: Subject<any>;
  constructor(
    public matDialogRef: MatDialogRef<ContactAsociarComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder,
    private invService: UserInvService,
    private servCamp: SharedVariablesService,
    public _matDialog: MatDialog
  ) {
    this._unsubscribeAll = new Subject();
    this.action = _data.action;
    this.estadoAcceso = false;
    if (this.action === "asociar") {
      this.dialogTitle = "Asociar a Campaña";
      this.contact = _data.contact;
    }
    this.nameCamp = this.servCamp.getName();
    console.log(this.nameCamp);

    this.invUserForm = this.createContactForm();
  }

  ngOnInit(): void {
    this.invUserForm
      .get("password")
      .valueChanges.pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.invUserForm.get("passwordConfirm").updateValueAndValidity();
      });
  }

  asociarAcamp(contact) {
    swal
      .fire({
        title:
          "¿Está seguro que desea vincular a " +
          contact.nombre +
          " y darle acceso a la campaña " +
          this.servCamp.getName() +
          "?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No",
        allowOutsideClick: true,
      })
      .then((result) => {
        if (result.value) {
          this.invService.getStatusAsociado(contact).subscribe((res) => {
            console.log(res.success);
            if (res.success) {
              this.invService.AddCampInv(contact).subscribe((res) => {
                if (res.message === "Asociado a la Campaña con éxito") {
                  this.updatePass(contact);
                  this.updateAcces(contact);
                  swal.fire({
                    title:
                      "Ahora el usuario tiene acceso a la Campaña: " +
                      this.servCamp.getName(),
                    html: "<h3>Para cambiar la contraseña vaya a la opción Editar</h3>",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 4000,
                  });
                  this.invService.getInvitados().subscribe((data) => {
                    console.log(data);
                  });
                } else if (res.success === false) {
                  swal.fire({
                    title: "Fallo la operación",
                    icon: "error",
                    showConfirmButton: false,
                    timer: 2500,
                  });
                }
                this.statusAcces(contact);
              });
            } else {
              swal.fire({
                title: "Ya está asociado",
                icon: "info",
                showConfirmButton: false,
                timer: 2500,
              });
            }
          });
        }
      });
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
    this.invService.getStatusAsociado(contact).subscribe((res) => {
      console.log(res.success);
      return res.success;
    });
  }

  createContactForm(): FormGroup {
    this.contact.password = "";
    return this._formBuilder.group({
      password: ["", Validators.required],
      passwordConfirm: ["", [Validators.required, confirmPasswordValidator]],
    });
  }
}
export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  if (!control.parent || !control) {
    return null;
  }

  const password = control.parent.get("password");
  const passwordConfirm = control.parent.get("passwordConfirm");

  if (!password || !passwordConfirm) {
    return null;
  }

  if (passwordConfirm.value === "") {
    return null;
  }

  if (password.value === passwordConfirm.value) {
    return null;
  }

  return { passwordsNotMatching: true };
};
