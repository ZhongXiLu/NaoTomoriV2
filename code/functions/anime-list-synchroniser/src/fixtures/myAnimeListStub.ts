import {MyAnimeListPort} from "../application/port/myAnimeListPort";

export class MyAnimeListStub implements MyAnimeListPort {
    private _animeList: string[] = [];

    addAnime(anime: string[]) {
        anime.forEach(a => this._animeList.push(a));
    }

    async getAnimeList(): Promise<string[]> {
        return this._animeList;
    }
}