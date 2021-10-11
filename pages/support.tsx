import { NextPage } from "next";
import { useEffect } from "react";
import Head from "next/head";

const Support: NextPage = () => {
    
    useEffect(() => {
        window.location.href = 'https://discord.gg/STe9YQgtz2';
    }, [])

    return (
        <div>
            <Head>
                <title>Support • YBot</title>
            </Head>
            <u><a href="https://discord.gg/STe9YQgtz2">Didn&apos;t get redirected? Click this text. </a></u>
        </div>
    )
}

export default Support;