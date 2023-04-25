import { Spinner } from "flowbite-react";
import React from "react";

const LoadingBox = () => {
  return (
    <>
      <Spinner aria-label="Default status example">
        <span className="">Loading...</span>
      </Spinner>
    </>
  );
};

export default LoadingBox;
