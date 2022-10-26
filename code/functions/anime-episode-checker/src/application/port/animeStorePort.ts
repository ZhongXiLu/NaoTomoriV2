import {AnimeWatching} from "../../domain/animeWatching";

export interface AnimeStorePort {
    getAnimeWatchingList(): AnimeWatching[];
}