import { Button, Link } from "@chakra-ui/react";
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "../../../components/Loading";
import Head from "next/head"
import { getURL } from "next/dist/shared/lib/utils";

interface GuildInfo {
    serverID: string,
    muteRole: string,
    eco: number,
    gambling: number,
    welcomeEnabled: number,
    welcomeChannel: string,
    leavesEnabled: number,
    leavesChannel: string,
    delMsgEnabled: number,
    delMsgChannel: string,
    editMsgEnabled: number,
    editMsgChannel: string,
    setupRan: boolean,
    prefix: string,
    voiceParentId: string,
    voiceChannelId: string,
}

const DashboardPage: NextPage = () => {
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [eco, setEco] = useState<number>();

    useEffect(() => {
        if (router.isReady) {
            axios.get<GuildInfo>(`http://localhost:3000/api/discord/guilds/${router.query.id}`, { withCredentials: true }).then(res => {
                setEco(res.data.eco);
                setLoading(false);
            }).catch(() => router.push("/api/discord/auth"));
        }
    },[router.isReady, router])

    while (loading) {
        return <Loading />;
    }

    return (
        <div>
            <Button onClick={async () => {
                if (eco === 1) {
                    axios.post(`http://localhost:3000/api/discord/guilds/${router.query.id}/config`, {
                        eco: 0
                    }, { withCredentials: true })
                        .then(() => {
                            setEco(0);
                        }).catch((e) => router.push("/api/discord/auth"));
                } else if (eco === 0) {
                    axios.post(`http://localhost:3000/api/discord/guilds/${router.query.id}/config`, {
                        eco: 1
                    }, { withCredentials: true })
                    .then(() => {
                        setEco(1);
                    }).catch((e) => router.push("/api/discord/auth"));
                }
            }}>
                {eco === 1 ? "Disable Eco" : "Enable Eco"}
            </Button>
        </div>
    )
}

export default DashboardPage;