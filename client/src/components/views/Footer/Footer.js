import React from 'react';
import { HighlightOutlined } from '@ant-design/icons';

function Footer() {
  return (
    <div
      style={{
        height: '80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1rem',
        backgroundColor: '#81d4fa',
        fontWeight: '800',
      }}
    >
      <p>
        {' '}
        Designed Minsu <HighlightOutlined />
      </p>
    </div>
  );
}

export default Footer;
