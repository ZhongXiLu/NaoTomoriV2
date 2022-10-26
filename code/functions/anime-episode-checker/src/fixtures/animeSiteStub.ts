import {AnimeSitePort} from "../application/port/animeSitePort";
import {AnimeEpisode} from "../domain/animeEpisode";

export class AnimeSiteStub implements AnimeSitePort {
    private animeEpisodes: AnimeEpisode[] = [];

    getLatestAnimeEpisodes(): AnimeEpisode[] {
        return this.animeEpisodes;
    }

    addNewAnimeEpisode(animeEpisodes: AnimeEpisode[]) {
        animeEpisodes.forEach(episode => this.animeEpisodes.push(episode));
    }
}