import React from 'react';
import './style.scss';

export default function ErrorMsg(msg) {
  const { errorMsg } = msg;
  return (
    <div className="ErrorMsg">
      <span className="ErrorMsg__text">
        {errorMsg}
      </span>
    </div>
  );
}
