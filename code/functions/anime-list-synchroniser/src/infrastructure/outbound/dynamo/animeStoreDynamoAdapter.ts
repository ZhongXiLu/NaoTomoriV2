import {AnimeStorePort} from "../../../application/port/animeStorePort";
import {BatchWriteItemCommand, DynamoDBClient, ScanCommand} from "@aws-sdk/client-dynamodb";

export class AnimeStoreDynamoAdapter implements AnimeStorePort {
    private dynamoDbClient: DynamoDBClient;
    private readonly tableName: string;

    constructor(dynamoDbClient: DynamoDBClient, tableName: string) {
        this.dynamoDbClient = dynamoDbClient;
        this.tableName = tableName;
    }

    async getAnimeList(): Promise<string[]> {
        const scanCommandOutput = await this.dynamoDbClient.send(new ScanCommand({
            TableName: this.tableName
        }));

        const anime = scanCommandOutput.Items;
        if (anime) {
            return anime.map(a => a.Title.S!);
        } else {
            console.error("No anime found in Dynamo");
            return [];
        }
    }

    async addNewAnime(anime: string[]): Promise<void> {
        const putRequests = anime.map(a => ({
            PutRequest: {
                Item: {
                    Title: {S: a}
                }
            }
        }));

        await this.dynamoDbClient.send(new BatchWriteItemCommand({
            RequestItems: {
                [this.tableName]: putRequests
            }
        }));
    }

    async removeAnime(anime: string[]): Promise<void> {
        const deleteRequests = anime.map(a => ({
            DeleteRequest: {
                Key: {
                    Title: {S: a}
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