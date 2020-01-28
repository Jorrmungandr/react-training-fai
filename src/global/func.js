import axios from 'axios';

const mainUrl = 'http://localhost:3001';

const gel = (el) => document.querySelector(el);
const gelall = (el) => document.querySelectorAll(el);

const checkToken = () => new Promise((resolve, reject) => {
  const match = document.cookie.match(/(^| )token=([^;]+)/);
  if (!match) reject(new Error('Token not found'));

  (async () => {
    try {
      const res = await axios.get(`${mainUrl}/check-token`);
      if (res.status === 200) resolve(true);
    } catch (err) {
      if (!err.response) return;
      const { status } = err.response;
      if (status === 401) reject(new Error('Invalid token'));
    }
  })();
});

const axiosGet = async (relativeurl = '/', setState = () => {}, options = { config: {} }, callback = () => {}) => {
  try {
    const { config } = options;
    const url = `${mainUrl}${relativeurl}`;

    const res = await axios.get(url, config);

    await setState(res.data);
    callback(res);
  } catch (err) {
    callback(err);
  }
};

const axiosPost = async (relativeUrl = '/', body = {}, callback = () => { }) => {
  try {
    const url = `${mainUrl}${relativeUrl}`;
    const res = await axios.post(url, body);
    callback(res, body);
  } catch (err) {
    callback(err, body);
  }
};

export {
  gel,
  gelall,
  checkToken,
  axiosGet,
  axiosPost,
};
