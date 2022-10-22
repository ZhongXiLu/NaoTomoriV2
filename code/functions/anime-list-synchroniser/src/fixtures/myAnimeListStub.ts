import {MyAnimeListPort} from "../application/port/myAnimeListPort";

export class MyAnimeListStub implements MyAnimeListPort {
    private _animeList: string[] = [];

    addAnime(anime: string[]) {
        anime.forEach(a => this._animeList.push(a));
    }

    getAnimeList(): string[] {
        return this._animeList;
    }
}