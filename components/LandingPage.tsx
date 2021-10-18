import { Button, Link, Stack } from "@chakra-ui/react";
import { NextPage } from "next";
import ReactTypingEffect from "react-typing-effect";

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

            <Button size="lg" onClick={e => {
                e.preventDefault();
                alert("Coming soon..")
            }}>
                View Features
            </Button>

            <Link href="/support">
                <Button size="lg">
                    Support
                </Button>
            </Link>

            <Link href="/privacy">
                <Button size="lg">
                    View Privacy Policy
                </Button>
            </Link>
        </Stack>
    )
}

export const Features: NextPage<{ text: string[] }> = ({ text }) => {
    return (
        <>
            <br /> <br />

            <ReactTypingEffect
                text={text}
                speed={100}
                eraseSpeed={75}

                // ????? why is it erroring it works completely fine
                // @ts-expect-error
                
                cursorRenderer={(cursor: Element) => <h1 style={{ fontSize: 32 }}>{cursor}</h1>}

                displayTextRenderer={(text: string) => {
                    return (
                        <h1>
                            {text.split('').map((char, i) => {
                                const key = `${i}`;
                                return (
                                    <span
                                        key={key}
                                        style={{ fontSize: 32 }}
                                    >{char}</span>
                                );
                            })}
                        </h1>
                    );
                }}
            />
        </>
    )
}