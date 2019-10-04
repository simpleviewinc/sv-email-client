const { query } = require("@simpleview/sv-graphql-client");

class EmailPrefix {
	constructor({ graphUrl, graphServer }) {
		this.name = "email";
		
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
				mutation($input: email_send_input!) {
					email {
						send(input: $input) {
							${fields}
						}
					}
				}
			`,
			variables,
			url : this._graphUrl,
			token : context.token
		});
		
		return response.email.send;
	}
}

module.exports = EmailPrefix;