import { Center, Text, Image, Stack } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import LoginButton from "../components/LoginButton";
import { Buttons, Features } from "../components/LandingPage";

import type { NextPage } from "next";
import Head from "next/head";

export interface User {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
}

const Home: NextPage = () => {
    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get<User>("https://ybotdiscord.tech/api/discord/user", { withCredentials: true }).then(res => {
            setUser(res?.data || null)
            setLoading(false);
        }).catch(() => setLoading(false));

    }, [])
    
    return (
        <div>
            <Head>
                <title>Home • YBot</title>
                <meta property="og:title" content="YBot Dashboard" data-react-helmet="true" />
            </Head>

            <LoginButton user={user} loading={loading} />
            <Stack spacing={4}>
                <Center paddingTop="75px">
                    <Text as="b" fontSize="45">The most advanced discord bot to date.</Text>
                </Center>

                <Center>
                    <Image
                        alt="YBot's profile picture"
                        src="https://cdn.discordapp.com/avatars/480926911095111682/cc078ff74139880df2a096998a93dfb4.png?size=180px"
                        boxSize="180px"
                        borderRadius="full"
                    />
                </Center>
            </Stack>

            <Center>
                <br /><br /><br /><br /><br /><br /><br /> 
                <Text as="i" fontSize="25" color="gray" >Ready to take your discord server to the next level? Get started now!</Text>
            </Center>

            <Center>
                <br />
                <Buttons spacing={3} />
            </Center>

            <Center>
                <Features text={["Advanced Moderation System", "Customizable Economy System", "Advanced Logging System", "Active Development",
                "Responsive Feedback", "Simple To Use", "Customizable Embeds","And much more..."]}/>
            </Center>

        </div>
    )
}

export default Home;