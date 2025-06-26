## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

## Requirements:
Node.js 20+
macOS
Windows 10

### Download
https://nodejs.org/en

### Need installed Node.js

```bash
$ npm install
```

## Compile and run the project

```bash
$ cd hes-exam

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Docker run the project

```bash
# build
$ docker build -t my-nestjs-app .

# run
$ docker run -p 3000:3000 my-nestjs-app
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Usage

### Endpoints:

#### GET /

Description : Returns a greeting message
Response :
"Hello World!"

#### POST /equipment

Description : Adds a new equipment
Request Body :
{
"name": "string",
"type": "string",
"serialNumber": "string",
"status": true,
"purchaseDate": "Date"
}
Response:
{
"id": 1,
"name": "string",
"type": "string",
"serialNumber": "string",
"status": true,
"purchaseDate": "2012-04-23T18:25:43.511Z"
}

#### GET /equipment

Description : Returns all equipments or a message if no equipments exist
Response (if equipments exist) :
[
{
"id": 1,
"name": "string",
"type": "string",
"serialNumber": "string",
"status": true,
"purchaseDate": "date-time"
}
]
Response (if no equipments) :
"There are no equipments here"

#### GET /equipment/:id

Description : Returns a specific equipment by ID
URL Params : id=[integer]
Responses :

Success:
{
"id": 1,
"name": "string",
"type": "string",
"serialNumber": "string",
"status": true,
"purchaseDate": "date-time"
}

Not Found:
{
"statusCode": 404,
"message": "Equipment not found",
"error": "Not Found"
}

#### DELETE /equipment/:id

Description : Deletes a equipment by its ID
URL Params : id=[integer]
Response :
"Deleted element with X id"

If task not found:
{
"statusCode": 404,
"message": "Equipment not found",
"error": "Not Found"
}

# Thats all
