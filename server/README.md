## Types
Enums cannot be shared between Typescript and GraphQL. This can lead to confusion but we have to maintain both enums for graphQL resolvers and Typescript definitions.
GraphQL enums should only be used for resolvers or in the schema definition (can be imported after generation as string values).
Typescript enums should be used everywhere else : server code, tests, mongoose schemas.