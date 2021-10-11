import { Center, Text, Image, Stack } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import LoginButton from "../components/LoginButton";
import Link from "next/link"
import { Buttons } from "../components/LandingPage";

import type { NextPage } from "next";

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
        axios.get<User>("http://localhost:3000/api/discord/user", { withCredentials: true }).then(res => {
            setUser(res?.data || null)
            setLoading(false);
        }).catch(() => setLoading(false));

    }, [])

    while (loading) {
        return <Loading />
    }

    return (
        <div>
            <LoginButton user={user} />
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


        </div>
    )
}

export default Home;