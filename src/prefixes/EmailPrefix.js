const { query, nullToUndefined } = require("@simpleview/sv-graphql-client");

class EmailPrefix {
	constructor({ graphUrl, graphServer }) {
		this.name = "email";
		
		this._graphUrl = graphUrl;
		this._graphServer = graphServer;
	}
	async send({ input, fields, context, headers }) {
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
			token : context.token,
			headers
		});
		
		return response.email.send;
	}
	async account_setup({ fields, context, headers }) {
		context = context || this._graphServer.context;

		const variables = {
			acct_id : context.acct_id
		}

		const result = await query({
			query : `
				mutation($acct_id: String!) {
					email(acct_id: $acct_id) {
						account_setup {
							${fields}
						}
					}
				}
			`,
			variables,
			url : this._graphUrl,
			token : context.token,
			headers
		});

		const returnData = result.email.account_setup;
		
		nullToUndefined(returnData);
		
		return returnData;
	}
	async account_delete({ fields, context, headers }) {
		context = context || this._graphServer.context;

		const variables = {
			acct_id : context.acct_id
		}

		const result = await query({
			query : `
				mutation($acct_id: String!) {
					email(acct_id: $acct_id) {
						account_delete {
							${fields}
						}
					}
				}
			`,
			variables,
			url : this._graphUrl,
			token : context.token,
			headers
		});
		
		const returnData = result.email.account_delete;
		
		nullToUndefined(returnData);
		
		return returnData;
	}
	async account_delete_key({ fields, context, headers }) {
		context = context || this._graphServer.context;

		const variables = {
			acct_id : context.acct_id
		}

		const result = await query({
			query : `
				mutation($acct_id: String!) {
					email(acct_id: $acct_id) {
						account_delete_key {
							${fields}
						}
					}
				}
			`,
			variables,
			url : this._graphUrl,
			token : context.token,
			headers
		});

		const returnData = result.email.account_delete_key;
		
		nullToUndefined(returnData);
		
		return returnData;
	}
	async setup({ context, fields, headers }) {
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
			token : context.token,
			headers
		});
		
		const returnData = result.email.setup;
		
		nullToUndefined(returnData);
		
		return returnData;
	}
	async test_reset_data({ context, fields, headers }) {
		context = context || this._graphServer.context;
		
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
			token : context.token,
			headers
		});
		
		const returnData = result.email.test_reset_data;
		
		nullToUndefined(returnData);
		
		return returnData;
	}
	async test_clear_data({ context, fields, headers }) {
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
			token : context.token,
			headers
		});
		
		const returnData = result.email.test_clear_data;
		
		nullToUndefined(returnData);
		
		return returnData;
	}
}

module.exports = EmailPrefix;