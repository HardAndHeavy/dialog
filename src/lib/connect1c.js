import axios from 'axios';

export default async (data) => {
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
};
