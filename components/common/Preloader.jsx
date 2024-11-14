"use client";

import React, { useState, useEffect } from "react";

export default function Preloader() {
  const [preloaderDisable, setPreloaderDisable] = useState(false);
  useEffect(() => {
    setPreloaderDisable(true);
  }, []);

  return (
    <div className="preloader js-preloader">
      <!-- Google Tag Manager (noscript) -->
      <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M2QVLW2N"
      height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
      <!-- End Google Tag Manager (noscript) -->

      <div
        className="preloader__bg"
        style={preloaderDisable ? { transform: "scale(1,0)" } : {}}
      ></div>
    </div>
  );
}
