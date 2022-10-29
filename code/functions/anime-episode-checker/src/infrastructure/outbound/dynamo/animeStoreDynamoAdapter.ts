import {AnimeWatching} from "../../../domain/animeWatching";
import {AnimeStorePort} from "../../../application/port/animeStorePort";
import {DynamoDBClient, ScanCommand} from "@aws-sdk/client-dynamodb";

export class AnimeStoreDynamoAdapter implements AnimeStorePort {
    private dynamoDbClient: DynamoDBClient;
    private readonly tableName: string;

    constructor(dynamoDbClient: DynamoDBClient, tableName: string) {
        this.dynamoDbClient = dynamoDbClient;
        this.tableName = tableName;
    }

    async getAnimeWatchingList(): Promise<AnimeWatching[]> {
        const scanCommandOutput = await this.dynamoDbClient.send(new ScanCommand({
            TableName: this.tableName
        }));

        const anime = scanCommandOutput.Items;
        if (anime) {
            return anime.map(a => ({
                title: a.Title.S!,
                episode: Number(a.Episode.N)!
            }));
        } else {
            console.error("No anime found in Dynamo");
            return [];
        }
    }
}