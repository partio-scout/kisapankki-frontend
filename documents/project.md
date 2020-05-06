# Project
Our goal is to build task bank/management webapplication with React and NodeJS development environment's.

# Setting up
You can run project with command npm install and then npm start.
Browser should open http://localhost:3000/ address for local environment

# Env files
You have to setup your own env files.

* Frontend: 
```
REACT_APP_API_URL=http://localhost:3001/api
```

* Backend: 

```
MONGODB_URI= "Enter mongoDB uri"
PORT=3001
TEST_MONGODB_URI= "Enter mongoDB uri for tests"
SECRET= "Enter your secret"
ADMIN_KEY= "Enter admin key"
APPLICATION_STAGE=DEV
AZURE_STORAGE_ACCOUNT_NAME= "Enter azure 
AZURE_STORAGE_ACCOUNT_ACCESS_KEY= "Enter azure key"
```


### Admin features
* Add more admins to system
* Add/delete/modify tasks
* Change tasks pending variable

### User features
* Add tasks to pending list

### Database tables

![Tables](/documents/tietokantataulut.jpg)

https://www.draw.io/ Import from Trello -> Documentation -> Untitled Diagram.xml

### MD-TO-PDF

MD-TO-PDF npm-package is used in this application for parsing tasks to pdf-form. It has been implemented straight to the back-end code as a folder instead of npm module. This has been chosen due to lack of programmatical modification for puppeteer launch options.

For this reason dependencies of md-to-pdf must be declared in back-end root package.json. When updating md-to-pdf it must be cloned from github and transferred to back-end.

To ensure that the whole application goes trough CircleCI pipeline md-to-pdf folder's tests must be deleted. Application has been found to function correctly in Heroku, with the following configurations:

* Heroku buildpack for puppeteer: https://github.com/jontewks/puppeteer-heroku-buildpack
* Navigate to md-to-pdf/dist/lib/config.js and declare following launch_options: {   'args': ['--no-sandbox',
'--disable-setuid-sandbox']}
* Navigate to md-to-pdf/dist/index.js and comment out Object.defineProperty(exports, "__esModule", { value: true }); (presumably on line 6)

