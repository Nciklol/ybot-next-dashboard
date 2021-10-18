import { Button } from "@chakra-ui/react"
import React from "react"
import { User } from "../pages"

interface Props {
    user: User | undefined;
    loading: boolean
}

const LoginButton = ({
    user,
    loading
}: Props) => {
    return (
            !loading ? (
                <Button pos="absolute" top="0" right="0" onClick={() => {
                    user ? window.location.href = '/api/discord/terminate' : window.location.href = "/api/discord/auth"
                }}>{user ? "Logout" : "Login"}</Button>
            ) : (
                <Button pos="absolute" top="0" right="0">Loading..</Button>
            )
    )
}

export default LoginButton;