import {MyAnimeListPort} from "../../../application/port/myAnimeListPort";
import {MalAcount} from "node-myanimelist/typings/methods/malApi";

class MyAnimeListAdapter implements MyAnimeListPort {
    private account: MalAcount;

    constructor(account: MalAcount) {
        this.account = account;
    }

    async getAnimeList(): Promise<string[]> {
        const animeList = await this.account.user.animelist("@me", null, null, {
            status: "watching",
            limit: 1000
        }).call();

        return animeList.data.map(anime => anime.node.title);
    }
}