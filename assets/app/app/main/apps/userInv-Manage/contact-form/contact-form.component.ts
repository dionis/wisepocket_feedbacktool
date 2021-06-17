import { UserInv } from "../../../../models/userInv.model";
import { Component, Inject, ViewEncapsulation } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from "@angular/material/dialog";

import { UserInvService } from "../../../../services/user-inv.service";
import swal from "sweetalert2";
import { FuseConfirmDialogComponent } from "../../../../../@fuse/components/confirm-dialog/confirm-dialog.component";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { title } from "process";

@Component({
  selector: "contacts-contact-form-dialog",
  templateUrl: "./contact-form.component.html",
  styleUrls: ["./contact-form.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ContactsContactFormDialogComponent {
  action: string;
  contact: UserInv;
  //contactForm: FormGroup;
  invUserForm: FormGroup;
  dialogTitle: string;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  private _unsubscribeAll: Subject<any>;
  /**
   * Constructor
   *
   * @param {MatDialogRef<ContactsContactFormDialogComponent>} matDialogRef
   * @param _data
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    private invService: UserInvService,
    public matDialogRef: MatDialogRef<ContactsContactFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder,
    public _matDialog: MatDialog
  ) {
    this._unsubscribeAll = new Subject();
    // Set the defaults
    this.action = _data.action;

    if (this.action === "edit") {
      this.dialogTitle = "Editar Invitado";
      this.contact = _data.contact;
    } else {
      this.dialogTitle = "Nuevo Invitado";
    }
    this.invUserForm = this._formBuilder.group({
      nombre: ["", Validators.required],
      correo: ["", [Validators.required, Validators.email]],
      telefono: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
      direccion: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ["", [Validators.required, confirmPasswordValidator]],
    });
    this.invUserForm
      .get("password")
      .valueChanges.pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.invUserForm.get("passwordConfirm").updateValueAndValidity();
      });
    if (this.action === "edit") {
      this.invUserForm = this.createContactForm();
    }
  }

  onSave() {
    const data = this.invUserForm.getRawValue();
    console.log(data);
    this.invService.addInvUser(data).subscribe((res) => {
      if (res.success && res.autorizado) {
        swal.fire("Invitado registrado");
        this.contact = data;
        this.invService.getInvitados().subscribe((data) => {
          console.log(data);
          this.invService.getUsers(data.data);
        });
      } else if (res.success === false) {
        swal.fire("Este usuario ya está registrado");
      }
      if (res.autorizado === false) {
        swal.fire("No está autorizado");
      }
    });
  }

  onSaveEdit() {
    this.invService
      .updateInfo(this.invUserForm.getRawValue())
      .subscribe((data) => {
        console.log(data);
        this.invService
          .getStatusAsociado(this.invUserForm.getRawValue())
          .subscribe((res) => {
            console.log(res.success);
            if (!res.success) {
              this.invService
                .updatePass(this.invUserForm.getRawValue())
                .subscribe((data) => {});
              swal.fire("Información de usuario y contraseña actualizados");
              this.invService.getInvitados().subscribe((data) => {
                console.log(data);
                this.invService.getUsers(data.data);
              });
            } else {
              swal.fire(
                "Información de usuario actualizado, no se cambió la contraseña ya que este usuario no tiene acceso"
              );
              this.invService.getInvitados().subscribe((data) => {
                console.log(data);
                this.invService.getUsers(data.data);
              });
            }
          });
      });
  }

  onDelete() {
    this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
      disableClose: false,
    });
    this.confirmDialogRef.componentInstance.confirmMessage =
      "¿Está seguro que desea eliminarlo?";
    this.confirmDialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.invService
          .deleteUserInv(this.invUserForm.getRawValue())
          .subscribe((data) => {
            console.log(data);
          });
        swal.fire("Usuario eliminado");
        this.invService.getInvitados().subscribe((data) => {
          console.log(data);
          this.invService.getUsers(data.data);
        });
      }
      this.confirmDialogRef = null;
    });
  }

  deleteAcces(invitado) {
    this.invService.deleteAcces(invitado).subscribe((data) => {
      console.log(data);
    });
  }

  cambiarPass() {
    this.invService.getStatusAsociado(this.contact).subscribe((res) => {
      console.log(res.success);
      if (res.success != true) {
        swal
          .fire({
            title: "Modificación de contraseña",
            text: "¿Está seguro que desea cambiarla?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí",
            cancelButtonText: "No",
            allowOutsideClick: true,
          })
          .then((result) => {
            if (result.value) {
              swal
                .fire({
                  title: "Cambiar contraseña",
                  html: "<h4>Escriba la nueva contraseña.<br> Tenga en cuanta que el navegador puede tener activado el autocompletado por lo que puede aparcer una contraseña la cual debe eliminar y poner la correspondiente</h4>",
                  input: "password",
                  inputPlaceholder: "Nueva Contraseña",
                  inputValidator: (result) => !result && "Campo requerido",
                  showCancelButton: true,
                  confirmButtonText: "Confirmar",
                  cancelButtonText: "Cancelar",
                  allowOutsideClick: true,
                })
                .then((result) => {
                  if (result.value) {
                    let conf = result.value;
                    swal
                      .fire({
                        title: "Confirmar contraseña",
                        html: "<h4>Confirme su contraseña.<br> Tenga en cuanta que el navegador puede tener activado el autocompletado por lo que puede aparcer una contraseña la cual debe eliminar y confirmar su contraseña</h4>",
                        input: "password",
                        inputPlaceholder: "Nueva Contraseña",
                        inputValidator: (result) =>
                          !result && "Campo requerido",
                        showCancelButton: true,
                        confirmButtonText: "Cambiar",
                        cancelButtonText: "Cancelar",
                        allowOutsideClick: true,
                      })
                      .then((result) => {
                        if (conf === result.value) {
                          this.invService
                            .updatePassTemp(this.contact, result.value)
                            .subscribe((data) => {
                              swal.fire({
                                title: "Éxito",
                                icon: "success",
                                showConfirmButton: false,
                                timer: 2000,
                              });
                            });
                        } else {
                          this.error();
                        }
                      });
                  } else {
                  }
                });
            } else {
            }
          });
      } else {
        swal.fire({
          title: "Este usuario no esta asociado aún",
          icon: "warning",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
  }

  error() {
    swal
      .fire({
        title: "No coinciden las contraseñas, vuelva a intentarlo",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      })
      .then((result) => {
        if (result) {
          this.confirm();
        }
      });
  }
  confirm() {
    swal
      .fire({
        title: "Cambiar contraseña",
        html: "<h4>Escriba la nueva contraseña.<br> Tenga en cuanta que el navegador puede tener activado el autocompletado por lo que puede aparcer una contraseña la cual debe eliminar y poner la correspondiente</h4>",
        input: "password",
        inputPlaceholder: "Nueva Contraseña",
        inputValidator: (result) => !result && "Campo requerido",
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        allowOutsideClick: true,
      })
      .then((result) => {
        if (result.value) {
          let conf = result.value;
          swal
            .fire({
              title: "Confirmar contraseña",
              html: "<h4>Confirme su contraseña.<br> Tenga en cuanta que el navegador puede tener activado el autocompletado por lo que puede aparcer una contraseña la cual debe eliminar y confirmar su contraseña</h4>",
              input: "password",
              inputPlaceholder: "Nueva Contraseña",
              inputValidator: (result) => !result && "Campo requerido",
              showCancelButton: true,
              confirmButtonText: "Cambiar",
              cancelButtonText: "Cancelar",
              allowOutsideClick: true,
            })
            .then((result) => {
              if (conf === result.value) {
                this.invService
                  .updatePassTemp(this.contact, result.value)
                  .subscribe((data) => {
                    swal.fire({
                      title: "Éxito",
                      icon: "success",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  });
              } else {
                this.error();
              }
            });
        } else {
        }
      });
  }

  status(invitado): any {
    let temp;
    this.invService.getStatusAsociado(invitado).subscribe((res) => {
      if (res.success) {
        temp = true;
      } else {
        temp = false;
      }
    });
    return temp;
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Create contact form
   *
   * @returns {FormGroup}
   */
  createContactForm(): FormGroup {
    console.log("New Form");
    this.contact.password = "";
    return this._formBuilder.group({
      id: [this.contact.id],
      nombre: [this.contact.nombre],
      correo: [this.contact.correo],
      telefono: [this.contact.telefono],
      password: [this.contact.password],
      passwordConfirm: [this.contact.password],
      direccion: [this.contact.direccion],
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
