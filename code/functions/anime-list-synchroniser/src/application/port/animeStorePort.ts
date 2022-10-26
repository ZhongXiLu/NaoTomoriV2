import {AnimeWatching} from "../../domain/animeWatching";

export interface AnimeStorePort {
    getAnimeList(): Promise<AnimeWatching[]>;

    putAnime(anime: AnimeWatching[]): Promise<void>;

    removeAnime(anime: AnimeWatching[]): Promise<void>;
}