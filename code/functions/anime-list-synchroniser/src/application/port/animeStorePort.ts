export interface AnimeStorePort {
    getAnimeList(): Promise<string[]>;

    addNewAnime(anime: string[]): Promise<void>;

    removeAnime(anime: string[]): Promise<void>;
}