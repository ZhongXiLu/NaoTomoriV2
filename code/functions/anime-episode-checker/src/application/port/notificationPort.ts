import {AnimeNotification} from "../../domain/animeNotification";

export interface NotificationPort {
    sendNotification(notification: AnimeNotification): void;
}