import Head from "next/head";
import { format, parseISO } from "date-fns";
import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";
import "tailwindcss/tailwind.css";
import { getAllPosts } from "../../lib/data";

// None of this is typed well because the librarys don't support typescript very well

export default function BlogPage({
  title,
  date,
  content,
  author,
  authorimage,
  authodesc,
}) {
  const hydratedContent = hydrate(content);

  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container w-full md:max-w-3xl mx-auto pt-20">
        <div className="w-full px-4 md:px-6 text-xl text-white-800 leading-normal">
          <div className="font-sans">
            <h1 className="font-bold font-sans break-normal text-white-900 pt-6 pb-2 text-3xl md:text-4xl">
              {title}
            </h1>
            <p className="text-sm md:text-base font-normal text-white-600">
              {format(parseISO(date), "MMMM do, uuu")}
            </p>
          </div>

          <p className="py-6 ">{hydratedContent}</p>
        </div>

        <hr className="border-b-2 border-gray-400 mb-8 mx-4"></hr>

        <div className="flex w-full items-center font-sans px-4 py-12">
          <img
            className="w-10 h-10 rounded-full mr-4"
            src={authorimage}
            alt={`Avatar of ${author}`}
          ></img>
          <div className="flex-1 px-2">
            <p className="font-bold text-base md:text-xl leading-none mb-2">
              {author}
            </p>
            <p className="text-white-600 text-xs md:text-base">{authodesc}</p>
          </div>
          <div className="justify-end"></div>
        </div>

        <hr className="border-b-2 border-gray-400 mb-8 mx-4"></hr>
      </div>

      <footer className="bg-blurple border-t ">
        <div className="container max-w-4xl mx-auto flex py-8">
          <div className="w-full mx-auto flex flex-wrap">
            <div className="flex w-full md:w-1/2 ">
              <div className="px-8">
                <h3 className="font-bold text-gray-900">About</h3>
                <p className="py-4 text-white text-sm">
                  Ready to take your Discord server to the next level? Get
                  started now!
                </p>
              </div>
            </div>
            <div className="transition duration-500 ease-in-out  hover: transform hover:-translate-y-1 hover:scale-550...">
              <a
                href="https://discord.com/oauth2/authorize?client_id=480926911095111682&permissions=536870780887&scope=bot%20applications.commands"
                id="GFG"
                className="box-border relative z-30 inline-flex items-center justify-center w-auto px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-indigo-600 rounded-md cursor-pointer group ring-offset-2 ring-1 ring-indigo-300 ring-offset-indigo-200 hover:ring-offset-indigo-500 ease focus:outline-none"
              >
                <span className="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0" />
                <span className="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0" />
                <span className="relative z-20 flex items-center text-sm">
                  <svg
                    className="relative w-5 mb-2 font-medium leading-tight text-lg mr-2 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  Invite Ybot
                </span>
              </a>
            </div>

            <div className="flex w-full md:w-1/2">
              <div className="px-8">
                <h3 className="font-bold text-gray-900">Social</h3>
                <ul className="list-reset items-center text-sm pt-3">
                  <li>
                    <a
                      className="inline-block text-white no-underline hover:text-underline py-1"
                      href="https://discord.gg/bSTXznR3Mg"
                    >
                      Support Discord
                    </a>
                  </li>
                  <li>
                    <a
                      className="inline-block text-white no-underline hover:text-underline py-1"
                      href="https://eviebot.rocks/"
                    >
                      Evie Bot
                    </a>
                  </li>
                </ul>
                <br></br>
                <br></br>
                <br></br>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  const allPosts = getAllPosts();
  const { data, content } = allPosts.find((item) => item.slug === params.slug);
  const mdxSource = await renderToString(content);

  return {
    props: {
      ...data,
      date: data.date.toISOString(),
      content: mdxSource,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: getAllPosts().map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
}
