import { Alert } from "flowbite-react";
import React from "react";

const MessageBox = (props) => {
  return (
    <>
      <Alert variant={props.variant || 'info'}>
        <span>
          <span className="font-medium">{props.children}</span>
        </span>
      </Alert>
    </>
  );
};

export default MessageBox;
