import React from "react";
import { Link } from "react-router-dom";

import { aries_tech_logo } from "../assets";
import { Button } from ".";

const navLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Our Achievers",
    path: "/our-achievers",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

const PingDot = () => (
  <span className="relative flex h-3 w-3">
    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
    <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
  </span>
);

const Navbar = () => {
  return (
    <div className={`absolute left-0 top-0 z-50 w-full`}>
      <div className="lg:px-7.5 flex items-center justify-between px-5 max-lg:py-4 xl:px-10">
        <div className="flex items-center gap-[10px] divide-x divide-solid divide-n-2">
          <Link to="/" className="block w-[8rem] xl:mr-8">
            <img src={aries_tech_logo} alt="logo" />
          </Link>
          <nav className="hidden items-center justify-center gap-[20px] px-6 lg:flex">
            {navLinks.map((item) => (
              <Link
                to={item.path}
                key={item.name}
                className="font-code text-base font-medium text-n-1/70 hover:text-n-1"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Link className="button mr-8 hidden text-n-1 lg:block">Log in</Link>
          <Button className="hidden lg:flex" white={true} onClick={() => {}}>
            <span className="flex items-center gap-2">
              <PingDot />
              Demo
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
