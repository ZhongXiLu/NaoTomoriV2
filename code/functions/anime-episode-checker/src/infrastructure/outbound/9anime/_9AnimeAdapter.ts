import {AnimeEpisode} from "../../../domain/animeEpisode";
import {AnimeSitePort} from "../../../application/port/animeSitePort";
import fetch from "isomorphic-unfetch";
import parse from "node-html-parser";

class _9AnimeAdapter implements AnimeSitePort {
    private readonly _9animeUrl: string;

    constructor(_9animeUrl: string) {
        this._9animeUrl = _9animeUrl;
    }

    async getLatestAnimeEpisodes(): Promise<AnimeEpisode[]> {
        const response = await fetch(this._9animeUrl);

        if (!response.ok) {
            console.error(`Failed fetching from 9Anime: ${JSON.stringify(response)}`)
            return Promise.reject("Failed fetching from 9Anime");
        }

        const data = await response.json();
        const html = parse(data.result);
        const anime = html.querySelectorAll(".item");
        const animeEpisodes = anime.map(a => {
            const linkElement = a.querySelector("a.name")!;
            const title = linkElement.innerHTML;
            const link = linkElement.getAttribute("href");
            const episodeNr = Number(a.querySelector("span.ep-status.sub span")!.innerHTML);
            const image = a.querySelector(".poster")!.getAttribute("src");

            return {
                title: title,
                nr: episodeNr,
                link: link,
                image: image
            } as AnimeEpisode;
        });

        return animeEpisodes;
    }
}