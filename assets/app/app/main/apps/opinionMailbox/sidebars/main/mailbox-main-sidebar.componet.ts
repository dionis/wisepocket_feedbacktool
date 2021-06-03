import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseTranslationLoaderService } from '../../../../../../@fuse/services/translation-loader.service';

import { fuseAnimations } from '../../../../../../@fuse/animations';

import { OpinionService } from '../../../../../services/opinion-analizer.service';
import { OpinionComposeDialogComponent } from '../../../../../../app/main/apps/opinionMailbox/dialogs/compose/compose.component';
import { AdvancedSearchComponent } from '../../../../../../app/main/apps/opinionMailbox/advanced-search/advanced-search.component';



import { locale as english } from '../../../../../../app/main/apps/opinionMailbox/i18n/en';
import { locale as turkish } from '../../../../../../app/main/apps/opinionMailbox/i18n/tr';
import { locale as spanish } from '../../../../../../app/main/apps/opinionMailbox/i18n/es';

@Component({
    selector     : 'mailbox-main-sidebar',
    templateUrl  : './mailbox-main-sidebar.component.html',
    styleUrls    : ['./mailbox-main-sidebar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class MailboxMainSidebarComponent implements OnInit, OnDestroy
{
    folders: any[];
    filters: any[];
    labels: any[];
    accounts: object;
    selectedAccount: string;
    dialogRef: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {OpinionService} _opinionService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _opinionService: OpinionService,
        public _matDialog: MatDialog,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService

    )
    {

         // Load the translations
         this._fuseTranslationLoaderService.loadTranslations(english, turkish,spanish);


        // Set the defaults
        this.accounts = {
            creapond    : 'johndoe@creapond.com',
            withinpixels: 'johndoe@withinpixels.com'
        };
        this.selectedAccount = 'creapond';

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this._opinionService.onFoldersChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(folders => {

                this.folders = folders;
            });

        this._opinionService.onFiltersChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(filters => {
                console.log(filters)
                this.filters = filters;
            });

        this._opinionService.onLabelsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(labels => {
                this.labels = labels;
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Compose dialog
     */
    composeDialog(): void
    {
      /// ====== OOJJOOO =======
      ///Call de Object AdvancedSearchComponent
        this.dialogRef = this._matDialog.open(OpinionComposeDialogComponent, {
            panelClass: 'mailbox-compose-dialog'
        });
        this.dialogRef.afterClosed()
            .subscribe(response => {
                if ( !response )
                {
                    return;
                }
                const actionType: string = response[0];
                const formData: FormGroup = response[1];
                switch ( actionType )
                {
                    /**
                     * Send
                     */
                    case 'send':
                        console.log('new Opinion', formData.getRawValue());
                        break;
                    /**
                     * Delete
                     */
                    case 'delete':
                        console.log('delete Opinion');
                        break;
                }
            });
    }
}
