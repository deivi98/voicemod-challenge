# Voicemod Interview Coding Challenge
Implementación simple de una API CRUD en Node.js utilizando
* Express
* Apollo
* GraphQL
* TypeGraphQL
* TypeORM
* Redis
* Docker
* Postgres

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
    │   │       ├── query
    │   │       │   └── <ExampleQuery>.ts
    │   │       │
    │   │       └── mutation
    │   │           └── <ExampleMutation>.ts
    │   ├── types
    │   │   └── user
    │   │       └── <Example>Input.ts
    │   │
    │   ├── Context.ts
    │   │
    │   └── utils
    │       └── error
    │           └── <Example>Error.ts
    │
    ├── database
    │   └── entity
    │       └── User.ts
    │    
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
2. API will be listening on `http://localhost:5001/graphql`
3. You can also access to GraphQL playground on browser

## Authors

* **David González** - [deivi98](https://github.com/deivi98)
