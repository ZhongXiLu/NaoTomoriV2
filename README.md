# NaoTomoriV2

An attempt to create a successor for [NaoTomori](https://github.com/ZhongXiLu/NaoTomori), a Discord bot that will ping you when a new episode has been released for an anime that you are currently watching.

My idea was to recreate this bot on AWS using only serverless services, but unfortunately I stumbled on a web scraping issue. When I try to scrape 9Anime, I get blocked by Cloudflare, I believe this is because Cloudflare has blacklisted AWS's ip addresses since it does work from my local machine.

Anyway, for now I'm abandoning this project... 😭

### Architecture

![NaoTomori v2 drawio](https://user-images.githubusercontent.com/25816683/198884145-068be05d-0826-495a-a0d9-52ea1b10d7f7.png)

