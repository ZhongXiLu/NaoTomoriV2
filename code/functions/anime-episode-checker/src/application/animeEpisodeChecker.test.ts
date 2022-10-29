import {AnimeEpisodeChecker} from "./animeEpisodeChecker";
import {NotificationStub} from "../fixtures/notificationStub";
import {AnimeSiteStub} from "../fixtures/animeSiteStub";
import {AnimeStoreStub} from "../fixtures/animeStoreStub";

let animeStoreStub: AnimeStoreStub;
let animeSiteStub: AnimeSiteStub;
let notificationStub: NotificationStub;
let animeEpisodeChecker: AnimeEpisodeChecker;

describe('Anime Episode Checker', () => {

    beforeEach(() => {
         animeStoreStub = new AnimeStoreStub();
         animeSiteStub = new AnimeSiteStub();
         notificationStub = new NotificationStub();
         animeEpisodeChecker = new AnimeEpisodeChecker(animeStoreStub, animeSiteStub, notificationStub);
    });


    it('should send out a new notification when a new episode has been released for a watching anime', async () => {
        animeStoreStub.addNewAnime([{title: "Chainsaw Man", episode: 2}, {title: "Spy x Family Part 2", episode: 4}]);
        animeSiteStub.addNewAnimeEpisode([{title: "Chainsaw Man", nr: 3}])

        await animeEpisodeChecker.checkNewEpisodes();

        expect(notificationStub.getNotifications()).toEqual([{title: "Chainsaw Man", nr: 3}]);
    });

    it('should not send out a new notification when a new episode has been released for a non watching anime', async () => {
        animeStoreStub.addNewAnime([{title: "Chainsaw Man", episode: 2}, {title: "Spy x Family Part 2", episode: 4}]);
        animeSiteStub.addNewAnimeEpisode([{title: "Mob Psycho III", nr: 4}])

        await animeEpisodeChecker.checkNewEpisodes();

        expect(notificationStub.getNotifications()).toEqual([]);
    });

    it('should send out a new notification when a new movie has been released for a plan to watch movie', async () => {
        animeStoreStub.addNewAnime([{title: "Suzume no Tojimari", episode: 0}]);
        animeSiteStub.addNewAnimeEpisode([{title: "Suzume no Tojimari", nr: 0}])

        await animeEpisodeChecker.checkNewEpisodes();

        expect(notificationStub.getNotifications()).toEqual([{title: "Suzume no Tojimari", nr: 0}]);
    });

    it('should not send out a new notification when a non first episode has been released for a plan to watch anime', async () => {
        animeStoreStub.addNewAnime([{title: "Blue Lock", episode: 0}]);
        animeSiteStub.addNewAnimeEpisode([{title: "Blue Lock", nr: 4}])

        await animeEpisodeChecker.checkNewEpisodes();

        expect(notificationStub.getNotifications()).toEqual([]);
    });

});