import Link from "next/link";

import { socialMediaLinks } from "../../data/socialLinks";
import React from "react";

export default function Socials({ componentsClass, textSize }) {
  return (
    <>
      {socialMediaLinks.map((link, index) => (
        <a
          key={index}
          className={componentsClass ? componentsClass : ""}
          href={link.href}
          target="_blank"
          className="ml-30"
        >
          <i className={`${link.iconClassName} ${textSize}`}></i>
        </a>
      ))}
    </>
  );
}
