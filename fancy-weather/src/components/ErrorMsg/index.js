import React from 'react';

export default function ErrorMsg( msg ) {
  const { errorMsg } = msg;
  return (
    <span className="ErrorMsg">
      {errorMsg}
    </span>
  );
}
