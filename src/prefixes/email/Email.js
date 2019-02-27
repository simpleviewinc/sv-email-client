const { query } = require("@simpleview/sv-graphql-client");

class Email {
	constructor({ graphUrl, graphServer }) {
		this._graphUrl = graphUrl;
		this._graphServer = graphServer;
	}
	async send({ input, fields, context }) {
		context = context || this._graphServer.context;

		const variables = {
			input
		}

		const response = await query({
			query : `
				mutation($input: [email_object_input]!) {
					email {
						send(input: $input) {
							${fields}
						}
					}
				}
			`,
			variables,
			url : this._graphUrl
		});
		
		return response.email.send;
	}
}

module.exports = Email;