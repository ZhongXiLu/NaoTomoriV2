export interface AnimeStorePort {
    getAnimeList(): string[];

    addNewAnime(anime: string[]): void;

    removeAnime(anime: string[]): void;
}