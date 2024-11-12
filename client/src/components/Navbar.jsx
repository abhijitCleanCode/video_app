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
      <div className="lg:px-7.5 flex items-center px-5 max-lg:py-4 xl:px-10">
        <Link to="/" className="block w-[5rem] xl:mr-8">
          <img src={aries_tech_logo} alt="logo" />
        </Link>

        <nav className="fixed bottom-0 left-0 right-0 top-0 lg:static lg:mx-auto lg:flex">
          <div className="z-2 relative m-auto flex items-center justify-center gap-[20px] rounded-full border-[1.5px] border-white/15 bg-n-2 px-[32px] py-[16px] shadow-inner backdrop-blur-[100px] lg:flex-row">
            {navLinks.map((item) => (
              <Link
                to={item.path}
                key={item.name}
                className="font-code text-sm font-medium text-n-6"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>

        <Link className="button mr-8 hidden text-n-1 lg:block">Log in</Link>
        <Button className="hidden lg:flex" white={true} onClick={() => {}}>
          <span className="flex items-center gap-2">
            <PingDot />
            Demo
          </span>
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
