import { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";

const baseURL = 'https://discord.com/api/oauth2/authorize?client_id=480926911095111682&permissions=294498200822&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdashboard&scope=bot'

const Invite: NextPage = () => {

    <Head>
        <title>Invite • YBot</title>
    </Head>

    useEffect(() => {
        window.location.href = baseURL;
    }, [])

    return (
        <u><a href={baseURL}>Didn&apos;t get redirected? Click on this text.</a></u>
    )
}

export default Invite;