export class LambdaEnvironment {

    getAnimeWatchingTableName() {
        return process.env.ANIME_WATCHING_TABLE_NAME ? process.env.ANIME_WATCHING_TABLE_NAME : "ANIME_WATCHING_TABLE_NAME";
    }

    get9AnimeUrl() {
        return process.env.NINE_ANIME_URL ? process.env.NINE_ANIME_URL : "NINE_ANIME_URL";
    }

    getDiscordClientToken() {
        return process.env.DISCORD_CLIENT_TOKEN ? process.env.DISCORD_CLIENT_TOKEN : "DISCORD_CLIENT_TOKEN";
    }

    getDiscordBotChannelId() {
        return process.env.DISCORD_BOT_CHANNEL_ID ? process.env.DISCORD_BOT_CHANNEL_ID : "DISCORD_BOT_CHANNEL_ID";
    }

    getDiscordUserId() {
        return process.env.DISCORD_USER_ID ? process.env.DISCORD_USER_ID : "DISCORD_USER_ID";
    }
}