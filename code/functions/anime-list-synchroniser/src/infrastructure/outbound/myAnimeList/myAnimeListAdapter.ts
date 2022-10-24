import {MyAnimeListPort} from "../../../application/port/myAnimeListPort";
import {MalAcount} from "node-myanimelist/typings/methods/malApi";
import {AnimeWatching} from "../../../domain/animeWatching";

export class MyAnimeListAdapter implements MyAnimeListPort {
    private readonly accountPromise: Promise<MalAcount>;

    constructor(accountPromise: Promise<MalAcount>) {
        this.accountPromise = accountPromise;
    }

    async getAnimeList(): Promise<AnimeWatching[]> {
        const account = await this.accountPromise;
        const animeList = await account.user.animelist("@me", null, null, {
            status: "watching",
            limit: 1000
        }).call();

        return animeList.data.map(anime => ({
            title: anime.node.title,
            episode: anime.list_status.num_episodes_watched
        }));
    }
}