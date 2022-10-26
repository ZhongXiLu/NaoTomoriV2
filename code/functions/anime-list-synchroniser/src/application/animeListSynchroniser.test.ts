import {AnimeListSynchroniser} from "./animeListSynchroniser";
import {AnimeStoreStub} from "../fixtures/animeStoreStub";
import {MyAnimeListStub} from "../fixtures/myAnimeListStub";

let myAnimeListStub: MyAnimeListStub;
let animeStoreStub: AnimeStoreStub;
let animeListSynchroniser: AnimeListSynchroniser;

describe('Anime List Synchroniser', () => {

    beforeEach(() => {
        myAnimeListStub = new MyAnimeListStub();
        animeStoreStub = new AnimeStoreStub();
        animeListSynchroniser = new AnimeListSynchroniser(myAnimeListStub, animeStoreStub);
    });

    it('should add new anime to DynamoDb when there are new anime added in MyAnimeList', async () => {
        myAnimeListStub.addAnime([{title: "Chainsaw Man", episode: 2}, {title: "Spy x Family Part 2", episode: 4}])

        await animeListSynchroniser.sync();

        expect(await animeStoreStub.getAnimeList()).toEqual([{title: "Chainsaw Man", episode: 2}, {title: "Spy x Family Part 2", episode: 4}]);
    });

    it('should remove anime from DynamoDb when anime is removed in MyAnimeList', async () => {
        myAnimeListStub.addAnime([{title: "Chainsaw Man", episode: 2}])
        await animeStoreStub.putAnime([{title: "Chainsaw Man", episode: 2}, {title: "Spy x Family Part 2", episode: 4}]);

        await animeListSynchroniser.sync();

        expect(await animeStoreStub.getAnimeList()).toEqual([{title: "Chainsaw Man", episode: 2}]);
    });

    it('should not do anything to DynamoDb when its list is the same as in MyAnimeList', async () => {
        myAnimeListStub.addAnime([{title: "Chainsaw Man", episode: 2}, {title: "Spy x Family Part 2", episode: 4}])
        await animeStoreStub.putAnime([{title: "Chainsaw Man", episode: 2}, {title: "Spy x Family Part 2", episode: 4}]);

        await animeListSynchroniser.sync();

        expect(await animeStoreStub.getAnimeList()).toEqual([{title: "Chainsaw Man", episode: 2}, {title: "Spy x Family Part 2", episode: 4}]);
    });

    it('should update episode count in DynamoDb when the count is updated in MyAnimeList', async () => {
        myAnimeListStub.addAnime([{title: "Chainsaw Man", episode: 3}])
        await animeStoreStub.putAnime([{title: "Chainsaw Man", episode: 2}]);

        await animeListSynchroniser.sync();

        expect(await animeStoreStub.getAnimeList()).toEqual([{title: "Chainsaw Man", episode: 3}]);
    });

});
