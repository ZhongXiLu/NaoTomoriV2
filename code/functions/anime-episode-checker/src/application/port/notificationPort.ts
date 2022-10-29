import {AnimeEpisode} from "../../domain/animeEpisode";

export interface NotificationPort {
    sendNotifications(animeEpisodes: AnimeEpisode[]): Promise<void>;
}