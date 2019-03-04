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

## send

Sends an e-mail or multiple e-mails. See the GraphQL schema browser for all available keys, the majority of which are self-explanatory.

There are a couple key things to keep in mind:

* You must specify a `to` or a `users` array.
	* If you want ONE e-mail to go to multiple users, such that all e-mail address appears alongside each other on the to line, the utilize the `to` array.
	* If you want MULTIPLE e-mails to go to multiple users, where each gets a unique e-mail with just their address in the to line, then utilize the `users` array.
	* If you specify BOTH a `to` address and users array, the emails in the users array will overwrite those in the `to` array.
* If you specify `cc` or `bcc` when using the `users` array, then each e-mail in the `users` array will receive an e-mail and each will have the entries from the `cc` and `bcc`.
* The top level `success` boolean will only be `true` if all e-mails are successfully sent. If not it will be false, and you can access the e-mails which failed by utilizing the `errors` key.
* While debugging feel free to request as many keys as needed, but in normal operations it's recommended to keep it as minimal as needed. If you send hundreds of e-mails via a large users array, and request the `results { body }` key you will get 100s of copies of the e-mail body back. Please don't do that.
	* `send(input: DATA) { success message errors { to } }` - This structure should allow you to determine whether it succeeded and which e-mails did not go out.
* In the event that an e-mail fails to send, it should continue to send all other e-mails based on the `users` array.

# Development

* Tests located in `sv-email`.
* Publish - `sudo npm run publish SEMVER`