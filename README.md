# velog

> velog is a blog platform for developers. It provides compfy markdown editor with syntax highlighter enabled.

## Project Stack

### Client

Following items are core frontend technologies used in this project:

- React
- React Router v4
- Sass
- Flow
- Redux
- Redux-pender
- Immer
- Marked
- Prismjs
- CodeMirror

### Server

Following items are core backend technologies used in this project:

- Node.js
- Koa
- Sequelize
- Sequelize-cockroachdb
- Serverless (with AWS Lambda)
- Flow (on Service API)
- TypeScript (on SSR)

## Project Architecture

![](https://i.imgur.com/wkdqu2r.png)
(Image above is created with [Cloudcraft](https://cloudcraft.co/view/00817b35-3c91-4435-be19-8757825e8c5f?key=5UWE37gAvfR4Yfe5THMV9g))

This service heavily relies on AWS Lambda. Its server side rendering function and every service API are hosted on AWS Lambda.

## Run on your machine

If you want to run velog on your machine, please check [Guidelines document](GUIDELINES.md).

## Contributions

Any kinds of contributions are welecomed. Since the test codes of the project is not completed yet, pull requests might take a while.
