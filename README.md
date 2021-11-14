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

## Steps to deploy

1. Clone this repo `git clone https://github.com/deivi98/voicemod-challenge.git`
2. `cd voicemod-challenge`
3. Run `docker-compose up`
4. Wait a couple of minutes for docker containers to start up
5. API will be listening on `http://localhost:5001/graphql`
6. You can also access to GraphQL playground on browser
7. Postman Collections file is available in docs/

NOTE: Session cookies are created automatically. Postman will work out of the box, but for GraphQL playground make sure you open preferences tab and you add the following property to make it work

    "request.credentials": "include"

## Development steps

1. Install Node 16
2. Install NPM
3. Run `npm i`

## Authors

* **David González** - [deivi98](https://github.com/deivi98)
