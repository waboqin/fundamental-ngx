import { ComponentRef, Injectable, TemplateRef, Type } from '@angular/core';
import { NotificationComponent } from '../notification/notification.component';
import { NotificationContainer } from '../notification-utils/notification-container';
import { NotificationConfig } from '../notification-utils/notification-config';
import { NotificationRef } from '../notification-utils/notification-ref';
import { DynamicComponentService } from '../../utils/dynamic-component/dynamic-component.service';
import { NotificationGroupComponent } from '../notification-group/notification-group.component';
import { NotificationDefault } from '../notification-utils/notification-default';

@Injectable()
export class NotificationService {

    private notifications: {
        notificationComponent: ComponentRef<NotificationComponent>,
        notificationGroup?: ComponentRef<NotificationGroupComponent>
    }[] = [];
    private containerRef: ComponentRef<NotificationContainer>;


    constructor(
        private dynamicComponentService: DynamicComponentService
    ) {}

    /**
     * Opens an alert component with a content of type TemplateRef, Component Type or Configuration Object
     * @param content Content of the alert component.
     * @param notificationConfig Configuration of the notification component.
     * @param notificationGroup Configuration of the notification component.
     */
    public open(
        content: TemplateRef<any> | Type<any> | NotificationDefault,
        notificationConfig: NotificationConfig = new NotificationConfig(),
        notificationGroup?: ComponentRef<NotificationGroupComponent>
    ): NotificationRef {

        const notificationService: NotificationRef = new NotificationRef();
        notificationConfig = Object.assign(new NotificationConfig(), notificationConfig);
        notificationService.data = notificationConfig.data;
        if (notificationService.data) {
            notificationService.data.type = notificationConfig.type;
        }

        if (!this.containerRef) {
            this.containerRef = this.dynamicComponentService.createDynamicComponent(content, NotificationContainer, notificationConfig);
        }

        notificationConfig.container = this.containerRef.location.nativeElement;
        let notificationComponentRef: ComponentRef<NotificationComponent>;
        if (notificationGroup) {
            notificationConfig.container = notificationGroup.location.nativeElement;
            notificationComponentRef = this.dynamicComponentService.createDynamicComponent<NotificationComponent>(content, NotificationComponent, notificationConfig, [notificationService]);

            this.notifications.push({
                notificationComponent: notificationComponentRef,
                notificationGroup: notificationGroup
            });
        } else {
            notificationComponentRef = this.dynamicComponentService.createDynamicComponent<NotificationComponent>(content, NotificationComponent, notificationConfig, [notificationService]);
            this.notifications.push({
                notificationComponent: notificationComponentRef,
            });
        }

        const defaultBehaviourOnClose = () => {
            this.destroyNotificationComponent(notificationComponentRef);
            refSub.unsubscribe();
            refGroupSub.unsubscribe();
        };

        const defaultBehaviourOnGroupClose = () => {
            this.destroyWholeGroup(notificationComponentRef);
            refGroupSub.unsubscribe();
            refSub.unsubscribe();
        };

        const refSub = notificationService.afterClosed
            .subscribe(defaultBehaviourOnClose, defaultBehaviourOnClose)
        ;

        const refGroupSub = notificationService.afterClosedGroup
            .subscribe(defaultBehaviourOnGroupClose, defaultBehaviourOnGroupClose)
        ;

        return notificationService;
    }

    public createNotificationGroup (
        content: TemplateRef<any> | Type<any>,
        notificationConfig: NotificationConfig = new NotificationConfig(),
    ): ComponentRef<NotificationGroupComponent> {

        notificationConfig = Object.assign(new NotificationConfig(), notificationConfig);
        if (!this.containerRef) {
            this.containerRef = this.dynamicComponentService.createDynamicComponent(content, NotificationContainer, notificationConfig);
        }

        notificationConfig.container = this.containerRef.location.nativeElement;
        return this.dynamicComponentService.createDynamicComponent
            <NotificationGroupComponent>(content, NotificationGroupComponent, notificationConfig)
        ;
    }

    private destroyWholeGroup(notification: ComponentRef<NotificationComponent>): void {
        const arrayRef = this.notifications.find(item => item.notificationComponent === notification);

        if (arrayRef.notificationGroup) {
            const arrayToDelete = this.notifications.filter(_notification => _notification.notificationGroup === arrayRef.notificationGroup);
            arrayToDelete.forEach(_notification => this.destroyNotificationComponent(_notification.notificationComponent));
        }
    }

    private destroyNotificationComponent(notification: ComponentRef<NotificationComponent>): void {

        const arrayRef = this.notifications.find(item => item.notificationComponent === notification);
        const indexOf = this.notifications.indexOf(arrayRef);

        const amountOfComponentsWithThisGroup = this.notifications.filter(item =>
            item.notificationGroup && item.notificationGroup === arrayRef.notificationGroup
        );
        if (amountOfComponentsWithThisGroup.length === 1) {
            this.dynamicComponentService.destroyComponent(arrayRef.notificationGroup);
        }
        this.dynamicComponentService.destroyComponent(arrayRef.notificationComponent);

        this.notifications[indexOf] = null;
        this.notifications = this.notifications.filter(item => item !== null && item !== undefined);

    }
}
