import { UserInv } from "../../../../models/userInv.model";
import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from "@angular/material/dialog";

import { UserInvService } from "../../../../services/user-inv.service";
import swal from "sweetalert2";
import { FuseConfirmDialogComponent } from "../../../../../@fuse/components/confirm-dialog/confirm-dialog.component";
import { Subject } from "rxjs";
import { OnInit } from "@angular/core";
import { SharedVariablesService } from "../../../../services/shared-variables.service";

@Component({
  selector: "contacts-contact-form-dialog",
  templateUrl: "./contact-form.component.html",
  styleUrls: ["./contact-form.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ContactsContactFormDialogComponent implements OnInit {
  action: string;
  contact: UserInv;
  hide = true;
  activate = true;
  passworAuto = Math.random().toString(36).slice(-8);
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
    public _matDialog: MatDialog,
    private servCamp: SharedVariablesService
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
      correo: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            "[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}"
          ),
        ],
      ],
      password: [this.passworAuto, Validators.required],
      //passwordConfirm: ["", [Validators.required, confirmPasswordValidator]],
      telefono: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
      direccion: ["", Validators.required],
    });
    //console.log("Generate Password Auto ", this.passworAuto);

    if (this.action === "edit") {
      this.invUserForm = this.createContactForm();
    }
  }
  ngOnInit(): void {
    /*this.invUserForm
      .get("password")
      .valueChanges.pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.invUserForm.get("passwordConfirm").updateValueAndValidity();
      });*/
  }

  onSave(check) {
    const data = this.invUserForm.getRawValue();
    console.log(data);
    this.invService.addInvUser(data).subscribe((res) => {
      if (res.success && res.autorizado) {
        swal
          .fire({
            title: "Invitado registrado",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          })
          .then(() => {
            if (check.checked) {
              this.asociarAcamp(data);
            }
          });
        this.contact = data;
        this.invService.getInvitados().subscribe((data) => {
          console.log(data);
        });
      } else if (res.success === false) {
        swal.fire({
          title: "Este usuario ya está registrado",
          icon: "info",
          showConfirmButton: false,
          timer: 2000,
        });
      }
      if (res.autorizado === false) {
        swal.fire({
          title: "No está autorizado",
          icon: "info",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  }

  onSaveEdit(check) {
    swal
      .fire({
        title:
          "Se actualizará la información de este usuario y recuerde que por defecto se asociará a la Campaña; si asociarlo no es el caso por favor desactívela antes de continuar. ¿Desea continuar?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No",
        allowOutsideClick: true,
      })
      .then((result) => {
        if (result.value) {
          this.invService
            .updateInfo(this.invUserForm.getRawValue())
            .subscribe((data) => {
              swal
                .fire({
                  title: "Información de usuario actualizada",
                  icon: "success",
                  showConfirmButton: false,
                  timer: 2000,
                })
                .then(() => {
                  if (check.checked) {
                    this.asociarAcamp(this.invUserForm.getRawValue());
                  }
                });

              this.invService.getInvitados().subscribe((data) => {
                console.log(data);
              });
            });
        } else {
        }
      });
  }

  onDelete() {
    swal
      .fire({
        title: "¿Está seguro que desea eliminarlo?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No",
        allowOutsideClick: true,
      })
      .then((result) => {
        if (result.value) {
          this.invService.getStatusAsociado(this.contact).subscribe((res) => {
            console.log(res.success);
            if (res.success != true) {
              swal
                .fire({
                  title:
                    "Este usuario está asociado y si se elimina será desvinculado. ¿Desea continuar?",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonText: "Sí",
                  cancelButtonText: "No",
                  allowOutsideClick: true,
                })
                .then((result) => {
                  if (result.value) {
                    this.invService
                      .deleteUserInv(this.invUserForm.getRawValue())
                      .subscribe((res) => {
                        if (res.success) {
                          swal.fire({
                            title: "Usuario eliminado",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 2000,
                          });
                        } else {
                          swal.fire({
                            title: "Falló la acción",
                            icon: "error",
                            showConfirmButton: false,
                            timer: 2000,
                          });
                        }
                      });
                    this.invService.getFiltersInvCAMP().subscribe((data) => {
                      console.log(data);
                      this.invService.getInvitados().subscribe((data) => {
                        console.log(data);
                      });
                    });
                  } else {
                  }
                });
            } else {
              this.invService
                .deleteUserInv(this.invUserForm.getRawValue())
                .subscribe((data) => {
                  console.log(data);
                });
              swal.fire({
                title: "Usuario eliminado",
                icon: "success",
                showConfirmButton: false,
                timer: 2000,
              });
              this.invService.getInvitados().subscribe((data) => {
                console.log(data);
              });
            }
          });
        } else {
        }
      });
  }

  deleteAcces(invitado) {
    this.invService.deleteAcces(invitado).subscribe((data) => {
      console.log(data);
    });
  }
  asociarAcamp(contact) {
    /*swal
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
        if (result.value) {*/
    this.invService.getStatusAsociado(contact).subscribe((res) => {
      console.log(res.success);
      if (res.success) {
        this.invService.AddCampInv(contact).subscribe((res) => {
          if (res.message === "Asociado a la Campaña con éxito") {
            this.updateAcces(contact);
            // "<h3>Para cambiar la contraseña vaya a la opción Editar</h3>" +
            //"<br>" +
            swal.fire({
              title:
                "Ahora el usuario tiene acceso a la Campaña: " +
                this.servCamp.getName(),
              html: "<h3>Se le notificará al usuario de la propuesta de contraseña por correo</h3>",
              icon: "success",
              showConfirmButton: false,
              timer: 4000,
              timerProgressBar: true,
            });
            this.invService.getFiltersInvCAMP().subscribe((data) => {
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

  updateAcces(contact) {
    this.invService.darAcceso(contact).subscribe((data) => {
      console.log(data);
    });
  }

  statusAsociado(contact): any {
    this.invService.getStatusAsociado(contact).subscribe((res) => {
      console.log(res.success);
      return res.success;
    });
  }
  statusAcces(invitado) {
    this.invService.getStatusAcceso(invitado).subscribe((res) => {
      if (res.success) {
        //this.showStatus = true;
      } else {
        //this.showStatus = false;
      }
    });
  }
  /* cambiarPass() {
    this.invService.getStatusAsociado(this.contact).subscribe((res) => {
      console.log(res.success);
      if (res.success != true) {
        swal
          .fire({
            title: "Modificación de contraseña",
            html: "<h4>¿Está seguro que desea cambiarla?</h4>",
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
                  inputValue: "",
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
                            .updatePass(this.contact)
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
          title: "Este usuario no está asociado aún",
          icon: "info",
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
                this.invService.updatePass(this.contact).subscribe((data) => {
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
  }*/

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
    return this._formBuilder.group({
      id: [this.contact.id],
      nombre: [this.contact.nombre],
      correo: [this.contact.correo],
      telefono: [this.contact.telefono],
      direccion: [this.contact.direccion],
    });
  }
}

/*export const confirmPasswordValidator: ValidatorFn = (
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
};*/
