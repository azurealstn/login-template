import React from 'react';
import './Navbar.css';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Menu } from 'antd';
import { useSelector } from 'react-redux';

function Navbar(props) {
  const user = useSelector((state) => state.user);

  const logoutHandler = () => {
    axios.get('/api/users/logout').then((response) => {
      if (response.data.logoutSuccess) {
        props.history.push('/login');
      } else {
        alert('로그아웃이 안됩니다.');
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu
        mode={props.mode}
        style={{ display: 'flex', padding: '1rem', backgroundColor: '#81d4fa' }}
      >
        <Menu.Item style={{ fontWeight: '800', fontSize: '1.5rem' }}>
          <a href="/">Aurora</a>
        </Menu.Item>
        <Menu.Item
          key="mail"
          style={{
            position: 'absolute',
            right: '6rem',
            fontSize: '1rem',
            fontWeight: 700,
          }}
        >
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item
          key="app"
          style={{
            position: 'absolute',
            right: '2rem',
            fontSize: '1rem',
            fontWeight: 700,
          }}
        >
          <a href="/register">Signup</a>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu
        mode={props.mode}
        style={{ display: 'flex', padding: '1rem', backgroundColor: '#81d4fa' }}
      >
        <Menu.Item style={{ fontWeight: '800', fontSize: '1.5rem' }}>
          <a href="/">Aurora</a>
        </Menu.Item>
        <Menu.Item
          style={{
            position: 'absolute',
            right: '8rem',
            fontSize: '1rem',
            fontWeight: 700,
          }}
        >
          <a href="/todos">ToDoList App</a>
        </Menu.Item>
        <Menu.Item
          key="logout"
          style={{
            position: 'absolute',
            right: '2rem',
            fontSize: '1rem',
            fontWeight: 700,
          }}
        >
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    );
  }
  /* 
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <a href="/">Aurora</a>
      </div>
      <div className="navbar__login">
        <Button
          onClick={goToLoginHandler}
          type="link"
          style={{ fontSize: '1.2rem' }}
        >
          Sign in
        </Button>
        <Button
          onClick={logoutHandler}
          type="link"
          style={{ fontSize: '1.2rem' }}
        >
          Sign out
        </Button>
      </div>
    </nav>
  ); */
}

export default withRouter(Navbar);
