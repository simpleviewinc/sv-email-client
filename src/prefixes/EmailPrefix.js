const { query, nullToUndefined } = require("@simpleview/sv-graphql-client");

class EmailPrefix {
	constructor({ graphUrl, graphServer }) {
		this.name = "email";
		
		this._graphUrl = graphUrl;
		this._graphServer = graphServer;
	}
	async send({ input, fields, context }) {
		context = context || this._graphServer.context;

		const variables = {
			input,
			acct_id : context.acct_id
		}

		const response = await query({
			query : `
				mutation($acct_id: String!, $input: email_send_input!) {
					email(acct_id: $acct_id) {
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
	async setup({ context, fields }) {
		context = context || this._graphServer.context;
		
		const variables = {
			acct_id : context.acct_id
		}
		
		const result = await query({
			query : `
				mutation($acct_id: String!) {
					email(acct_id: $acct_id) {
						setup {
							${fields}
						}
					}
				}
			`,
			variables,
			url : this._graphUrl,
			token : context.token
		});
		
		const returnData = result.email.setup;
		
		nullToUndefined(returnData);
		
		return returnData;
	}
	async test_reset_data({ context, fields }) {
		context = context || this._graphServer.context;
		
		console.log("context", context);
		
		const variables = {
			acct_id : context.acct_id
		}
		
		const result = await query({
			query : `
				mutation($acct_id: String!) {
					email(acct_id: $acct_id) {
						test_reset_data {
							${fields}
						}
					}
				}
			`,
			variables,
			url : this._graphUrl,
			token : context.token
		});
		
		const returnData = result.email.test_reset_data;
		
		nullToUndefined(returnData);
		
		return returnData;
	}
	async test_clear_data({ context, fields }) {
		context = context || this._graphServer.context;
		
		const variables = {
			acct_id : context.acct_id
		}
		
		const result = await query({
			query : `
				mutation($acct_id: String!) {
					email(acct_id: $acct_id) {
						test_clear_data {
							${fields}
						}
					}
				}
			`,
			variables,
			url : this._graphUrl,
			token : context.token
		});
		
		const returnData = result.email.test_clear_data;
		
		nullToUndefined(returnData);
		
		return returnData;
	}
}

module.exports = EmailPrefix;