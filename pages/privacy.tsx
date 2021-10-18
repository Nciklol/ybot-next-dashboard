import { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";

const PrivacyPolicy: NextPage = () => {
    const router = useRouter();

    useEffect(() => {
        router.push("https://gist.github.com/Nciklol/54098d574e63d3dab73f1107fe42549e")
    }, [router.isReady, router])


    return (
        <div>
            <Head>
                <title>Privacy Policy • YBot</title>
                <meta property="og:title" content="View the privacy policy" data-react-helmet="true" />
            </Head>

            <u><a href="https://gist.github.com/Nciklol/54098d574e63d3dab73f1107fe42549e">Didn&apos;t get redirected? Click here!</a></u>
        </div>
    )
}