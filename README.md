# UBQ API

This project was generated with [ExpressJs](https://github.com/expressjs/express) version 4.16.2.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites
Install **Node.js®** and **NPM** if they are not already on your machine.

>Make sure you have installed at least **Node.js _8.x_** or **_greater_** and **npm _version 5.x_** or **_greter_**.
In terminal/console window, run `node -v` and `npm -v` to check your installed version.

### Installing

Clone project into local environment.
```
git clone https://github.com/nya429/ubq-backend-api.git
```

Install project by run:
```
npm install
```

## Start server

To start server run:
```
node bin/server.js
```


### Send Test Request

Navigate to `http://localhost:3000/` on your browser, then you will get a Json respond with code 404 if the server is functional.

### Mysql Client Configuration

To switch between your local Mysql and Mysql hosted on Amazon RDS, comment out the  **_conf_** object in **conf/mysql.js** that you don't need.
