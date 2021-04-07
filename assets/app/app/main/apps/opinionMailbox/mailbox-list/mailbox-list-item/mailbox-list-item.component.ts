import { Opinion } from '../../../../../../../../.tmp/public/app/app/models/opinion.model';
import { Component, HostBinding, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { OpinionService } from '../../../../../services/opinion.service';

@Component({
    selector     : 'mail-list-item',
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

        // Subscribe to update on selected mail change
        this._opinionService.onSelectedOpinonsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedOpinons => {
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
        this._opinionService.toggleSelectedMail(this.mail.id);
    }

    /**
     * Toggle star
     *
     * @param event
     */
    toggleStar(event): void
    {
        event.stopPropagation();

        this.mail.toggleStar();

        this._mailService.updateMail(this.mail);
    }

    /**
     * Toggle Important
     *
     * @param event
     */
    toggleImportant(event): void
    {
        event.stopPropagation();

        this.mail.toggleImportant();

        this._mailService.updateMail(this.mail);
    }
}