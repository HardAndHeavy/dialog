import connect1c from '../lib/connect1c';

export default () => async (req, res) => {
  const { 'dialog-token': token } = req.headers;
  if (token !== process.env.DIALOG_TOKEN) {
    res.status(403);
    return;
  }

  const {
    intentInfo: { displayName: intent, parameters: params },
    pageInfo,
    sessionInfo,
    payload,
  } = req.body;
  const { text, updatedSession } = await connect1c({
    source: 'Dialogflow',
    intent,
    payload: payload || {},
    params,
    session: sessionInfo.parameters.params || {},
  });
  const data = {
    fulfillmentResponse: {
      messages: [{ text: { text: [text] } }],
    },
    pageInfo,
    sessionInfo: {
      ...sessionInfo,
      parameters: {
        ...sessionInfo.parameters,
        params: updatedSession,
      },
    },
  };

  res.json(data);
};
