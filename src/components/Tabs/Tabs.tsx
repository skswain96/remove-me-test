import React, { ReactElement, useEffect, useState } from "react";
import classNames from "classnames";
import Children from "react-children-utilities";

const Tabs: React.FC = ({ children }) => {
  const childArray = React?.Children?.toArray(children);
  const tabNames = React?.Children?.map(childArray, (child) => {
    if (child) {
      return (child as ReactElement)?.props?.id;
    }
  });

  const [activeTab, setActiveTab] = useState(tabNames[0] || "");

  return (
    <div className="w-full h-full flex flex-col justify-stretch items-left gap-6">
      <ul className="w-full md:w-fit lg:w-fit xl:w-fit 2xl:w-fit h-fit flex flex-row md:flex-wrap lg:flex-wrap xl:flex-wrap 2xl:flex-wrap justify-center ml-4 font-sans text-md font-normal text-center pb-4 text-sub dark:text-sub rounded-lg drop-shadow-lg">
        {tabNames.map((name, index) => (
          <li
            key={`${name}-${index}`}
            className={classNames(
              "cursor-pointer mt-2 md:mt-0 lg:mt-0 xl:mt-0 2xl:mt-0 basis-1/2 md:basis-0 lg:basis-0 xl:basis-0 2xl:basis-0",
              {
                "ml-8 md:ml-0 lg:ml-0 xl:ml-0 2xl:ml-0": name === "Unstaked",
                "mr-4 md:mr-0 lg:mr-0 xl:mr-0 2xl:mr-0": name === "Staked",
              }
            )}
            onClick={() => setActiveTab(name)}
          >
            <div
              className={classNames(
                "inline-block w-fit py-2 px-2 mx-4 active cursor-pointer uppercase hover:text-main",
                {
                  "font-bold border-primary border-b-2 text-main hover:text-main":
                    activeTab === name,
                }
              )}
              aria-current="page"
            >
              <span>{name}</span>
            </div>
          </li>
        ))}
      </ul>
      <div className="h-full overflow-auto no-scrollbar">
        {Children?.filter(children, (child) => {
          return child?.props?.id === activeTab;
        })}
      </div>
    </div>
  );
};

export default Tabs;
