# How to run it local
## Database
You have to launch the MySQL DB container. There is a docker-compose.yaml file that contains all required configurations. 
Helpful command to manage MySQL DB:
```
docker-compose up -d # launch db conatiner
docker-compose stop # stop db conatiner
docker-compose down # destroy db conatiner
```  
Database and tables will create automatically once the container is running. There is a file db/anketa.sql that contains a dump of anketa database. It means if you accidentally deleted some tables you can simply recreate the DB container.
## Frontend
There is a folder ```frontend``` that contains ReactJS code for this app. 
To run this app locally you have to change the variable URL placed in ```frondend/src/api/client.js``` file
```
const url = "https://dubr-irc.herokuapp.com" // use in prod env
const url = "http://localhost:3000" // use it in local env
```
Before rebuilding run the following command ```npm install``` in ```frontrnd``` folder.
Rebuild static files that were generated by the command ```npm run build```.
## Backend
Run ```npm install``` command in the root folder.
Change the ```config/server.json``` file containing configuration for DB. Local env will have the following configuration:
```
{
    "host": "0.0.0.0",
    "port": 3000,
    "db": {
        "host": "localhost",
        "username": "user",
        "database": "anketa",
        "password": "user",
        "port": 3306,
        "connection_limit": 8
    },
    "jwt": {
        "secret_key": "TOKEN_KEY"
    }
}
```
After it, you can launch the app with this command ```npm run start```.
You can open the app using the following link ```localhost:3000```.

### What TODO
Separate env by using a variable. It will be done once is not required to change code to launch the app locally. </br>
Store secrets in some secret manager and retrieve them automatically during the start app. </br>
Update docker-compose.yaml file that simplifies the process of running the app. </br>