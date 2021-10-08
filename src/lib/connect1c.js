import axios from 'axios';

export default async (data) => {
  try {
    const { data: answer } = await axios({
      url: process.env.BASE_1C_HOST,
      method: 'post',
      auth: {
        username: process.env.BASE_1C_USERNAME,
        password: process.env.BASE_1C_PASSWORD,
      },
      headers: {
        'base-1c-token': process.env.BASE_1C_TOKEN,
      },
      data,
    });
    return answer;
  } catch (err) {
    let text = '';
    if (err.response) {
      if (err.response.status === 403) {
        text = `Отказано в доступе. Пожалуйста сообщите свой ID ${data.payload.email} администратору, чтобы он расширил права.`;
      } else {
        text = `Ошибка ${err.response.status} "${err.message}".`;
      }
    } else {
      text = `Произошла неизвестная ошибка "${err.message}".`;
    }
    return { text, updatedSession: data.sessiton };
  }
};
