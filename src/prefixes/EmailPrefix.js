const { query } = require("@simpleview/sv-graphql-client");
const Email = require("./email/Email");

class EmailPrefix {
	constructor({ graphUrl, graphServer }) {
		this.name = "email";
		
		const email = new Email({ graphUrl, name : this.name, graphServer : graphServer });
		this["send"] = email.send.bind(email);
	}
}

module.exports = EmailPrefix;