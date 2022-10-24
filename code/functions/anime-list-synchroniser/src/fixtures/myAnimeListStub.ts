import {MyAnimeListPort} from "../application/port/myAnimeListPort";
import {AnimeWatching} from "../domain/animeWatching";

export class MyAnimeListStub implements MyAnimeListPort {
    private _animeList: AnimeWatching[] = [];

    addAnime(anime: AnimeWatching[]) {
        anime.forEach(a => this._animeList.push(a));
    }

    async getAnimeList(): Promise<AnimeWatching[]> {
        return this._animeList;
    }
}