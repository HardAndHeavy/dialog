import { conversation } from '@assistant/conversation';
import connect1c from '../lib/connect1c';

export default () => {
  const middleware = conversation({ clientId: process.env.AG_CLIENT_ID });

  const intents = [];

  const hendler = (intent) => async (conv) => {
    const { text, updatedSession } = await connect1c({
      source: 'ActionOnGoogle',
      intent,
      payload: conv.user.params.tokenPayload,
      params: conv.intent.params,
      session: conv.session.params,
    });
    conv.session.params = updatedSession; // eslint-disable-line
    conv.add(text);
  };

  const addIntent = (intent) => {
    if (!intent || intents.indexOf(intent) !== -1) {
      return;
    }
    middleware.handle(intent, hendler(intent));
    intents.push(intent);
  };

  return (req, res, next) => {
    const intent = req.body?.handler?.name;
    addIntent(intent);
    middleware(req, res, next);
  };
};
