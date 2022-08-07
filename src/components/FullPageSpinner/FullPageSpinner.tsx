import React from "react";
import Spinner from "../Spinner/Spinner";

const FullPageSpinner = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-white/5 flex flex-col items-center justify-center backdrop-filter backdrop-blur-sm">
      <h2 className="text-center text-white text-xl font-semibold">
        <Spinner />
      </h2>
    </div>
  );
};

export default FullPageSpinner;
