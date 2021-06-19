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
      telefono: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
      direccion: ["", Validators.required],
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
        swal.fire({
          title: "Invitado registrado",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
        this.contact = data;
        this.invService.getInvitados().subscribe((data) => {
          console.log(data);
          this.invService.getUsers(data.data);
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

  onSaveEdit() {
    swal
      .fire({
        title:
          "Se actualizará la información de este usuario. ¿Desea continuar?",
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
              swal.fire({
                title: "Información de usuario actualizada",
                icon: "success",
                showConfirmButton: false,
                timer: 2000,
              });
              this.invService.getInvitados().subscribe((data) => {
                console.log(data);
                this.invService.getUsers(data.data);
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
                    this.invService.getInvitados().subscribe((data) => {
                      console.log(data);
                      this.invService.getUsers(data.data);
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
                this.invService.getUsers(data.data);
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

  cambiarPass() {
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
    return this._formBuilder.group({
      id: [this.contact.id],
      nombre: [this.contact.nombre],
      correo: [this.contact.correo],
      telefono: [this.contact.telefono],
      direccion: [this.contact.direccion],
    });
  }
}
