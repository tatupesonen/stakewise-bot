<div align="center">
  <h1>Stakewise Discord Bot</hi>
  

</div>
Token information bot for the StakeWise Discord server.

# Commands
`/poolstats` shows the current pool information from Uniswap for StakeWise related tokens.

## Required Permissions

- Read Messages
- Send Messages
- application.commands scope

## Getting Started ⚙️

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Requirements

- Docker
- Docker Compose (compatible with docker-compose version 3.8)

## For development
- Yarn
- Node.js >= 16.6.0

Get the Docker version you need [here](https://hub.docker.com/search?q=docker&type=edition&offering=community)!


### Setup

```
DISCORD_TOKEN=<insert token>
OWNER=<insert owner id>
```

#### For **Linux** and **Mac** run

```console
$ cp .env.example .env
```

#### For **Windows** run

```powershell
> Copy-Item .env.example .env
```

Edit the **.env** file with your favourite editor, filling out the following properties:

- **DISCORD_TOKEN** (you can find the bot token under `https://discord.com/developers/applications/bot-id/bot` for an overview of all your bots visit https://discord.com/developers/applications)
- **OWNER** ([Where can I find my User/Server/Message ID?](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-))

Run the bot via `docker-compose`

```console
$ docker-compose up --build --detach
```

# Without Docker

Create the `.env` file like before.  
Then run `yarn && yarn dev` to start a development environment.

## Authors 👤

- **Tatu Pesonen** - _Original Author_ - [@tatupesonen](https://github.com/tatupesonen)

## Show your support ⭐️

Give a ⭐️ if this project helped you!

## License 📝

Copyright © 2022 [Tatu Pesonen](https://github.com/tatupesonen) <br>
This project is [GPLv3](LICENSE) licensed.
