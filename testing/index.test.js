
const { query, GraphServer } = require("@simpleview/sv-graphql-client");
const { EmailPrefix } = require("../");
const assert = require("assert");
const express = require("express");
const mochaLib = require("@simpleview/mochalib");

const GRAPH_URL = "https://graphql.kube.simpleview.io/";
const graphServer = new GraphServer({ graphUrl : GRAPH_URL, prefixes : [EmailPrefix] });

const app = express();

describe(__filename, function() {
	var server;
	
	before((done) => {
		app.post("/test_send_200/", (req, res) => {
			res.statusMessage = "OK";
			res.status(200).end();
		});

		app.post("/test_send_452/", function(req, res) {
			res.statusMessage = "Missing or Invalid Required Fields";
			res.status(452).end();
		});

		server = app.listen(8080, async () => {
			return done();
		});
	});

	after((done) => {
		server.close();

		return done();
	});

	it("should send email", async function() {
		const sendResult = await graphServer.email.send({
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
					],
					api_key : "bogus_api_key",
					api_url : "http://127.0.0.1:8080/test_send_200/"
				}
			]
		});
	});
});