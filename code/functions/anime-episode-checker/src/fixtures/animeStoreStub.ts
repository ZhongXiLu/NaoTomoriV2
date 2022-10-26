import {AnimeStorePort} from "../application/port/animeStorePort";
import {AnimeWatching} from "../domain/animeWatching";

export class AnimeStoreStub implements AnimeStorePort {
    private animeList: AnimeWatching[] = [];

    getAnimeWatchingList(): AnimeWatching[] {
        return this.animeList;
    }

    addNewAnime(anime: AnimeWatching[]) {
        anime.forEach(a => this.animeList.push(a));
    }
}