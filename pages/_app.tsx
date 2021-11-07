import type { AppProps } from "next/app";
import React from "react";
import Head from "next/head";

import "../styles/legacy.css";

function YBotDashboard({ Component, pageProps }: AppProps) {
  return (
    <div className="App">
      <Component {...pageProps} />

      <Head>
        <meta property="og:type" content="website" />
        <link
          href="https://fonts.googleapis.com/css?family=Poppins:300,400,600,700,800,900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Montserrat:400,600,700,800,900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Lato:300,400,600,700,800,900&display=swap"
          rel="stylesheet"
        />
        <meta
          property="og:url"
          content="https://ybotdiscord.tech"
          data-react-helmet="true"
        />
        <meta
          property="og:image"
          content="https://cdn.discordapp.com/avatars/480926911095111682/cc078ff74139880df2a096998a93dfb4.png?size=180px"
          data-react-helmet="true"
        />
        <meta
          property="og:description"
          content="Upgrade your discord server today by inviting YBot!"
          data-react-helmet="true"
        />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#687cc4" />
        <meta name="theme-color" content="#687cc4" />
      </Head>
    </div>
  );
}
export default YBotDashboard;
