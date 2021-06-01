import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '../../../../../@fuse/animations';

import {Opinion} from '../../../../models/opinion.model';
import {OpinionService} from '../../../../services/opinion-analizer.service';
import { OpinionPruebaService } from '../../../../services/opinion-prueba.service';
import { OpinionTest } from '../../../../models/opinionTest.model';

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
    opinionstest: OpinionTest[];
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
        private _opinionServiceTest: OpinionPruebaService,
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
        // Subscribe to update opinions on changes
        this._opinionService.onOpinionsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(opinions => {
                this.opinions = opinions;
            });
        
        this._opinionServiceTest.onOpinionsChanged
        .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(opinions => {
                this.opinionstest = opinions;
        });

        // Subscribe to update current Opinion on changes
        this._opinionService.onCurrentOpinionChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(currentOpinion => {
                if ( !currentOpinion )
                {
                    // Set the current Opinion id to null to deselect the current Opinion
                    this.currentOpinion = null;

                    // Handle the location changes
                    const labelHandle  = this._activatedRoute.snapshot.params.labelHandle,
                          filterHandle = this._activatedRoute.snapshot.params.filterHandle,
                          folderHandle = this._activatedRoute.snapshot.params.folderHandle;

                    if ( labelHandle )
                    {
                        this._location.go('apps/opinionMailbox/label/' + labelHandle);
                    }
                    else if ( filterHandle )
                    {
                        this._location.go('apps/opinionMailbox/filter/' + filterHandle);
                    }
                    else
                    {
                        this._location.go('apps/opinionMailbox/' + folderHandle);
                    }
                }
                else
                {
                    this.currentOpinion = currentOpinion;
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
     * Read Opinion
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
            this._location.go('apps/opinionMailbox/label/' + labelHandle + '/' + opinionId);
        }
        else if ( filterHandle )
        {
            this._location.go('apps/opinionMailbox/filter/' + filterHandle + '/' + opinionId);
        }
        else
        {
            this._location.go('apps/opinionMailbox/' + folderHandle + '/' + opinionId);
        }

        // Set current Opinion
        this._opinionService.setCurrentOpinion(opinionId);
    }
}
