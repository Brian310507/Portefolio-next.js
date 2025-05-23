"use client";
import Link from "next/link";
import React, { useState } from "react";
import NavLink from "./NavLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./MenuOverlay";

const navLinks = [
  {
    title: "À propos",
    path: "#about",
  },
  {
    title: "Projets",
    path: "#projects",
  },
  {
    title: "Contact",
    path: "#contact",
  },
];

const blocLinks = [
  {
    title: "Bloc 1",
    path: "/blocs/bloc1",
  },
  {
    title: "Bloc 2",
    path: "/blocs/bloc2",
  },
  {
    title: "Bloc 3",
    path: "/blocs/bloc3",
  },
  {
    title: "Bloc 4",
    path: "/blocs/bloc4",
  },
  {
    title: "Bloc 5",
    path: "/blocs/bloc5",
  },
  {
    title: "Bloc 6",
    path: "/blocs/bloc6",
  },
  {
    title: "Tableau de compétence",
    path: "/blocs/tableau-competence",
  },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="fixed mx-auto border border-[#33353F] top-0 left-0 right-0 z-10 bg-[#121212] bg-opacity-100">
      <div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto px-4 py-2">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center text-slate-200 hover:text-white"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-[#121212] border border-[#33353F] rounded-md shadow-lg py-1">
                {blocLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.path}
                    className="block px-4 py-2 text-sm text-slate-200 hover:bg-[#33353F] hover:text-white"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <Link
            href={"/"}
            className="text-xl md:text-3xl text-white font-semibold"
          >
            Alexandre ROQUES
          </Link>
        </div>
        <div className="mobile-menu block md:hidden">
          {!navbarOpen ? (
            <button
              onClick={() => setNavbarOpen(true)}
              className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
            >
              <Bars3Icon className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={() => setNavbarOpen(false)}
              className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>
        <div className="menu hidden md:block md:w-auto" id="navbar">
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink href={link.path} title={link.title} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      {navbarOpen ? <MenuOverlay links={[...navLinks, ...blocLinks]} /> : null}
    </nav>
  );
};

export default Navbar;
