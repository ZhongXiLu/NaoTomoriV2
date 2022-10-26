import {AnimeStorePort} from "../../../application/port/animeStorePort";
import {BatchWriteItemCommand, DynamoDBClient, ScanCommand} from "@aws-sdk/client-dynamodb";
import {AnimeWatching} from "../../../domain/animeWatching";

export class AnimeStoreDynamoAdapter implements AnimeStorePort {
    private dynamoDbClient: DynamoDBClient;
    private readonly tableName: string;

    constructor(dynamoDbClient: DynamoDBClient, tableName: string) {
        this.dynamoDbClient = dynamoDbClient;
        this.tableName = tableName;
    }

    async getAnimeList(): Promise<AnimeWatching[]> {
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

    async putAnime(anime: AnimeWatching[]): Promise<void> {
        const putRequests = anime.map(a => ({
            PutRequest: {
                Item: {
                    Title: {S: a.title},
                    Episode: {N: a.episode.toString()}
                }
            }
        }));

        await this.dynamoDbClient.send(new BatchWriteItemCommand({
            RequestItems: {
                [this.tableName]: putRequests
            }
        }));
    }

    async removeAnime(anime: AnimeWatching[]): Promise<void> {
        const deleteRequests = anime.map(a => ({
            DeleteRequest: {
                Key: {
                    Title: {S: a.title}
                }
            }
        }));

        await this.dynamoDbClient.send(new BatchWriteItemCommand({
            RequestItems: {
                [this.tableName]: deleteRequests
            }
        }));
    }
}