import {MyAnimeListPort} from "./port/myAnimeListPort";
import {AnimeStorePort} from "./port/animeStorePort";

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

        const animeToBeRemoved = animeListFromStore.filter(anime => !animeListFromMal.includes(anime));
        const animeToBeAdded = animeListFromMal.filter(anime => !animeListFromStore.includes(anime));

        if (animeToBeRemoved.length != 0) {
            console.log("Removing anime: ", animeToBeRemoved);
        }
        if (animeToBeAdded.length != 0) {
            console.log("Adding anime: ", animeToBeAdded);
        }

        await Promise.all([
            this.animeStorePort.removeAnime(animeToBeRemoved),
            this.animeStorePort.addNewAnime(animeToBeAdded)
        ]);
    }
}