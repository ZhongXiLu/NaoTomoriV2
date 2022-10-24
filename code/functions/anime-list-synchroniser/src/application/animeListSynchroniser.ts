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
        const animeToBeAdded = animeListFromMal.filter(anime => !this.animeListContainsAnime(animeListFromStore, anime));

        if (animeToBeRemoved.length != 0) {
            console.log("Removing anime: ", animeToBeRemoved);
            await this.animeStorePort.removeAnime(animeToBeRemoved);
        }
        if (animeToBeAdded.length != 0) {
            console.log("Adding anime: ", animeToBeAdded);
            await this.animeStorePort.addNewAnime(animeToBeAdded);
        }
    }

    private animeListContainsAnime(animeList: AnimeWatching[], anime: AnimeWatching) {
        return animeList.filter(a => a.title === anime.title).length > 0;
    }
}