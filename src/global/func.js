import axios from 'axios';

const baseUrl = 'http://localhost:3001/api';

const gel = (el) => document.querySelector(el);
const gelall = (el) => document.querySelectorAll(el);

const axiosGet = async (relativeUrl = '/', setState = () => { }, callback = () => { }) => {
  try {
    const match = document.cookie.match(/(^| )token=([^;]+)/);

    const url = `${baseUrl}${relativeUrl}`;
    const res = await axios.get(url, {
      headers: {
        'x-access-token': match[2],
      },
    });
    await setState(res.data);
    await callback(res);
    return res;
  } catch (err) {
    await callback(err);
    return err;
  }
};

const axiosPost = async (relativeUrl = '/', body = {}, callback = () => { }) => {
  try {
    const url = `${baseUrl}${relativeUrl}`;
    const res = await axios.post(url, body);
    await callback(res);
    return res;
  } catch (err) {
    await callback(err);
    return err;
  }
};

const checkToken = () => new Promise((resolve, reject) => {
  try {
    (async () => {
      const match = document.cookie.match(/(^| )token=([^;]+)/);
      if (!match) reject(new Error('Token não existe!'));
      const res = await axios.get(`${baseUrl}/check-token`, {
        headers: {
          'x-access-token': match[2],
        },
      });
      resolve(res.data.data);
    })();
  } catch (err) {
    if (err.response.status === 500) {
      reject(new Error('Server Error'));
    }
  }
});

export {
  gel,
  gelall,
  axiosGet,
  axiosPost,
  checkToken,
};
