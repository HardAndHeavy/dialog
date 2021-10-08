import { SessionsClient } from '@google-cloud/dialogflow-cx';
import fs from 'fs';

export default () => {
  const client = new SessionsClient(
    {
      apiEndpoint: `${process.env.DF_LOCATION}-dialogflow.googleapis.com`,
      credentials: {
        client_email: process.env.DF_CLIENT_EMAIL,
        private_key: fs.readFileSync('/etc/dialogflow.key', 'utf8'),
      },
    },
  );

  const sessionPath = (sessionId) => client.projectLocationAgentSessionPath(
    process.env.DF_PROJECT_ID,
    process.env.DF_LOCATION,
    process.env.DF_AGENT_ID,
    sessionId,
  );

  const payloadFields = (payload) => Object.keys(payload).reduce(
    (acc, key) => ({ ...acc, [key]: { stringValue: payload[key] } }), {},
  );

  const getAnswer = async ({ query, sessionId, payload }) => {
    const request = {
      session: sessionPath(sessionId),
      queryInput: {
        text: {
          text: query,
        },
        languageCode: process.env.DF_LANGUAGE_CODE,
      },
      queryParams: {
        payload: {
          fields: payloadFields(payload),
        },
      },
    };
    const [{
      queryResult: {
        responseMessages: [{
          text: {
            text: [answer],
          },
        }],
      },
    }] = await client.detectIntent(request);
    return answer;
  };

  return async (req, res) => {
    const { 'dialog-token': token } = req.headers;
    if (token !== process.env.DIALOG_TOKEN) {
      res.status(403);
      return;
    }
    const answer = await getAnswer(req.body);
    res.json({ answer });
  };
};
