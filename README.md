# sv-email-client
Client for communicating with sv-email

# installation

```
npm install @simpleview/sv-email-client
```

## API

## EmailPrefix

`EmailPrefix` can be loaded into `sv-graphql-client` `GraphServer` to use as a client library for accessing `email` in GraphQL.

```js
const { EmailPrefix } = require("@simpleview/sv-email-client");
const { GraphServer } = require("@simpleview/sv-graphql-client");
const graphServer = new GraphServer({ graphUrl : GRAPH_URL, prefixes : [EmailPrefix] });
```