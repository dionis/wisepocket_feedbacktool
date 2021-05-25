import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '../../../../../@fuse/animations';
import { FuseConfirmDialogComponent } from '../../../../../@fuse/components/confirm-dialog/confirm-dialog.component';

import { OpinionService } from '../../../../services/opinion-analizer.service';
import { OpinionAnalyticsFormDialogComponent } from '../opinionAnalytics-form/opinionAnalytics-form.component'


@Component({
    selector     : 'opinionsAnalytics-list',
    templateUrl  : './opinionAnalytics-list.component.html',
    styleUrls    : ['./opinionAnalytics-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class OpinionAnalyticsListComponent implements OnInit, OnDestroy
{
    @ViewChild('dialogContent')
    dialogContent: TemplateRef<any>;

    opinions: any;
    //user: any;
    dataSource: FilesDataSource | null;
    displayedColumns = ['user', 'email', 'buttons'];
    selectedOpinions: any[];
    checkboxes: {};
    dialogRef: any;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {OpinionsService} _opinionService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _opinionService: OpinionService,
        public _matDialog: MatDialog,
      //  public campaingService: CampaingService,
       // public campaingModel: CampaingModel
    )
    {
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
        this.dataSource = new FilesDataSource(this._opinionService);

        this._opinionService.onOpinionsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(opinions => {
                this.opinions = opinions;

                this.checkboxes = {};
                opinions.map(opinion => {
                    this.checkboxes[opinion.id] = false;
                });
            });

        this._opinionService.onSelectedOpinionsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedOpinions => {
                for ( const id in this.checkboxes )
                {
                    if ( !this.checkboxes.hasOwnProperty(id) )
                    {
                        continue;
                    }

                    this.checkboxes[id] = selectedOpinions.includes(id);
                }
                this.selectedOpinions = selectedOpinions;
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
    };

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    
    /**
     * Delete All Opinion
     
    deleteAllOpinionContact(): void;*/
    
}

export class FilesDataSource extends DataSource<any>
{
    /**
     * Constructor
     *
     * @param {OpinionService} _opinionService
     */
    constructor(
        private _opinionService: OpinionService
    )
    {
        super();
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]>
    {
        return this._opinionService.onOpinionsChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void
    {
    }
}
