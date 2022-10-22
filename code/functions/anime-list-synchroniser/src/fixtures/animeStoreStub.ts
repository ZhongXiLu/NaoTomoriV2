import {AnimeStorePort} from "../application/port/animeStorePort";

export class AnimeStoreStub implements AnimeStorePort {
    private _animeList: string[] = [];

    getAnime(): string[] {
        return this._animeList;
    }

    addNewAnime(anime: string[]): void {
        anime.forEach(a => this._animeList.push(a));
    }

    getAnimeList(): string[] {
        return this._animeList;
    }

    removeAnime(anime: string[]): void {
        anime.forEach(a => this._animeList.splice(this._animeList.indexOf(a), 1));
    }
}