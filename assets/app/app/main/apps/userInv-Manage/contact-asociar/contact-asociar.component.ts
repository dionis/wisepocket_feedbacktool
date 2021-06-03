import { SharedVariablesService } from '../../../../services/shared-variables.service';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserInv } from '../../../../models/userInv.model';
import { UserInvService } from '../../../../services/user-inv.service';
import swal from "sweetalert2";
import { FuseConfirmDialogComponent } from '../../../../../@fuse/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-contact-asociar',
  templateUrl: './contact-asociar.component.html',
  styleUrls: ['./contact-asociar.component.scss']
})
export class ContactAsociarComponent implements OnInit {
  action: string;
  contact: UserInv;
  nameCamp: string
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>
  //contactForm: FormGroup;
  invUserForm: FormGroup;
  dialogTitle: string;
  estadoAcceso: boolean
  constructor(public matDialogRef: MatDialogRef<ContactAsociarComponent>, @Inject(MAT_DIALOG_DATA) private _data: any, private _formBuilder: FormBuilder, private invService: UserInvService, private servCamp: SharedVariablesService, public _matDialog: MatDialog,) {
    this.action = _data.action;
    this.estadoAcceso = false
    if (this.action === 'asociar') {
      this.dialogTitle = 'Asociar a Campaña';
      this.contact = _data.contact;
    }
    this.invUserForm = this._formBuilder.group({
      contraseña: ['', Validators.required],
    });
    this.nameCamp = this.servCamp.getName()
    console.log(this.nameCamp);

    this.invUserForm = this.createContactForm();

  }

  ngOnInit(): void {

  }

  asociarAcamp(contact) {
    this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
      disableClose: false
    });

    this.confirmDialogRef.componentInstance.confirmMessage = '¿Está seguro que desea vincular a ' + contact.nombre + ' y darle acceso a la campaña ' + this.servCamp.getName() + '?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.invService.AddCampInv(contact).subscribe(res => {
          if (res.message === "Asociado a la Campaña con éxito") {
            this.updatePass(contact)
            this.updateAcces(contact)
            this.estadoAcceso = true
            swal.fire('Ahora el usuario tiene acceso a la Campaña: ' + this.servCamp.getName())
            this.invService.getInvitados().subscribe(data => {
              console.log(data);
              this.invService.getUsers(data.data)

            })
          }
          else if (res.success === false) {
            swal.fire('Fallo la operación')
          }
        });
      }
      this.confirmDialogRef = null;
    });

  }





  updatePass(contact) {
    this.invService.updatePass(contact).subscribe(data => {
      console.log(data);
    });
  }

  updateAcces(contact) {
    this.invService.darAcceso(contact).subscribe(data => {
      console.log(data);
    });
  }

  quitarAcces(contact) {
    this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
      disableClose: false
    });

    this.confirmDialogRef.componentInstance.confirmMessage = '¿Está seguro que desea quitarle el acceso?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.invService.quitarAcceso(contact).subscribe(res => {
          if (res.success === false) {
            swal.fire('Aún no está asociado')
          }
          else if (res.success) {
            swal.fire('Acceso deshabilitado')
          }
        });
      }
      this.confirmDialogRef = null;
    });

  }

  devolverAcces(contact) {
    this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
      disableClose: false
    });

    this.confirmDialogRef.componentInstance.confirmMessage = '¿Está seguro que desea devolverle el acceso?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.invService.devolverAcceso(contact).subscribe(res => {
          if (res.success === false) {
            swal.fire('Aún no está asociado')
          }
          else if (res.success) {
            swal.fire('Acceso habilitado')
          }
        });
      }
      this.confirmDialogRef = null;
    });


  }

  desvincular(contact) {
    this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
      disableClose: false
    });

    this.confirmDialogRef.componentInstance.confirmMessage = '¿Está seguro que desea desvincularlo?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.invService.deleteRelacion(contact).subscribe(data => {
          console.log(data);
        });
        this.invService.deleteAcces(contact).subscribe(data => {
          console.log(data);
        });
        swal.fire('Desvinculado con éxito')
      }
      this.confirmDialogRef = null;
    });
  }

  /*statusAcces(contact): any {
    this.invService.getStatusAcceso(contact).subscribe(res => {
      if (res.success) {
        return true
      } else {
        return false
      }
    });
  }*/

  createContactForm(): FormGroup {
    console.log("New Form");

    return this._formBuilder.group({
      id: [this.contact.id],
      nombre: [this.contact.nombre],
      correo: [this.contact.correo],
      telefono: [this.contact.telefono],
      password: [this.contact.password],
      direccion: [this.contact.direccion]
    });
  }
}
