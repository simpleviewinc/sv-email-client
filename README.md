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

* You must specify a `to` or a `users` array but not both.
	* If you want ONE e-mail to go to multiple users, such that all e-mail address appears alongside each other on the to line, the utilize the `to` array.
	* If you want MULTIPLE e-mails to go to multiple users, where each gets a unique e-mail with just their address in the to line, then utilize the `users` array.
* If you specify `cc` or `bcc` when using the `users` array, then each e-mail in the `users` array will receive an e-mail and each will have the entries from the `cc` and `bcc`.
* The top level `success` boolean will only be `true` if all e-mails are successfully sent.
* When debugging you can request the `email` field and it will return the arguments that are passed on to SendGrid's api.
* If you have tests which send to invalid e-mail addresses, please utilize `sandbox : true` so that the e-mail is not sent, but you can still verify that the code to `sv-email` is working. This way our email reputation score is not adversely affected by sending to bogus e-mails.

### Substitutions

If you need to send an e-mail to multiple users but want the e-mail to personalized per user, you can use the `substitutions` object.

In the substitutions object the key is the value you are substituting, and the value is the key that will replace it. The key name can be any value, it does not need to be wrapped in `%`. SendGrid does a simple string replace so if the key you choose occurs naturally, then you may get substitutions you did not plan, so please choose a unique key structure such as `%key%` or `{{key}}` or `${key}`.

In the example below the key is `%fname%`. This will result in an e-mail being sent to `oallen@simpleviewinc.com` with the subject `Hello Owen` and an e-mail to `msaladino@simpleviewinc.com` with the subject `Hello Michael`.

```
graphServer.email.send({
	input : {
		users : [
			{
				email : "oallen@simpleviewinc.com",
				substitutions : {
					"%fname%" : "Owen"
				}
			},
			{
				email : "msaladino@simpleviewinc.com",
				substitutions : {
					"%fname%" : "Michael"
				}
			}
		],
		from : { email : "donotreply@simpleviewinc.com" },
		subject : "Hello %fname%",
		body : { type : html, value : "<h1>Dear %fname%</h1><p>You are receiving this e-mail because you are totally awesome.</p>" },
		sandbox : true
	},
	fields : `
		success
		message
	`
})
```

For more information about substitutions, please see the [SendGrid API documentation](https://sendgrid.com/docs/api-reference/).

# Development

* Tests located in `sv-email`.
* Publish - `sudo npm run publish SEMVER`