import {NotificationPort} from "../application/port/notificationPort";
import {AnimeEpisode} from "../domain/animeEpisode";

export class NotificationStub implements NotificationPort {
    private notifications: AnimeEpisode[] = [];

    getNotifications() {
        return this.notifications;
    }

    async sendNotifications(animeEpisodes: AnimeEpisode[]): Promise<void> {
        this.notifications.push(...animeEpisodes);
    }
}