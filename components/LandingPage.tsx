import { Button, Link, Stack } from "@chakra-ui/react";
import { NextPage } from "next";

export const Buttons: NextPage<{spacing: number}> = ({ spacing }) => {
    return (
        <Stack spacing={spacing} direction="row" align="center">
            <Link href="/dashboard">
                <Button size="lg">
                    View Dashboard
                </Button>
            </Link>

            <Link href="/invite">
                <Button size="lg">
                    Invite
                </Button>
            </Link>

            <Link href="/features">
                <Button size="lg">
                    View Features
                </Button>
            </Link>

            <Link href="/support">
                <Button size="lg">
                    Support
                </Button>
            </Link>
        </Stack>
    )
}