# Swapi Api 🌎 (unofficial) 

**Swapi Api** is a project about all the characters from the movie **"Star Wars ⭐️"**.
It's main essence is to show information about all characters, planets, films in the form of an api. You can create, edit and delete a character, as well as attach pictures to it.

### How does the project work? 📄
Our project works very simply, it takes data from [swapi](https://swapi.dev/"swapi") 💿 in JSON format and puts it into a database

### How to launch the project? 🚀
1. Clone a repository:

   `git clone https://github.com/BOGDAN-GRISHIN/swapi-api-rest-api.git`

2. Make an .env file from the .env.example file:

   `cp .env.example .env`
3. Make the necessary configuration changes to the .env file:
```
DB_USER=
DB_NAME=
DB_HOST=
DB_PASSWORD=
DB_PORT=

APP_HOST=
APP_PORT=

ACCESS_JWT_SECRET=
REFRESH_JWT_SECRET=

AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_PUBLIC_BUCKET_NAME=

```
4. Build and run docker containers in the background (if you don't have docker it's time to install it 😉)

   `docker-compose up --build -d`
5. Open the browser, go to the address: http://127.0.0.1:3000/api or http://localhost:3000/api and you will see the swagger documentation. Enjoy! 🔮

*6: To stop the server write `docker-compose stop`
