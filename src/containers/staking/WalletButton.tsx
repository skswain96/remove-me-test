import React, { FC, useMemo, useState } from "react";
import classNames from "classnames";
import {
  useConnectedWallet,
  useSolana,
  useWalletKit,
} from "@gokiprotocol/walletkit";
import { ButtonProps } from "@mui/material";

const WalletButton: FC<ButtonProps> = ({ children, ...props }) => {
  const { disconnect } = useSolana();
  const { connect } = useWalletKit();
  const wallet = useConnectedWallet();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const base58 = useMemo(
    () => wallet?.publicKey?.toBase58(),
    [wallet?.publicKey]
  );
  const walletAddress = useMemo(() => {
    return base58?.slice(0, 4) + ".." + base58?.slice(-4);
  }, [base58]);

  return (
    <>
      <button
        id="dropdownButton"
        data-dropdown-toggle="dropdown"
        className="text-main hover:text-background bg-primary hover:bg-primaryLight focus:ring focus:ring-accent font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-primary dark:hover:bg-main dark:focus:ring-black-800"
        type="button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {walletAddress}
        <svg
          className="ml-2 w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      <div
        id="dropdown"
        className={classNames(
          "absolute top-20 right-8 z-10 w-44 text-base list-none bg-white dark:bg-opacity-10 rounded divide-y divide-gray-100 shadow dark:bg-main",
          {
            hidden: !isMenuOpen,
          }
        )}
      >
        <ul className="py-1" aria-labelledby="dropdownButton">
          <li
            onClick={() => {
              connect();
              setIsMenuOpen(false);
            }}
          >
            <a
              href="#"
              className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Change wallet
            </a>
          </li>
          <li
            onClick={() => {
              disconnect();
              setIsMenuOpen(false);
            }}
          >
            <a
              href="#"
              className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Disconnect
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default WalletButton;
