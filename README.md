# Voicemod Interview Coding Challenge

    Implementación simple de una API CRUD en Node.js utilizando Express, GraphQL, TypeGraphQL, TypeORM, Redis, Docker y Postgres.

## Project Structure
```
.                          
├── README.md                               
├── docs                                    Useful documentation
├── package.json                            NPM Project properties
├── tsconfig.json                           Typescript compile options
├── ormconfig.json                          TypeORM configuration
├── Dockerfile                              App docker config
├── docker-compose.yml                      Docker config
├── .env                                    Environment variables
├── .dockerignore
├── .gitignore
└── src
    ├── graphql
    │   ├── resolvers
    │   │   └── user
    │   │       └── User.ts
    │   └── types
    │       └── user
    │           ├── CreateUserInput.ts
    │           ├── LoginUserInput.ts
    │           └── UpdateUserInput.ts
    │
    ├── database
    │   └── entity
    │       └── <Entity>.ts
    │    
    ├── context.ts
    ├── generateSchema.ts
    └── index.ts
```

## Previous requirements

1. Install docker
2. Install docker-compose

## Development steps

1. Install Node +14
2. Install NPM
3. Run `npm i`

## Steps to deploy

1. Run `docker-compose up`

## Authors

* **David González** - [deivi98](https://github.com/deivi98)
