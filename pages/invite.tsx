import { NextPage } from "next";
import Head from "next/head";

const baseURL = "https://discord.com/api/oauth2/authorize?client_id=480926911095111682&permissions=294498200822&scope=bot"

const Invite: NextPage = () => {
    return (
        
        <div>
                <Head>
                    <title>Invite • YBot</title>
                    <meta property="og:title" content="Invite YBot" data-react-helmet="true" />
                    <meta httpEquiv="refresh" content={"0;URL="+baseURL} data-react-helmet="true"/>
                </Head>

        <u><a href={baseURL}>Didn&apos;t get redirected? Click on this text.</a></u>
        </div>
    )
}

export default Invite;