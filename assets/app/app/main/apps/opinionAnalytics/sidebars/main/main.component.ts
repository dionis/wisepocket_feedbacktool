import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { OpinionService } from '../../../../../services/opinion-analizer.service';
import { Opinion } from '../../../../../models/opinion.model';

@Component({
    selector   : 'opinionAnalytics-main-sidebar',
    templateUrl: './main.component.html',
    styleUrls  : ['./main.component.scss']
})
export class OpinionAnalyticsMainSidebarComponent implements OnInit, OnDestroy
{
    opinion: Opinion;
    filterBy: string;

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
        this.filterBy = this._opinionService.filterBy || 'all';

        this._opinionService.onUserDataChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(opinion => {
                this.opinion = opinion;
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
     * Change the filter
     *
     * @param filter
     */
    changeFilter(filter): void
    {
        this.filterBy = filter;
        this._opinionService.onFiltersChanged.next(this.filterBy);
    }
}