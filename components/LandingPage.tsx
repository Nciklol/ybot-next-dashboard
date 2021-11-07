import { Button, Link, Stack } from "@chakra-ui/react";
import { NextPage } from "next";
import ReactTypingEffect from "react-typing-effect";

export const Buttons: NextPage<{ spacing: number }> = ({ spacing }) => {
  return (
    <Stack spacing={spacing} direction="row" align="center">
      <div className="transition delay-150 duration-300 ease-in-out ...">
        <a
          href="/dashboard"
          className="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-indigo-600 text-indigo-600 text-white"
        >
          <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-indigo-600 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
          <span className="relative text-indigo-600 transition duration-300 group-hover:text-white ease">
            Dashboard
          </span>
        </a>
      </div>

      <div className="transition delay-150 duration-300 ease-in-out ...">
        <a
          href="/invite"
          className="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-indigo-600 text-indigo-600 text-white"
        >
          <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-indigo-600 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
          <span className="relative text-indigo-600 transition duration-300 group-hover:text-white ease">
            Invite
          </span>
        </a>
      </div>

      <div className="transition delay-150 duration-300 ease-in-out ...">
        <a
          href="/features"
          className="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-indigo-600 text-indigo-600 text-white"
        >
          <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-indigo-600 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
          <span className="relative text-indigo-600 transition duration-300 group-hover:text-white ease">
            Features
          </span>
        </a>
      </div>

      <div className="transition delay-150 duration-300 ease-in-out ...">
        <a
          href="/support"
          className="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-indigo-600 text-indigo-600 text-white"
        >
          <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-indigo-600 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
          <span className="relative text-indigo-600 transition duration-300 group-hover:text-white ease">
            Support
          </span>
        </a>
      </div>

      <div className="transition delay-150 duration-300 ease-in-out ...">
        <a
          href="/privacy"
          className="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-indigo-600 text-indigo-600 text-white"
        >
          <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-indigo-600 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
          <span className="relative text-indigo-600 transition duration-300 group-hover:text-white ease">
            View Privacy Policy
          </span>
        </a>
      </div>
    </Stack>
  );
};

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

        cursorRenderer={(cursor: Element) => (
          <h1 style={{ fontSize: 32 }}>{cursor}</h1>
        )}
        displayTextRenderer={(text: string) => {
          return (
            <h1>
              {text.split("").map((char, i) => {
                const key = `${i}`;
                return (
                  <span key={key} style={{ fontSize: 32 }}>
                    {char}
                  </span>
                );
              })}
            </h1>
          );
        }}
      />
    </>
  );
};
