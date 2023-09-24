const Sib = require("sib-api-v3-sdk");

const client = Sib.ApiClient.instance;

const apiKey = client.authentications["api-key"];
apiKey.apiKey =
  "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";

const tranEmailApi = new Sib.TransactionalEmailsApi();

module.exports = { tranEmailApi };
