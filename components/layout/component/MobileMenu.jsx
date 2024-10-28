"use client";

import MobileFooter from "./MobileFooter";

import { menuList } from "../../../data/menu";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function MobileMenu({ setActiveMobileMenu, activeMobileMenu }) {
  const [showMenu, setShowMenu] = useState(false);
  const [menuNesting, setMenuNesting] = useState([]);
  const [menuItem, setMenuItem] = useState("");
  const [submenu, setSubmenu] = useState("");

  useEffect(() => {
    menuList.forEach((elm) => {
      elm?.links?.forEach((elm2) => {
        if (elm2.href?.split('/')[1] == pathname?.split('/')[1]) {
          setMenuItem(elm.title);
        } else {
          elm2?.links?.map((elm3) => {
            if (elm3.href?.split('/')[1] == pathname?.split('/')[1]) {
              setMenuItem(elm.title);
              setSubmenu(elm2.title);
            }
          });
        }
      });
    });
  }, []);
  useEffect(() => {
    setShowMenu(true);
  }, []);
  const pathname = usePathname();
  return (
    <div
      className={`header-menu js-mobile-menu-toggle ${
        activeMobileMenu ? "-is-el-visible" : ""
      }`}
    >
      <div className="header-menu__content">
        <div className="mobile-bg js-mobile-bg"></div>

{/*         <div className="d-none xl:d-flex items-center px-20 py-20 border-bottom-light">
          <Link
            href="/login"
            className={`text-dark-1 ${
              pathname == "/login" ? "activeMenu" : "inActiveMenu"
            } `}
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className={`text-dark-1 ml-30 ${
              pathname == "/signup" ? "activeMenu" : "inActiveMenu"
            } `}
          >
            Sign Up
          </Link>
        </div> */}

        {activeMobileMenu && ( // Only show the menu when activeMobileMenu is true
          <div className="mobileMenu text-dark-1">
            <ul className="title js-navList">
              {/* Home Menu Item */}
              <li className="menu-item-has-children text-18 mt-10">
                <Link
                  data-barba
                  href="/"
                  className={menuItem === "Home" ? "activeMenu" : ""}
                  onClick={() => setActiveMobileMenu(false)} // Close menu on click
                >
                  <b>Home</b>
                </Link>
              </li>

              {/* Courses Menu Item */}
              <li className="menu-item-has-children -has-mega-menu text-18 mt-10">
                <Link
                  data-barba
                  href="/courses"
                  className={menuItem === "Courses" ? "activeMenu" : ""}
                  onClick={() => setActiveMobileMenu(false)} // Close menu on click
                >
                  <b>Courses</b>
                </Link>

              </li>

              {/* About Us Menu Item */}
              <li className="menu-item-has-children text-18 mt-10">
                <Link
                  href="/about"
                  className={submenu === "About Us" ? "activeMenu" : "inActiveMenu"}
                  onClick={() => setActiveMobileMenu(false)} // Close menu on click
                >
                  <b>About Us</b>
                </Link>
              </li>

              {/* Blogs Menu Item */}
              <li className="menu-item-has-children text-18 mt-10">
                <Link
                  href="/blogs-list"
                  className={submenu === "blog list" ? "activeMenu" : "inActiveMenu"}
                  onClick={() => setActiveMobileMenu(false)} // Close menu on click
                >
                  <b>Blogs</b>
                </Link>
              </li>

              {/* Contact Menu Item */}
              <li className="text-18 mt-10">
                <Link
                  data-barba
                  href="/contact"
                  className={pathname === "/contact" ? "activeMenu" : "inActiveMenuTwo"}
                  onClick={() => setActiveMobileMenu(false)} // Close menu on click
                >
                  <b>Contact</b>
                </Link>
              </li>

              <li className="menu-item-has-children text-18 mt-10">
              <li className="text-18 mt-10">
              <Link href="/business">
                  <b>Instructor Augmentation Services</b>
                </Link>
              </li>
              </li>
            </ul>
          </div>
        )}

        {/* mobile footer start */}
{/*         <MobileFooter /> */}
        {/* mobile footer end */}
      </div>

      <div
        className="header-menu-close"
        onClick={() => {
          setActiveMobileMenu(false);
        }}
        data-el-toggle=".js-mobile-menu-toggle"
      >
        <div className="size-40 d-flex items-center justify-center rounded-full bg-white">
          <div className="icon-close text-dark-1 text-16"></div>
        </div>
      </div>

      <div
        className="header-menu-bg"
        onClick={() => setActiveMobileMenu(false)}
      ></div>
    </div>
  );
}
