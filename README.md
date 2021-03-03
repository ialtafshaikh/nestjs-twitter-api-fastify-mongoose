<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Twitter API Backend Using NEST JS

## Description

Twitter REST API Backend build on NestJs uses Fastify HTTP and Mongooose ORM

## Features

- user can signup
- user can login and get their JWT token to authorized themselves
- Passport.js is used for Authentication and Authorization
- verify JWT token (authozrization) using Passport
- get the list of all the tweets of authenticated user
- create a tweet
- store data to mongoDB using atlas
- get tweet using tweet Id
- delete tweet using tweet Id
- update tweet using tweet Id
- Unit testing of tweetService, userServce and AuthService is done

## Additional Features

- hosted on heroku platform

## Project Dependencies Installation

```bash
$ npm install
```

## Downloading and Running this Project Locally

1. clone the repository

```
git clone https://github.com/ialtafshaikh/nestjs-twitter-api-fastify-mongoose.git
```

2. add a `.env` file inside the root folder

```
JWT_SECRET=any random string
DB_URL=mongodb+srv://altafshaikh:Awsed69@cluster0.wimdj.mongodb.net/nestApp?retryWrites=true&w=majority
```

Sample for local

```
JWT_SECRET=KATAPPANEBAHUBALIKOMARAHAI
DB_URL=mongodb+srv://<username>:<password>@cluster0.wimdj.mongodb.net/<database_name>?retryWrites=true&w=majority

```

## Supported Routes (Endpoints)

```

/auth/signup : (method:post) - create user accout

/auth/login : (method:post) - get jwt token and authenticate yourself using the creds (username,password)

/api/v1/tweets : (method:get) - to get all user tweets

/api/v1/tweets : (method:post) - to create tweet

/api/v1/tweets/:tweetId : (method:get) - to get a single tweet using tweetId

/api/v1/tweets/:tweetId : (method:patch) - to update tweet ``message`` of a tweet using tweetId

/api/v1/tweets/:tweetId : (method:delete) -  to delete tweet using tweetId


```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

To Host the Project I had used **Heroku Platform**.

## Live Demo of this Project

[hosted backend server]()

## Author

- **Altaf Shaikh** - _work by_ - [ialtafshaikh](https://github.com/ialtafshaikh)

![altaf shaikh](https://raw.githubusercontent.com/ialtafshaikh/static-files/master/coollogo_com-327551664.png)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
