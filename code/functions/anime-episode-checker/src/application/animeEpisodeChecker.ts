import {AnimeStorePort} from "./port/animeStorePort";
import {AnimeSitePort} from "./port/animeSitePort";
import {NotificationPort} from "./port/notificationPort";

export class AnimeEpisodeChecker {
    private animeStorePort: AnimeStorePort;
    private animeSitePort: AnimeSitePort;
    private notificationPort: NotificationPort;

    constructor(animeStorePort: AnimeStorePort, animeSitePort: AnimeSitePort, notificationPort: NotificationPort) {
        this.animeStorePort = animeStorePort;
        this.animeSitePort = animeSitePort;
        this.notificationPort = notificationPort;
    }

    checkNewEpisodes() {
        const animeWatchingList = this.animeStorePort.getAnimeWatchingList();
        const latestAnimeEpisodes = this.animeSitePort.getLatestAnimeEpisodes();

        const latestAnimeWatchingEpisodes = latestAnimeEpisodes
            .filter(episode => animeWatchingList.filter(anime => {
                if (anime.title === episode.title) {
                    // Filter anime we are actually currently watching (i.e. episode progress is at least 1)
                    //      or if the anime is on the plan-to-watch list, also allow new first episodes
                    if (anime.episode >= 1 || episode.nr <= 1) {
                        return true;
                    }
                }
                return false;
            }).length != 0);

        latestAnimeWatchingEpisodes.forEach(episode => this.notificationPort.sendNotification(episode));
    }
}