import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

function RegisterPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Name, setName] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault(); //reload 방지

    if (Password !== ConfirmPassword) {
      return alert('비밀번호 확인이 다릅니다.');
    }

    let body = {
      email: Email,
      password: Password,
      nmae: Name,
    };

    dispatch(registerUser(body)).then((response) => {
      if (response.payload.saveSuccess) {
        props.history.push('/login');
      } else {
        alert('회원가입이 안되었습니다. 다시 확인해주세요.');
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
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={onSubmitHandler}
      >
        <div>
          <label
            style={{
              fontSize: '2rem',
              marginRight: '9.3rem',
              color: '#4ba2c6',
            }}
          >
            Email
          </label>
          <input
            type="email"
            value={Email}
            onChange={onEmailHandler}
            style={{
              width: '20rem',
              height: '3rem',
              marginBottom: '2rem',
            }}
          />
        </div>

        <div>
          <label
            style={{
              fontSize: '2rem',
              marginRight: '8.8rem',
              color: '#4ba2c6',
            }}
          >
            Name
          </label>
          <input
            type="text"
            value={Name}
            onChange={onNameHandler}
            style={{
              width: '20rem',
              height: '3rem',
              marginBottom: '2rem',
            }}
          />
        </div>

        <div>
          <label
            style={{
              fontSize: '2rem',
              marginRight: '5.8rem',
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
        </div>

        <div>
          <label style={{ fontSize: '2rem', color: '#4ba2c6' }}>
            Check Password
          </label>
          <input
            type="password"
            value={ConfirmPassword}
            onChange={onConfirmPasswordHandler}
            style={{ width: '20rem', height: '3rem', marginBottom: '2rem' }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '1rem 0',
            fontSize: '1rem',
            backgroundColor: '#4ba2c6',
            color: 'white',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default withRouter(RegisterPage);
