import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

function LoginPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault(); //reload 방지

    let body = {
      email: Email,
      password: Password,
    };

    dispatch(loginUser(body)).then((response) => {
      console.log(response.payload.loginSuccess);
      if (response.payload.loginSuccess) {
        props.history.push('/'); //로그인 성공시 이동
      } else {
        alert('ID 혹은 PW가 맞지 않습니다.');
      }
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
        onSubmit={onSubmitHandler}
      >
        <label
          style={{
            fontSize: '2rem',
            textAlign: 'center',
            color: '#4ba2c6',
          }}
        >
          Email
        </label>
        <input
          type="email"
          value={Email}
          onChange={onEmailHandler}
          style={{ width: '20rem', height: '3rem', marginBottom: '2rem' }}
        />

        <label
          style={{
            fontSize: '2rem',
            textAlign: 'center',
            color: '#4ba2c6',
          }}
        >
          Password
        </label>
        <input
          type="password"
          value={Password}
          onChange={onPasswordHandler}
          style={{ width: '20rem', height: '3rem', marginBottom: '2rem' }}
        />

        <button
          style={{
            padding: '1rem 0',
            fontSize: '1rem',
            backgroundColor: '#4ba2c6',
            color: 'white',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          Sign in
        </button>
      </form>
    </div>
  );
}

export default withRouter(LoginPage);
