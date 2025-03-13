

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
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

## Stack used

- Nestjs
- GraphQL
- Prisma
- Typescript
- Postgres

## Features

- Sign up
- Login 
- Biometric login
- JWT Authentication


## Environment variables

- DATABASE_URL
- ACCESS_TOKEN_SECRET

## GraphQL schema

```
type Mutation {
  Login(loginInput: RegisterInput!): LoginResponse!
  Register(registerInput: RegisterInput!): LoginResponse!
  biometricLogin(biometricLoginInput: BiometricLoginInput!): LoginResponse!
}

input BiometricLoginInput {
  biometricKey: String!
}

input RegisterInput {
  email: String!
  password: String!
}

type Query {
  sayHello: String!
}

type LoginResponse {
  accessToken: String!
  user: User!
}

type User {
  email: String!
  id: String!
}
```

