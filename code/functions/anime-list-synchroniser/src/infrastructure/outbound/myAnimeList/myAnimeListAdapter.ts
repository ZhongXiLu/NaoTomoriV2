import {MyAnimeListPort} from "../../../application/port/myAnimeListPort";
import {MalAcount} from "node-myanimelist/typings/methods/malApi";

export class MyAnimeListAdapter implements MyAnimeListPort {
    private readonly accountPromise: Promise<MalAcount>;

    constructor(accountPromise: Promise<MalAcount>) {
        this.accountPromise = accountPromise;
    }

    async getAnimeList(): Promise<string[]> {
        const account = await this.accountPromise;
        const animeList = await account.user.animelist("@me", null, null, {
            status: "watching",
            limit: 1000
        }).call();

        return animeList.data.map(anime => anime.node.title);
    }
}