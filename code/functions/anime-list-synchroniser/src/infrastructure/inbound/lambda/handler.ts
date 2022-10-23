import {LambdaEnvironment} from "./lambdaEnvironment";
import {AnimeListSynchroniser} from "../../../application/animeListSynchroniser";
import {MyAnimeListAdapter} from "../../outbound/myAnimeList/myAnimeListAdapter";
import {AnimeStoreDynamoAdapter} from "../../outbound/dynamo/animeStoreDynamoAdapter";
import {Mal} from "node-myanimelist";
import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {EventBridgeEvent} from "aws-lambda";

const environment = new LambdaEnvironment()

const auth = Mal.auth(environment.getMalClientId());
const malAccount = auth.Unstable.login(environment.getMalUsername(), environment.getMalPassword());
const dynamoDBClient = new DynamoDBClient({region: 'eu-west-1'});

const myAnimeListAdapter = new MyAnimeListAdapter(malAccount);
const animeStoreDynamoAdapter = new AnimeStoreDynamoAdapter(dynamoDBClient, environment.getAnimeWatchingTableName());
const animeListSynchroniser = new AnimeListSynchroniser(myAnimeListAdapter, animeStoreDynamoAdapter);

export const lambdaHandler = async (event: EventBridgeEvent<any, any>) => {
    try {
        console.log("Synchronising anime lists: " + JSON.stringify(event));
        await animeListSynchroniser.sync();
    } catch (err) {
        console.error(err);
    }
}
