import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '../../../../../@fuse/animations';

import {Opinion} from '../../../../models/opinion.model';
import {OpinionService} from '../../../../services/opinion.service';

@Component({
    selector     : 'mailbox-list',
    templateUrl  : './mailbox-list.componenet.html',
    styleUrls    : ['./mailbox-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class MailboxListComponent implements OnInit, OnDestroy
{
    opinions: Opinion[];
    currentOpinion: Opinion;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ActivatedRoute} _activatedRoute
     * @param {OpinionService} _OpinionService
     * @param {Location} _location
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _opinionService: OpinionService,
        private _location: Location
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
        // Subscribe to update mails on changes
        this._opinionService.onMailsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(mails => {
                this.opinions = opinions;
            });

        // Subscribe to update current mail on changes
        this._opinionService.onCurrentMailChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(currentMail => {
                if ( !currentMail )
                {
                    // Set the current mail id to null to deselect the current mail
                    this.currentOpinion = null;

                    // Handle the location changes
                    const labelHandle  = this._activatedRoute.snapshot.params.labelHandle,
                          filterHandle = this._activatedRoute.snapshot.params.filterHandle,
                          folderHandle = this._activatedRoute.snapshot.params.folderHandle;

                    if ( labelHandle )
                    {
                        this._location.go('apps/mail/label/' + labelHandle);
                    }
                    else if ( filterHandle )
                    {
                        this._location.go('apps/mail/filter/' + filterHandle);
                    }
                    else
                    {
                        this._location.go('apps/mail/' + folderHandle);
                    }
                }
                else
                {
                    this.currentOpinion = currentMail;
                }
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
     * Read mail
     *
     * @param opinionId
     */
    readOpinion(opinionId): void
    {
        const labelHandle  = this._activatedRoute.snapshot.params.labelHandle,
              filterHandle = this._activatedRoute.snapshot.params.filterHandle,
              folderHandle = this._activatedRoute.snapshot.params.folderHandle;

        if ( labelHandle )
        {
            this._location.go('apps/mail/label/' + labelHandle + '/' + opinionId);
        }
        else if ( filterHandle )
        {
            this._location.go('apps/mail/filter/' + filterHandle + '/' + opinionId);
        }
        else
        {
            this._location.go('apps/mail/' + folderHandle + '/' + opinionId);
        }

        // Set current mail
        this._opinionServicee.setCurrentMail(opinionId);
    }
}
