import React from 'react';
import './Navbar.css';
import { Button } from 'antd';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

function Navbar(props) {
  const goToLoginHandler = () => {
    props.history.push('/login');
  };

  const logoutHandler = () => {
    axios.get('/api/users/logout').then((response) => {
      if (response.data.logoutSuccess) {
        props.history.push('/login');
      } else {
        alert('로그아웃이 안됩니다.');
      }
    });
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <a href="/">Aurora</a>
      </div>
      <div className="navbar__login">
        <Button
          onClick={goToLoginHandler}
          type="link"
          block
          style={{ fontSize: '1.2rem' }}
        >
          Sign in
        </Button>
        <Button
          onClick={logoutHandler}
          type="link"
          block
          style={{ fontSize: '1.2rem' }}
        >
          Sign out
        </Button>
      </div>
    </nav>
  );
}

export default withRouter(Navbar);
