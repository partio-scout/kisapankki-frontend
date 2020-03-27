# Project
Our goal is to build task bank/management webapplication with React and NodeJS development environment's.

# Setting up
You can run project with command npm install and then npm start.
Browser should open http://localhost:3000/ address for local environment

# Env files
You have to setup your own env files.

* Frontend: 

REACT_APP_API_URL=http://localhost:3001/api

* Backend: 

MONGODB_URI= "Enter mongoDB uri"
PORT=3001
TEST_MONGODB_URI= "Enter mongoDB uri for tests"
SECRET= "Enter your secret"
ADMIN_KEY= "Enter admin key"
APPLICATION_STAGE=DEV
AZURE_STORAGE_ACCOUNT_NAME= "Enter azure 
AZURE_STORAGE_ACCOUNT_ACCESS_KEY= "Enter azure key"


### Admin features
* Add more admins to system
* Add/delete/modify tasks
* Change tasks pending variable

### User features
* Add tasks to pending list

### Database tables

![Tables](/documents/tietokantataulut.jpg)

https://www.draw.io/ Import from Trello -> Documentation -> Untitled Diagram.xml
