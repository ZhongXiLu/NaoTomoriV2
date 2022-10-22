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
        myAnimeListStub.addAnime(["Chainsaw Man", "Spy x Family Part 2"])

        await animeListSynchroniser.sync();

        expect(animeStoreStub.getAnime()).toEqual(["Chainsaw Man", "Spy x Family Part 2"]);
    });

    it('should remove anime from DynamoDb when anime is removed in MyAnimeList', async () => {
        myAnimeListStub.addAnime(["Chainsaw Man"])
        animeStoreStub.addNewAnime(["Chainsaw Man", "Spy x Family Part 2"]);

        await animeListSynchroniser.sync();

        expect(animeStoreStub.getAnime()).toEqual((["Chainsaw Man"]));
    });

    it('should not do anything to DynamoDb when its list is the same as in MyAnimeList', async () => {
        myAnimeListStub.addAnime(["Chainsaw Man", "Spy x Family Part 2"])
        animeStoreStub.addNewAnime(["Chainsaw Man", "Spy x Family Part 2"]);

        await animeListSynchroniser.sync();

        expect(animeStoreStub.getAnime()).toEqual(["Chainsaw Man", "Spy x Family Part 2"]);
    });

});
