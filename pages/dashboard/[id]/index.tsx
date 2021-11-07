import { Button, Select, Text } from "@chakra-ui/react";
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "../../../components/Loading";
import Head from "next/head";
import { Formik } from "formik";

interface GuildInfo {
  serverID: string;
  muteRole: string;
  eco: number;
  gambling: number;
  welcomeEnabled: number;
  welcomeChannel: string;
  leavesEnabled: number;
  leavesChannel: string;
  delMsgEnabled: number;
  delMsgChannel: string;
  editMsgEnabled: number;
  editMsgChannel: string;
  setupRan: boolean;
  prefix: string;
  voiceParentId: string;
  voiceChannelId: string;
}

interface Role {
  id: string;
  name: string;
  color: number;
  position: number;
  tags?: {
    bot_id?: string;
  };
}

interface IResponse {
  settings: GuildInfo;
  roles: Role[];
  botRole: Role;
}

const DashboardPage: NextPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [eco, setEco] = useState<number>();
  const [roles, setRoles] = useState<Role[]>();
  const [muteRole, setMuteRole] = useState<string>();

  useEffect(() => {
    if (router.isReady) {
      axios
        .get<IResponse>(
          `https://ybotdiscord.tech/api/discord/guilds/${router.query.id}`,
          { withCredentials: true }
        )
        .then((res) => {
          setEco(res.data.settings.eco);
          setRoles(
            res.data.roles.filter((r) => r.position < res.data.botRole.position)
          );
          setMuteRole(res.data.settings.muteRole);
          setLoading(false);
        })
        .catch(() => router.push("/dashboard?failed=true"));
    }
  }, [router.isReady, router]);

  while (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Head>
        <title>Dashboard • YBot</title>
        <meta
          property="og:title"
          content="YBot Dashboard"
          data-react-helmet="true"
        />
      </Head>
      <Text fontSize="lg" as="b">
        Economy Commands:{" "}
      </Text>
      <Button
        onClick={async () => {
          if (eco === 1) {
            axios
              .post(
                `https://ybotdiscord.tech/api/discord/guilds/${router.query.id}/config`,
                {
                  eco: 0,
                },
                { withCredentials: true }
              )
              .then(() => {
                setEco(0);
              })
              .catch((e) => router.push("/api/discord/auth"));
          } else if (eco === 0) {
            axios
              .post(
                `https://ybotdiscord.tech/api/discord/guilds/${router.query.id}/config`,
                {
                  eco: 1,
                },
                { withCredentials: true }
              )
              .then(() => {
                setEco(1);
              })
              .catch((e) => router.push("/api/discord/auth"));
          }
        }}
      >
        {eco === 1 ? "Disable" : "Enable"}
      </Button>
      <br />
      <br />
      <br />
      <Text fontSize="lg" as="b">
        Change mute role:{" "}
      </Text>

      <Formik
        initialValues={{ muteRole }}
        onSubmit={(selected) => {
          if (selected.muteRole === muteRole) return;

          axios.post(
            `https://ybotdiscord.tech/api/discord/guilds/${router.query.id}/config`,
            {
              muteRole: selected.muteRole,
            },
            { withCredentials: true }
          );
        }}
      >
        {(props) => {
          return (
            <form onSubmit={props.handleSubmit}>
              <Select
                onChange={props.handleChange}
                variant="outline"
                size="md"
                width="25%"
                name="muteRole"
                defaultValue={
                  roles?.find((r) => r.id === muteRole)?.id || "Invalid"
                }
              >
                {roles
                  ?.sort((r, r2) => r2.position - r.position)
                  .map((role) => (
                    <option value={role.id} key={role.id}>
                      {role.id === muteRole
                        ? `(Current) ${role.name}`
                        : role.name}
                    </option>
                  ))}
              </Select>
              <Button type="submit">Update Role</Button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default DashboardPage;
