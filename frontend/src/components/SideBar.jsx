import React from "react";
import { Link } from "react-router-dom";

export default function SideBar() {
  return (
    <div className=" flex flex-col left-0 w-14 hover:w-64 md:w-64 bg-blue-900 h-[100vh] text-white transition-all duration-300 border-none z-10 ">
      <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
        <ul className="flex flex-col py-4 space-y-1">
          <li>
            <Link to="/dashboard"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                Dashboard
              </span>
            </Link>
          </li>
          <li className="px-5 hidden md:block">
            <hr className="border-[1.2px] rounded-full" />
          </li>
          <li>
            <Link to="/dashboard/events"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14c-4.418 0-8 2.686-8 6v2h16v-2c0-3.314-3.582-6-8-6zM12 12a4 4 0 100-8 4 4 0 000 8z"
                  />
                </svg>
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">Event</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
