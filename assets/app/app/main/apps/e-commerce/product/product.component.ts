import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '../../../../../@fuse/animations';
import { FuseUtils } from '../../../../../@fuse/utils';
import { Product } from '../../../../../app/main/apps/e-commerce/product/product.model';
import { EcommerceProductService } from '../../../../../app/main/apps/e-commerce/product/product.service';
import { UserInv } from '../../../../models/userInv.model';
import { Router } from '@angular/router';
import { UserInvService } from '../../../../services/user-inv.service';
import swal from "sweetalert2";

@Component({
    selector: 'e-commerce-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class EcommerceProductComponent implements OnInit, OnDestroy {
    product: Product;
    pageType: string;
    invUserForm: FormGroup;
    //alertShow: String = ''
    // Private
    private _unsubscribeAll: Subject<any>;


    /**
     * Constructor
     *
     */
    constructor(
        private invService: UserInvService,
        private _formBuilder: FormBuilder,
        private router: Router
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.invUserForm = this._formBuilder.group({
            nombre: ['', Validators.required],
            correo: ['', [Validators.required, Validators.email]],
            telefono: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(8)]],
            direccion: ['', Validators.required],
        });
        // Subscribe to update product on changes

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    onSave() {
        const data = this.invUserForm.getRawValue();
        console.log(data);
        swal.fire('Invitado registrado')
        this.invService.addInvUser(data).subscribe(dataINv => {
        })

    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create product form
     *
     * @returns {FormGroup}
     */

}
