import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { ChakraProvider } from "@chakra-ui/react"
import theme from '../theme'
import React from 'react'
import Head from 'next/head'

function YBotDashboard({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider theme={theme}>
            <Head>
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://ybotdiscord.tech" data-react-helmet="true"/>
                <meta property="og:image" content="https://cdn.discordapp.com/avatars/480926911095111682/cc078ff74139880df2a096998a93dfb4.png?size=180px" data-react-helmet="true" />

                <meta property="og:title" content="YBot Dashboard" data-react-helmet="true" />
                <meta property="og:description" content="Upgrade your discord server today by inviting YBot!" data-react-helmet="true" />
            
                <link rel="shortcut icon" href="ybot.ico" />
            </Head>

            <Component {...pageProps} />
        </ChakraProvider>
    )
}
export default YBotDashboard;
