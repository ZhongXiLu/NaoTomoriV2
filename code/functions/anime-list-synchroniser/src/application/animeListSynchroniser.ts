import {MyAnimeListPort} from "./port/myAnimeListPort";
import {AnimeStorePort} from "./port/animeStorePort";
import {AnimeWatching} from "../domain/animeWatching";

export class AnimeListSynchroniser {
    private myAnimeListPort: MyAnimeListPort;
    private animeStorePort: AnimeStorePort;

    constructor(myAnimeListPort: MyAnimeListPort, animeStorePort: AnimeStorePort) {
        this.myAnimeListPort = myAnimeListPort;
        this.animeStorePort = animeStorePort;
    }

    async sync() {
        const [animeListFromMal, animeListFromStore] = await Promise.all([
            this.myAnimeListPort.getAnimeList(),
            this.animeStorePort.getAnimeList()
        ]);

        const animeToBeRemoved = animeListFromStore.filter(anime => !this.animeListContainsAnime(animeListFromMal, anime));
        const animeToBePut = animeListFromMal.filter(anime =>
            !this.animeListContainsAnime(animeListFromStore, anime) || this.animeListContainsAnimeButEpisodeCountDiffers(animeListFromStore, anime)
        );

        if (animeToBeRemoved.length != 0) {
            console.log("Removing anime: ", animeToBeRemoved);
            await this.animeStorePort.removeAnime(animeToBeRemoved);
        }
        if (animeToBePut.length != 0) {
            console.log("Putting anime: ", animeToBePut);
            await this.animeStorePort.putAnime(animeToBePut);
        }
    }

    private animeListContainsAnime(animeList: AnimeWatching[], anime: AnimeWatching) {
        return animeList.filter(a => a.title === anime.title).length > 0;
    }

    private animeListContainsAnimeButEpisodeCountDiffers(animeList: AnimeWatching[], anime: AnimeWatching) {
        return animeList.filter(a => a.title === anime.title && a.episode != anime.episode).length > 0;
    }
}