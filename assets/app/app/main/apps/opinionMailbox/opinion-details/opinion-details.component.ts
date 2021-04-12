import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '../../../../../@fuse/animations';

import { Opinion } from '../../../../models/opinion.model';
import { OpinionService } from '../../../../services/opinion-analizer.service';

@Component({
    selector     : 'opinion-details',
    templateUrl  : './opinion-details.component.html',
    styleUrls    : ['./opinion-details.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class OpinionDetailsComponent implements OnInit, OnDestroy
{
    opinion: Opinion;
    labels: any[];
    showDetails: boolean;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {OpinionService} _opinionService
     */
    constructor(
        private _opinionService: OpinionService
    )
    {
        // Set the defaults
        this.showDetails = false;

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
        // Subscribe to update the current opinion
        this._opinionService.onCurrentOpinionChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(currentOpinion => {
                this.opinion = currentOpinion;
            });

        // Subscribe to update on label change
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
     * Toggle star
     *
     * @param event
     */
    toggleStar(event): void
    {
        event.stopPropagation();

        this.opinion.toggleStar();

        this._opinionService.updateOpinion(this.opinion);
    }

    /**
     * Toggle important
     *
     * @param event
     */
    toggleImportant(event): void
    {
        event.stopPropagation();

        this.opinion.toggleImportant();

        this._opinionService.updateOpinion(this.opinion);
    }
}
