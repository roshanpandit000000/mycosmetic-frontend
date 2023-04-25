import React from "react";
import { BsArrowRightCircleFill } from "react-icons/bs";

function SliderArrow({ className, to, onClick }) {
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className={`button button--text button--icon ${className}`}
        aria-label={to}
      >
        <BsArrowRightCircleFill className="text-black" icon={to} />
      </button>
    </>
  );
}

export default SliderArrow;
