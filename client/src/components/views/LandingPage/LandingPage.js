import React from 'react';
import { withRouter } from 'react-router-dom';
import './LandingPage.css';

function LandingPage(props) {
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
      <a className="button" href="#popup1">
        홈페이지 설명
      </a>
      <div id="popup1" className="overlay">
        <div className="popup">
          <h2>홈페이지 메뉴</h2>
          <a className="close" href="#">
            &times;
          </a>
          <div className="content">
            이 홈페이지의 주 기능은 TODOLIST 앱 입니다. <br />
            이용 방법은 회원가입을 하신 후에 로그인을 하시면 됩니다.
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(LandingPage);
