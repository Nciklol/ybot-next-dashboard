import type { AppProps } from "next/app";
import React from "react";

import "../styles/legacy.css";

function YBotDashboard({ Component, pageProps }: AppProps) {
  return (
    <div className="App">
      <Component {...pageProps} />
    </div>
  );
}
export default YBotDashboard;
