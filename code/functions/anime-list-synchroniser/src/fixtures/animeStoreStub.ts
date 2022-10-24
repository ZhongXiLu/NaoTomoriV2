import {AnimeStorePort} from "../application/port/animeStorePort";
import {AnimeWatching} from "../domain/animeWatching";

export class AnimeStoreStub implements AnimeStorePort {
    private _animeList: AnimeWatching[] = [];

    getAnime(): AnimeWatching[] {
        return this._animeList;
    }

    async getAnimeList(): Promise<AnimeWatching[]> {
        return this._animeList;
    }

    async addNewAnime(anime: AnimeWatching[]): Promise<void> {
        anime.forEach(a => this._animeList.push(a));
    }

    async removeAnime(anime: AnimeWatching[]): Promise<void> {
        anime.forEach(a => this._animeList.splice(this.getIndexOf(a), 1));
    }

    private getIndexOf(a: AnimeWatching) {
        for (let i = 0; i < this._animeList.length; i++) {
            if (this._animeList[i].title === a.title) {
                return i;
            }
        }
        return -1;
    }
}