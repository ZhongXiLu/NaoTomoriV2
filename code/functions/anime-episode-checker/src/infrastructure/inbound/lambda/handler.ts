import {LambdaEnvironment} from "./lambdaEnvironment";
import {EventBridgeEvent} from "aws-lambda";
import {AnimeEpisodeChecker} from "../../../application/animeEpisodeChecker";
import {AnimeStoreDynamoAdapter} from "../../outbound/dynamo/animeStoreDynamoAdapter";
import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {_9AnimeAdapter} from "../../outbound/9anime/_9AnimeAdapter";
import {DiscordNotificationAdapter} from "../../outbound/discord/discordNotificationAdapter";

const environment = new LambdaEnvironment()

const dynamoDBClient = new DynamoDBClient({region: 'eu-central-1'});

const animeStoreDynamoAdapter = new AnimeStoreDynamoAdapter(dynamoDBClient, environment.getAnimeWatchingTableName());
const _9animeAdapter = new _9AnimeAdapter(environment.get9AnimeUrl());
const discordNotificationAdapter = new DiscordNotificationAdapter(environment.getDiscordClientToken(), environment.getDiscordBotChannelId(), environment.getDiscordUserId());
const animeEpisodeChecker = new AnimeEpisodeChecker(animeStoreDynamoAdapter, _9animeAdapter, discordNotificationAdapter);

export const lambdaHandler = async (event: EventBridgeEvent<any, any>) => {
    try {
        await animeEpisodeChecker.checkNewEpisodes();
    } catch (err) {
        console.error(err);
    }
}
