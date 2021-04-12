import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '../../../../@fuse/animations';
import { FuseSidebarService } from '../../../../@fuse/components/sidebar/sidebar.service';

import { OpinionService } from '../../../services/opinion-analizer.service'
import { OpinionAnalyticsFormDialogComponent } from '../opinionAnalytics/opinionAnalytics-form/opinionAnalytics-form.component'

@Component({
    selector     : 'contacts',
    templateUrl  : './opinionAnalytics.component.html',
    styleUrls    : ['./opinionAnalytics.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class OpinionAnalyticsComponent implements OnInit, OnDestroy
{
    dialogRef: any;
    hasSelectedOpinions: boolean;
    searchInput: FormControl;
    ListaCampanaService: any;


    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {OpinionService} _opinionService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _opinionService: OpinionService,
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog,
        //public campaingService: CampaingService
    )
    {


        // Set the defaults
        this.searchInput = new FormControl('');

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }
   /* constructor(){

    }*/

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this._opinionService.onSelectedOpinionsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedContacts => {
                this.hasSelectedOpinions = selectedContacts.length > 0;
            });

        this.searchInput.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                distinctUntilChanged()
            )
            .subscribe(searchText => {
                this._opinionService.onSearchTextChanged.next(searchText);
            });

        /*this.campaingService.getCampaignbyUser().then(res=>{
            this.ListaCampanaService=res;
              console.log(res)
            })
            .catch(err=>{
                console.log("Error", Error);
<<<<<<< HEAD
            }); */

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
     * New contact
     */
    newContact(): void
    {
        this.dialogRef = this._matDialog.open(OpinionAnalyticsFormDialogComponent, {
            panelClass: 'contact-form-dialog',
            data      : {
                action: 'new'
            }
        });

        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if ( !response )
                {
                    return;
                }

                this._opinionService.updateOpinion(response.getRawValue());
            });
    }

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void
    {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
}