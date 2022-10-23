export class LambdaEnvironment {

    getMalClientId(): string {
        return process.env.MAL_CLIENT_ID ? process.env.MAL_CLIENT_ID : "MAL_CLIENT_ID";
    }

    getMalUsername() {
        return process.env.MAL_USERNAME ? process.env.MAL_USERNAME : "MAL_USERNAME";
    }

    getMalPassword() {
        return process.env.MAL_PASSWORD ? process.env.MAL_PASSWORD : "MAL_PASSWORD";
    }

    getAnimeWatchingTableName() {
        return process.env.ANIME_WATCHING_TABLE_NAME ? process.env.ANIME_WATCHING_TABLE_NAME : "ANIME_WATCHING_TABLE_NAME";
    }
}