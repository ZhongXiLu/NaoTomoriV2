import {AnimeStorePort} from "../application/port/animeStorePort";
import {AnimeWatching} from "../domain/animeWatching";

export class AnimeStoreStub implements AnimeStorePort {
    private animeList: Map<string, AnimeWatching> = new Map<string, AnimeWatching>();

    async getAnimeList(): Promise<AnimeWatching[]> {
        return Array.from(this.animeList.values());
    }

    async putAnime(anime: AnimeWatching[]): Promise<void> {
        anime.forEach(a => this.animeList.set(a.title, a));
    }

    async removeAnime(anime: AnimeWatching[]): Promise<void> {
        anime.forEach(a => this.animeList.delete(a.title));
    }
}