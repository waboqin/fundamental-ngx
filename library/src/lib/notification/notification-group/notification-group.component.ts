import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

let notificationGroupUniqueId: number = 0;

@Component({
    selector: 'fd-notification-group',
    templateUrl: './notification-group.component.html',
    styleUrls: ['./notification-group.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NotificationGroupComponent {
    /** @hidden */
    @HostBinding('class.fd-notification--group')
    fdNotificationGroupClass: boolean = true;

    /** @hidden
     * !important
     */
    readonly notificationGroupUniqueId: string = 'fd-notification-group' + notificationGroupUniqueId++;
}
