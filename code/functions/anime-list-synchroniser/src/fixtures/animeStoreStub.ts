import {AnimeStorePort} from "../application/port/animeStorePort";

export class AnimeStoreStub implements AnimeStorePort {
    private _animeList: string[] = [];

    getAnime(): string[] {
        return this._animeList;
    }

    async getAnimeList():Promise<string[]> {
        return this._animeList;
    }

    async addNewAnime(anime: string[]): Promise<void> {
        anime.forEach(a => this._animeList.push(a));
    }

    async removeAnime(anime: string[]): Promise<void> {
        anime.forEach(a => this._animeList.splice(this._animeList.indexOf(a), 1));
    }
}