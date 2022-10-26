import {AnimeStorePort} from "../application/port/animeStorePort";
import {AnimeWatching} from "../domain/animeWatching";

export class AnimeStoreStub implements AnimeStorePort {
    private animeList: AnimeWatching[] = [];

    getAnime(): AnimeWatching[] {
        return this.animeList;
    }

    async getAnimeList(): Promise<AnimeWatching[]> {
        return this.animeList;
    }

    async addNewAnime(anime: AnimeWatching[]): Promise<void> {
        anime.forEach(a => this.animeList.push(a));
    }

    async removeAnime(anime: AnimeWatching[]): Promise<void> {
        anime.forEach(a => this.animeList.splice(this.getIndexOf(a), 1));
    }

    private getIndexOf(a: AnimeWatching) {
        for (let i = 0; i < this.animeList.length; i++) {
            if (this.animeList[i].title === a.title) {
                return i;
            }
        }
        return -1;
    }
}