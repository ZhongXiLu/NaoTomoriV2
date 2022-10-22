export interface MyAnimeListPort {
    getAnimeList(): Promise<string[]>
}