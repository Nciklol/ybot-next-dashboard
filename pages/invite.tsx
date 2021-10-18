import { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";

const baseURL = "https://discord.com/api/oauth2/authorize?client_id=480926911095111682&permissions=294498200822&scope=bot"

const Invite: NextPage = () => {
    const router = useRouter();

    <Head>
        <title>Invite • YBot</title>
        <meta property="og:title" content="Invite YBot" data-react-helmet="true" />
    </Head>

    useEffect(() => {
        router.push(baseURL);
    }, [router.isReady, router])

    return (
        <u><a href={baseURL}>Didn&apos;t get redirected? Click on this text.</a></u>
    )
}

export default Invite;