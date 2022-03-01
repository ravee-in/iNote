import React from 'react';

export default function Alert(props) {
  return (
    <div style={{height: "60px", position: "absolute", width: "100%"}}>
    {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
        <small>{props.alert.msg}</small>
    </div>}
    </div>
  );
}
