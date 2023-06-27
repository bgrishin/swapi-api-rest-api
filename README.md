# Swapi Api 🌎 (unofficial) 

**Swapi Api** is a project about all the characters from the movie **"Star Wars ⭐️"**.
It's main essence is to show information about all characters, planets, films in the form of an api. You can create, edit and delete a character, as well as attach pictures to it.

### How does the project work? 📄
Our project works very simply, it takes data from [swapi](https://swapi.dev/"swapi") 💿 in JSON format and puts it into a database

### How to launch the project? 🚀
1. Clone a repository:

   `git clone https://github.com/BOGDAN-GRISHIN/swapi-api-rest-api.git`

2. Enter in the directory with project and run next command to install dependencies:

   `npm install --force`

3. Make an .env file from the .env.example file:

   `cp .env.example .env`
4. Make the necessary configuration changes to the .env file:
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

7. Run the migrations to create the database tables:

   `npm run migration:up`
8. Run the seeders to fill the database with data from swapi.dev:

   `npm run seed:run`
9. Finnaly run the program:

   `npm run start:dev`
10. Open the browser, go to the address: http://127.0.0.1:3000/api or http://localhost:3000/api and you will see the swagger documentation. Enjoy! 🔮
