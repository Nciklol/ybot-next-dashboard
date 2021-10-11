import { NextPage } from "next";
import { useEffect } from "react";

const Support: NextPage = () => {
    
    useEffect(() => {
        window.location.href = 'https://discord.gg/STe9YQgtz2';
    }, [])

    return (
        <u><a href="https://discord.gg/STe9YQgtz2">Didn't get redirected? Click this text. </a></u>
    )
}

export default Support;