import {MyAnimeListPort} from "./port/myAnimeListPort";
import {AnimeStorePort} from "./port/animeStorePort";

export class AnimeListSynchroniser {
    private _myAnimeListPort: MyAnimeListPort;
    private _animeStorePort: AnimeStorePort;

    constructor(myAnimeListPort: MyAnimeListPort, animeStorePort: AnimeStorePort) {
        this._myAnimeListPort = myAnimeListPort;
        this._animeStorePort = animeStorePort;
    }

    async sync() {
        const animeListFromMal = await this._myAnimeListPort.getAnimeList();
        const animeListFromStore = this._animeStorePort.getAnimeList();

        const animeToBeRemoved = animeListFromStore.filter(anime => !animeListFromMal.includes(anime))
        this._animeStorePort.removeAnime(animeToBeRemoved);

        const animeToBeAdded = animeListFromMal.filter(anime => !animeListFromStore.includes(anime))
        this._animeStorePort.addNewAnime(animeToBeAdded);
    }
}