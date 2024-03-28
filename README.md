## 🎬 TVINFO Whatsapp Bot

![WhatsApp Bot](https://img.shields.io/badge/Bot-WhatsApp-brightgreen)
![Node.js Version](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fhirushaph%2Ftvinfo%2Fmain%2Fpackage.json&query=%24.engines.node&label=Node%20JS&color=228B22)
![Baileys Version](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fhirushaph%2Ftvinfo%2Fmain%2Fpackage.json&query=%24.dependencies[%27%40whiskeysockets%2Fbaileys%27]&label=Baileys&color=11a385)
![Tvinfo Version](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fhirushaph%2Ftvinfo%2Fmain%2Fpackage.json&query=%24.version&label=Version)

> This WhatsApp bot provides movies and tv series information to users

<br>

### ✨ Features

| Feature        | Description                                                              |
| -------------- | ------------------------------------------------------------------------ |
| Movie Info     | Get details about a specific movie, including its cast, genres and more. |
| TV Series Info | Retrieve information about TV series.                                    |
| Posters        | Get movie and tv series posters.                                         |

<br>

### 🔎 Usage

Once the bot is running and configured with your WhatsApp account, you can interact with it using the following commands

**Get movie details**

`.mv moviename .y year`

- `.y` is optional you can use this command without year

  > Examples

  > .mv avengers

  > .mv jumanji .y 2017

**Get tv series details**

`.tv moviename .y year`

- `.y` is optional you can use this command without year

  > Examples

  > .tv game of thrones

  > .tv the boys .y 2019

**Get posters**

`img`

- When you receive movie details using the above commands, you can send the `img` command as a reply to get posters

<br>

### 🚀 Installation

    git clone https://github.com/hirushaph/tvinfo
    cd tvinfo
    npm install

<br>

### ⚙ Configurations

1. Rename `.env.sample` to `.env` and update following values
2. Get TMDB **Access token** from here - [TMDB token](https://www.themoviedb.org/settings/api)
3. Get OMDB Api Key from here - [OMDB key](https://www.omdbapi.com/apikey.aspx)

   - `OMDB Api Key` is optional, this api use to get IMDb, Rotten Tomatoes Ratings

4. Create Mongodb Atlas FREE Database instance and add database connection url to `MONGODB_URL` field. [MongoDB Atlas FREE](https://www.mongodb.com/atlas/database)

5. ```js
   /**
    * .env
    * example env file
    * fill all this fields with correct values
   **/
   TMDB_ACCESS_TOKEN=
   OMDB_KEY=
   // Currently bot only support mongodb database
   MONGODB_URI=
   ```
6. If needed, you can also change values in config.js to alter the bot's behavior.

<br>

### 🛠️ Built With

- Baileys Whatsapp API

<br>

### 🍃 Contributing

Contributions are welcome! If you have any bug reports, or improvements, feel free to open an issue or create a pull request.
