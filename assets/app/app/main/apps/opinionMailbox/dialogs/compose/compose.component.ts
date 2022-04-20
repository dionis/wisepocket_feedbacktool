import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseTranslationLoaderService } from '../../../../../../@fuse/services/translation-loader.service';
import { locale as english } from '../../../../../../app/main/apps/opinionMailbox/i18n/en';
//import { locale as turkish } from '../../../../../../app/main/apps/opinionMailbox/i18n/tr';
import { locale as spanish } from '../../../../../../app/main/apps/opinionMailbox/i18n/es';
import { OpinionService } from '../../../../../services/opinion-analizer.service';
import { OpinionPruebaService } from '../../../../../services/opinion-prueba.service';
import { UserInvService } from '../../../../../services/user-inv.service';
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
    users_end = [];
    polarities = ['positiva','negativa','neutra'];
    langs = ['inglés','español']
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {MatDialogRef<OpinionComposeDialogComponent>} matDialogRef
     * @param _data
     */
    constructor(
        public matDialogRef: MatDialogRef<OpinionComposeDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _opinionService: OpinionService,
        private _userEndService: UserInvService
    )
    {

        this._unsubscribeAll = new Subject();
        // Set the defaults
        this.composeForm = this.createComposeForm();
        this.showExtraToFields = false;

        //load translations
        this._fuseTranslationLoaderService.loadTranslations(english,spanish);
        this._userEndService.getInvitados()
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(result=>{
            this.users_end = result.data;
            console.log(result);
        })
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
                disabled: true
            }),
            users     : new FormControl(this.users_end.length>0?this.users_end[0]:''),
            lang     : new FormControl(this.langs[0]),
            polarity    : new FormControl(this.polarities[0]),
            date_start: new FormControl(''),
            date_end: new FormControl(''),
            text: new FormControl('')
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