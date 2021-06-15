import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FuseTranslationLoaderService } from '../../../../../../@fuse/services/translation-loader.service';
import { locale as english } from '../../../../../../app/main/apps/opinionMailbox/i18n/en';
//import { locale as turkish } from '../../../../../../app/main/apps/opinionMailbox/i18n/tr';
import { locale as spanish } from '../../../../../../app/main/apps/opinionMailbox/i18n/es';
@Component({
    selector     : 'opinion-compose',
    templateUrl  : './compose.component.html',
    styleUrls    : ['./compose.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class OpinionComposeDialogComponent
{
    showExtraToFields: boolean;
    composeForm: FormGroup;

    /**
     * Constructor
     *
     * @param {MatDialogRef<OpinionComposeDialogComponent>} matDialogRef
     * @param _data
     */
    constructor(
        public matDialogRef: MatDialogRef<OpinionComposeDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService
    )
    {
        // Set the defaults
        this.composeForm = this.createComposeForm();
        this.showExtraToFields = false;

        //load translations
        this._fuseTranslationLoaderService.loadTranslations(english,spanish);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create compose form
     *
     * @returns {FormGroup}
     */
    createComposeForm(): FormGroup
    {
        return new FormGroup({
            from   : new FormControl({
                value   : 'johndoe@creapond.com',
                disabled: true
            }),
            to     : new FormControl(''),
            cc     : new FormControl(''),
            bcc    : new FormControl(''),
            subject: new FormControl(''),
            message: new FormControl('')
        });
    }

    /**
     * Toggle extra to fields
     */
    toggleExtraToFields(): void
    {
        this.showExtraToFields = !this.showExtraToFields;
    }
}