# sv-email-client
Client for communicating with sv-email

# installation

```
npm install @simpleview/sv-email-client
```

## API

## EmailPrefix

`EmailPrefix` is a class for working with the email system and ultimately sending emails.

```js
const { EmailPrefix } = require("@simpleview/sv-email-client");
// the GRAPH_URL is the graphQL server that you wish to communicate with. Get the proper URL from the sv-email repository to align with the appropriate live/dev/staging resource.
const emailPrefix = new emailPrefix({ graphUrl : GRAPH_URL });
```

### EmailPrefix.send

This method wraps the call to `email.send`.

* input - array of objects - Emails to be sent
	* content - object - The content of each email
		* subject - string - The subject that will appear on the email.
		* from - string - The email address that the email will be sent from.
		* replyto - string - The email address that will be labeled for replyto.
		* body - string - The body of the email.
	* users - array of objects - Users that will be receiving this email.
		* email - string - The email address of the receiver.
	* api_key - string - An API Key override to be used for testing.
	* api_url - string - An API URL override to be used for testing.

Returns `email_result`.

```js
const sendResult = EmailPrefix.send({
	input : [
		{
			content : {
				subject : "Email Subject",
				from : "donotreply@simpleviewinc.com",
				replyto : "reply@simpleviewinc.com",
				body : "Hello World!"
			},
			users : [
				{ email : "test@simpleviewinc.com" }
			]
		}
	]
});
```

For the available fields on each call you can reference the GraphQL schema via the schema browser.
