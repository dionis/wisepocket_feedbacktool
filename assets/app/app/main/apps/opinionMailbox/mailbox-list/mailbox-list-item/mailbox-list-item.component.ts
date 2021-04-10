import { Opinion } from '../../../../../../../../.tmp/public/app/app/models/opinion.model';
import { Component, HostBinding, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { OpinionService } from '../../../../../services/opinion-analizer.service';

@Component({
    selector     : 'mailbox-list-item',
    templateUrl  : './mailbox-list-item.component.html',
    styleUrls    : ['./mailbox-list-item.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MailboxListItemComponent implements OnInit, OnDestroy
{
    @Input() opinion: Opinion;
    labels: any[];

    @HostBinding('class.selected')
    selected: boolean;

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
        // Set the initial values
        this.opinion = new Opinion(this.opinion);

        // Subscribe to update on selected opinion change
        this._opinionService.onSelectedOpinionsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedOpinions => {
                this.selected = false;

                if ( selectedOpinions.length > 0 )
                {
                    for ( const opinion of selectedOpinions )
                    {
                        if ( opinion.id === this.opinion.id )
                        {
                            this.selected = true;
                            break;
                        }
                    }
                }
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
     * On selected change
     */
    onSelectedChange(): void
    {
        this._opinionService.toggleSelectedOpinion(this.opinion.id);
    }

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
     * Toggle Important
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