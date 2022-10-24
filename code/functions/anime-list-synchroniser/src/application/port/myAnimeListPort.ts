import {AnimeWatching} from "../../domain/animeWatching";

export interface MyAnimeListPort {
    getAnimeList(): Promise<AnimeWatching[]>
}