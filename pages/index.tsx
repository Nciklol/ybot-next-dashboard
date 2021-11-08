import { Center, Text, Image } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Buttons, Features } from "../components/LandingPage";
import "tailwindcss/tailwind.css";
import type { NextPage } from "next";
import Head from "next/head";
import Contributors from "../react-contributors";
import Link from "next/link";
// Username of the repo owner.
const owner = "Nciklol";

// Repository name or array with multiple repositories names.
const repos = ["ybot-next-dashboard"];

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
    axios
      .get<User>("https://ybotdiscord.tech/api/discord/user", {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res?.data || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <Head>
        <title>Home • YBot</title>
        <meta
          property="og:title"
          content="YBot Dashboard"
          data-react-helmet="true"
        />
      </Head>
      <nav className="relative flex flex-wrap items-center content-between py-3 px-4  bg-transparent">
        <div className="transition duration-500 ease-in-out  hover: transform hover:-translate-y-1 hover:scale-150 ...">
          <Image src="/purpleY.svg" width="60" height="60" alt="YBot profile picture"/>
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div className="nav-item dropdown text-right">
          <div className="dropdown-divider" />

          <div className="dropdown-item">
              <Link href="/dashboard">
                  Dashboard
              </Link>
          </div>

          <div className="dropdown-divider" />
          <a className="dropdown-item" href="https://example.com">
            Documentation
          </a>
        </div>
      </nav>
      <div className="tristan-magic">
        <Center>
          <Image
            alt="YBot's profile picture"
            src="https://cdn.discordapp.com/avatars/480926911095111682/94ebdf13ecb093e9e361fa9a9d931e2a.png"
            boxSize="180px"
            borderRadius="full"
            className="w-32 h-32 rounded-full"
          />
        </Center>
        <br />
        <Center>
          <Text as="i" fontSize="25" color="gray">
            Ready to take your Discord server to the next level? Get started
            now!
          </Text>
        </Center>
        <br />
        <Center>
          <br />
          <Buttons spacing={3} />
        </Center>
        <br />
        <Center>
          <Features
            text={[
              "Advanced Moderation System",
              "Customizable Economy System",
              "Advanced Logging System",
              "Active Development",
              "Responsive Feedback",
              "Simple To Use",
              "Customizable Embeds",
              "And much more magic...",
            ]}
          />
        </Center>
        <br />
        <br />
        <br />
        <div className="page_end"></div>
        <div className="footer">
          <div className="twisttaan">
            ybotdiscord.tech made with ❤️ by
            <div className="grid justify-items-stretch ...">
              <div className="justify-self-center ...">
                <Contributors owner={owner} repo={repos} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
