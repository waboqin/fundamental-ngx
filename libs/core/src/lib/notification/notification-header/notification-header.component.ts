import { Component, EventEmitter, HostBinding, Input, OnInit, Optional, Output, ViewEncapsulation } from '@angular/core';
import { NotificationRef } from '../notification-utils/notification-ref';

@Component({
    selector: 'fd-notification-header',
    templateUrl: './notification-header.component.html',
    styleUrls: ['./notification-header.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NotificationHeaderComponent {
    /** @hidden */
    @HostBinding('class.fd-notification__header')
    fdNotificationHeaderClass: boolean = true;

    /** later */
    @Input()
    showIndicator: boolean = true;

    /** later */
    @Input()
    type: string;

    @Input()
    closeButton: boolean;

    @Output()
    readonly closeButtonClick: EventEmitter<void> = new EventEmitter<void>();

    public closeButtonClicked(): void {
        this.closeButtonClick.emit();
    }
}
