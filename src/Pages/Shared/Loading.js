import React from "react";
import loader from "../../Assets/loader.gif";

const Loading = () => {
  return (
    <div className="min-h-[60vh] flex justify-center items-center w-full">
      <img src={loader} alt="" />
    </div>
  );
};

export default Loading;
