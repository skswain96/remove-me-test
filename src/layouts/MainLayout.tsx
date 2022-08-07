import React from "react";
import Header from "../components/Header/Header";

const MainLayout: React.FC = ({ children }) => {
  return (
    <div className="bg-background w-screen h-screen px-5 flex flex-col justify-items-stretch p-8 overflow-auto">
      
      <main className="w-full grow ">{children}</main>
    </div>
  );
};

export default MainLayout;
