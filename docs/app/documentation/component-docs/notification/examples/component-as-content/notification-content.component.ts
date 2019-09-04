import { Component } from '@angular/core';
import { NotificationRef } from '../../../../../../../library/src/lib/notification/notification-utils/notification-ref';

@Component({
    selector: 'fd-notification-content',
    template: `
        <fd-notification-header (closeButtonClick)="notificationRef.dismiss('Close Icon Click')" [type]="notificationRef.data.type">
            <h3 fd-notification-title>{{notificationRef.data.title}}</h3>
        </fd-notification-header>
        <fd-notification-body>
            <div fd-notification-content>
                <div fd-notification__avatar>
                    <span fd-identifier [size]="'s'" [circle]="true" aria-label="John Doe">JD</span>
                </div>
                <div fd-notification-text>
                    <div fd-notification-description>
                        {{notificationRef.data.description}}
                    </div>
                    <div fd-notification-metadata>
                        {{notificationRef.data.metadata}}
                    </div>
                </div>
            </div>
            <fd-notification-footer>
                <button class="fd-button--light">                        
                    {{notificationRef.data.moreInfo}}
                </button>
                <div fd-notification-actions>
                    <button class="fd-button--positive" (click)="notificationRef.close('Approve Button Click')">
                        {{notificationRef.data.approve}}
                    </button>
                    <button class="fd-button--negative" (click)="notificationRef.dismiss('Cancel Button Click')">
                        {{notificationRef.data.cancel}}
                    </button>
                </div>
            </fd-notification-footer>
        </fd-notification-body>
    `
})
export class NotificationContentComponent {
    constructor(
        public notificationRef: NotificationRef
    ) {
    }
}
