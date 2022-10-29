import {NotificationPort} from "../../../application/port/notificationPort";
import {Client, Colors, EmbedBuilder, GatewayIntentBits} from "discord.js";
import {AnimeEpisode} from "../../../domain/animeEpisode";

class DiscordNotificationAdapter implements NotificationPort {
    private client: Client;
    private readonly clientToken: string;
    private botChannelId: string;
    private readonly userId: string;

    constructor(clientToken: string, botChannelId: string, userId: string) {
        this.client = new Client({intents: [GatewayIntentBits.Guilds]});
        this.clientToken = clientToken;
        this.botChannelId = botChannelId;
        this.userId = userId;
    }

    async sendNotifications(animeEpisodes: AnimeEpisode[]): Promise<void> {
        this.client.on('ready', () => {
            console.log(`Logged in as ${this.client.user!.tag}!`);

            const promises = animeEpisodes.map(animeEpisode => {
                const embed = new EmbedBuilder()
                    .setColor(Colors.Green)
                    .setTitle(animeEpisode.title)
                    .setDescription(`Episode ${animeEpisode.nr}`)
                    .setURL(animeEpisode.link)
                    .setThumbnail(animeEpisode.image)
                    .data;

                // @ts-ignore
                return this.client.channels.cache.get(this.botChannelId)!.send({
                        content: `<@${this.userId}>`,
                        embeds: [embed]
                    }
                );
            });

            Promise.all(promises)
                .then(() => this.client.destroy());
        });

        await this.client.login(this.clientToken);
    }

}