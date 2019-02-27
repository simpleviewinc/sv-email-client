const Email = require("./email/Email");

class EmailPrefix {
	constructor({ graphUrl, graphServer }) {
		this.name = "email";
		
		const _email = new Email({ graphUrl, name : this.name, graphServer });
		this["send"] = _email.send.bind(_email);
	}
}

module.exports = EmailPrefix;