import { conversation } from '@assistant/conversation';
import connect1c from '../lib/connect1c';

export default () => {
  const middleware = conversation({ clientId: process.env.AG_CLIENT_ID });

  const intents = [];

  const hendler = (intent) => async (conv) => {
    try {
      const { text, updatedSession } = await connect1c({
        source: 'ActionOnGoogle',
        intent,
        payload: conv.user.params.tokenPayload,
        params: conv.intent.params,
        session: conv.session.params,
      });
      conv.session.params = updatedSession; // eslint-disable-line
      conv.add(text);
    } catch (err) {
      if (err.response) {
        if (err.response.status === 403) {
          conv.add(`Отказано в доступе. Пожалуйста сообщите свой ID ${conv.user.params.tokenPayload.email} администратору, чтобы он расширил права.`);
        } else {
          conv.add(`Ошибка ${err.response.status} "${err.message}".`);
        }
      } else {
        conv.add(`Произошла неизвестная ошибка "${err.message}".`);
      }
    }
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
