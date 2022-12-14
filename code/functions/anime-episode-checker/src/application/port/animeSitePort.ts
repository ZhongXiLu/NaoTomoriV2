import {AnimeEpisode} from "../../domain/animeEpisode";

export interface AnimeSitePort {
    getLatestAnimeEpisodes(): Promise<AnimeEpisode[]>;
}