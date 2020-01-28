/* eslint-disable react/prop-types */
import React, { useRef } from 'react';
import { withCookies } from 'react-cookie';
import { axiosPost } from '../../global/func';
import './Login.scss';

function Login({ cookies }) {
  const email = useRef(null);
  const password = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email.current.value === '' || password.current.value === '') return;

    axiosPost('/login', {
      email: email.current.value,
      password: password.current.value,
    }, (res) => {
      const { token, id, role } = res.data.data;
      cookies.set('token', token, { path: '/' });
      cookies.set('role', role, { path: '/' });
      cookies.set('id', id, { path: '/' });
    });
  };

  return (
    <section className="login">
      <form onSubmit={handleSubmit}>
        <input ref={email} type="email" placeholder="user" required />
        <input ref={password} type="password" placeholder="password" required />
        <button type="submit">Sign-in</button>
      </form>
    </section>
  );
}

export default withCookies(Login);
