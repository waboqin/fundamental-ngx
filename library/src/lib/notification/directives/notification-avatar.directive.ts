import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[fdNotificationAvatar], [fd-notification__avatar]'
})
export class NotificationAvatarDirective {
    /** @hidden */
    @HostBinding('class.fd-notification__avatar')
    fdNotificationAvatarClass: boolean = true;
}
