import {NotificationPort} from "../application/port/notificationPort";
import {AnimeNotification} from "../domain/animeNotification";

export class NotificationStub implements NotificationPort {
    private notifications: AnimeNotification[] = [];

    getNotifications() {
        return this.notifications;
    }

    sendNotification(notification: AnimeNotification): void {
        this.notifications.push(notification);
    }
}