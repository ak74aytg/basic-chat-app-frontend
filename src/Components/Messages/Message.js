import React from 'react'
import "./message.css";


function Message({ user, message, classs }) {
    console.log(user)
    if (user && user==="Admin") {
      return <div className={`message admin`}>{`${message}`}</div>;
    } else if (user) {
        return (
            <div className={`message ${classs}`}><span className='span'>{`${user}`}</span>{`: ${message}`}</div>
        );
    } else {
        return (
          <div className={`message right`}>
            <sapn className='span'>you</sapn>
            {`: ${message}`}
          </div>
        );

  }
}

export default Message